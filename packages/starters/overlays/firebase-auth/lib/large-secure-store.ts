import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import aesjs from 'aes-js';

/**
 * The storage adapter Firebase Auth uses to persist a user on device.
 *
 * Passed to `getReactNativePersistence` in `lib/firebase.ts`. Its interface —
 * `getItem` / `setItem` / `removeItem`, all promise-returning — is exactly
 * Firebase's `ReactNativeAsyncStorage`, so no adapter sits between them.
 *
 * `expo-secure-store` refuses values larger than 2048 bytes, and the record
 * Firebase writes is comfortably past that. It stores one JSON blob per user
 * under `firebase:authUser:<apiKey>:[DEFAULT]` holding the uid, email,
 * displayName, photoURL, the whole `providerData` array, and a
 * `stsTokenManager` with both tokens. The access token alone is a signed JWT of
 * roughly 900–1,100 bytes and the refresh token another 200–300; a bare
 * email/password account lands around 1.5 KB, and one Google identity with a
 * long photoURL pushes it past the limit.
 *
 * That is the failure mode worth naming: it works with your test account and
 * breaks when a real user signs in with Google.
 *
 * So: a 256-bit AES key per storage entry lives in SecureStore, which is what
 * SecureStore is actually good at, and the ciphertext lives in AsyncStorage,
 * which has no size limit. Reading a value without its key is useless, and the
 * key never leaves the Keychain (iOS) or the EncryptedSharedPreferences-backed
 * Keystore (Android).
 *
 * Two Firebase-specific notes:
 *
 * - Firebase rewrites this entry on every token refresh, roughly hourly, so a
 *   fresh AES key is minted each time. That is fine, and it is why the key is
 *   per-entry rather than global.
 * - The orphaned-ciphertext branch in `getItem` matters more here than it does
 *   for a Supabase session. An unrecoverable read leaves `initializeAuth` with
 *   no user, and the route guards would otherwise strand a returning user on a
 *   spinner rather than showing them the sign-in screen.
 *
 * Plain AsyncStorage also works and is simpler, but leaves the refresh token
 * readable by anything that can reach the app's sandbox — on a rooted or
 * jailbroken device, that is not nothing.
 */
export class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = Crypto.getRandomValues(new Uint8Array(32));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey)
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) return null;

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return null;

    // A ciphertext whose key is gone — app reinstalled on Android, Keychain
    // cleared, a partial write — is unrecoverable. Drop it so the user lands on
    // the sign-in screen instead of an infinite loading state, and so the next
    // read is not a second failure.
    //
    // Both branches matter: a missing key makes `_decrypt` return null, while
    // corrupt hex makes it throw. Only handling the throw left the orphaned
    // ciphertext in AsyncStorage forever.
    try {
      const value = await this._decrypt(key, encrypted);
      if (value === null) await this.removeItem(key);
      return value;
    } catch {
      await this.removeItem(key);
      return null;
    }
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);
    await AsyncStorage.setItem(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }
}
