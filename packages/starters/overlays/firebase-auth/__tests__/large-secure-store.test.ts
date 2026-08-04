import { LargeSecureStore } from '@/lib/large-secure-store';

/**
 * The point of this class is that a value too large for SecureStore survives a
 * round trip. The record Firebase Auth persists is a couple of kilobytes — well
 * past SecureStore's 2048-byte ceiling once `providerData` carries a Google
 * identity — so a regression here logs every user out on relaunch, and it would
 * do it silently.
 *
 * The `mock` prefix on the two maps is required, not stylistic: jest hoists
 * `jest.mock` above the imports, and only `mock`-prefixed names may be
 * referenced from a factory.
 */
const mockSecureStore = new Map<string, string>();
const mockAsyncStorage = new Map<string, string>();

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(async (key: string, value: string) => {
    mockSecureStore.set(key, value);
  }),
  getItemAsync: jest.fn(
    async (key: string) => mockSecureStore.get(key) ?? null
  ),
  deleteItemAsync: jest.fn(async (key: string) => {
    mockSecureStore.delete(key);
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(async (key: string, value: string) => {
      mockAsyncStorage.set(key, value);
    }),
    getItem: jest.fn(async (key: string) => mockAsyncStorage.get(key) ?? null),
    removeItem: jest.fn(async (key: string) => {
      mockAsyncStorage.delete(key);
    }),
  },
}));

jest.mock('expo-crypto', () => ({
  // Deterministic stand-in for the platform CSPRNG. The class under test only
  // needs 32 bytes; where they come from is not what these tests cover.
  getRandomValues: (array: Uint8Array) => {
    for (let i = 0; i < array.length; i++) array[i] = (i * 7 + 13) % 256;
    return array;
  },
}));

describe('LargeSecureStore', () => {
  let store: LargeSecureStore;

  beforeEach(() => {
    mockSecureStore.clear();
    mockAsyncStorage.clear();
    store = new LargeSecureStore();
  });

  it('round-trips a value larger than SecureStore allows', async () => {
    // Shaped and sized like what Firebase actually writes under
    // `firebase:authUser:<apiKey>:[DEFAULT]` for an account linked to both a
    // password and Google: a ~1.2 KB ID token JWT, a refresh token, and one
    // providerData entry per identity carrying a long CDN photoURL.
    const authUser = JSON.stringify({
      uid: 'uid-1',
      email: 'ada@example.com',
      displayName: 'Ada Lovelace',
      photoURL: `https://lh3.googleusercontent.com/${'p'.repeat(300)}`,
      providerData: [
        { providerId: 'password', uid: 'ada@example.com', photoURL: null },
        {
          providerId: 'google.com',
          uid: '1'.repeat(21),
          photoURL: `https://lh3.googleusercontent.com/${'p'.repeat(300)}`,
        },
      ],
      stsTokenManager: {
        accessToken: `eyJhbGciOiJSUzI1NiIs.${'a'.repeat(1200)}.sig`,
        refreshToken: 'r'.repeat(300),
        expirationTime: 1767225600000,
      },
      apiKey: 'AIzaSyTestKey',
      appName: '[DEFAULT]',
    });

    // The assertion that gives this test its point: cross 2048 and a plain
    // SecureStore write starts throwing.
    expect(authUser.length).toBeGreaterThan(2048);

    await store.setItem('firebase:authUser:key:[DEFAULT]', authUser);

    expect(await store.getItem('firebase:authUser:key:[DEFAULT]')).toBe(
      authUser
    );
  });

  it('keeps the ciphertext out of AsyncStorage in plain text', async () => {
    await store.setItem('session', 'super-secret-token');

    expect(mockAsyncStorage.get('session')).toBeDefined();
    expect(mockAsyncStorage.get('session')).not.toContain('super-secret-token');
    // The key, and only the key, is in SecureStore — 32 bytes as hex,
    // comfortably under the 2048-byte limit however large the value gets.
    expect(mockSecureStore.get('session')).toHaveLength(64);
  });

  it('returns null for a value whose key is gone', async () => {
    await store.setItem('session', 'token');
    // Reinstalled on Android, Keychain cleared, a partial write — the
    // ciphertext outlives its key and is unrecoverable.
    mockSecureStore.delete('session');

    expect(await store.getItem('session')).toBeNull();
    // And it cleans up, so the next read is not a second failure.
    expect(mockAsyncStorage.has('session')).toBe(false);
  });

  it('removes both halves', async () => {
    await store.setItem('session', 'token');
    await store.removeItem('session');

    expect(mockAsyncStorage.has('session')).toBe(false);
    expect(mockSecureStore.has('session')).toBe(false);
    expect(await store.getItem('session')).toBeNull();
  });
});
