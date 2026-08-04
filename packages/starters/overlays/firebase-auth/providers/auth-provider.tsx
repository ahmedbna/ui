import {
  applyActionCode,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { parseAuthLink } from '@/lib/auth-link';
import { profileFromDoc, type Profile } from '@/lib/documents';
import { auth, db } from '@/lib/firebase';

/** Where `email-link.tsx` stashes the address it sent the link to. */
export const PENDING_EMAIL_KEY = 'firebase.emailLink.pendingEmail';

interface AuthContextType {
  /**
   * The signed-in user, or null once resolved and signed out.
   *
   * No `session` field: Firebase has no session object. The `User` carries
   * `getIdToken()`, and the SDK refreshes behind it.
   */
  user: User | null;
  profile: Profile | null;
  /** True until the persisted user has been read off disk. */
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.uid ?? null;

  useEffect(() => {
    // Fires once after the SDK has finished reading LargeSecureStore, with
    // either a User or null, and again on every sign-in, sign-out and token
    // refresh. Everything renders a spinner until that first call, so a
    // returning user never sees the sign-in screen flash before their session
    // loads.
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const reference = doc(db, 'users', userId);

    /**
     * The direct analogue of the `profiles:{id}` postgres_changes channel in
     * the Supabase starter, and it earns its place for the same reason: the
     * onboarding screen writes to this document from elsewhere, and the guard
     * in app/_layout.tsx has to see that without polling.
     */
    return onSnapshot(
      reference,
      async (snapshot) => {
        if (!snapshot.exists()) {
          // There is no Cloud Function creating this document — those need the
          // Blaze plan, which a starter should not require. The client writes
          // it instead, and doing it from the *listener* rather than once after
          // sign-up means it self-heals: if the first attempt never landed, the
          // next launch fixes it. A post-sign-up write would not.
          await ensureProfile(auth.currentUser);
          return;
        }

        setProfile(profileFromDoc(snapshot));
      },
      () => {
        // A rules rejection here is terminal. Leave the profile null rather
        // than stale; the guards treat that as "not loaded", not "onboarded".
        setProfile(null);
      }
    );
  }, [userId]);

  useEffect(() => {
    /**
     * Completes a sign-in or a verification that finished in a mail client.
     *
     * Email links, password resets and address verification all come back as a
     * deep link into the app. This lives on the provider rather than a
     * `callback` route because the link can arrive while any screen is mounted,
     * and on a cold start before the router has settled anywhere at all.
     */
    const handleUrl = async (url: string) => {
      // The SDK is the authority on whether this is a sign-in link, so ask it
      // rather than re-implementing the check.
      if (isSignInWithEmailLink(auth, url)) {
        const email = await SecureStore.getItemAsync(PENDING_EMAIL_KEY);
        // Opened on a different device from the one that requested it. Firebase
        // requires the address back, and prompting for it here would be a
        // phishing vector, so this is a dead end by design.
        if (!email) return;

        try {
          await signInWithEmailLink(auth, email, url);
          await SecureStore.deleteItemAsync(PENDING_EMAIL_KEY);
        } catch {
          // An expired or reused link. The user is still on the sign-in
          // screen, which is the right place to be.
        }
        return;
      }

      const link = parseAuthLink(url);
      if (!link) return;

      if (link.kind === 'resetPassword') {
        router.push({
          pathname: '/reset-password',
          params: { oobCode: link.oobCode },
        });
        return;
      }

      if (link.kind === 'verifyEmail') {
        try {
          await applyActionCode(auth, link.oobCode);
          // The User object caches `emailVerified`, so it keeps reporting the
          // old value until it is reloaded.
          await auth.currentUser?.reload();
          setUser(auth.currentUser);
        } catch {
          // Already used, or expired. Settings still offers to resend.
        }
      }
    };

    // The link that launched the app from cold.
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    // And any that arrive while it is already running.
    const subscription = Linking.addEventListener('url', ({ url }) =>
      handleUrl(url)
    );

    return () => subscription.remove();
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!userId) return;
    const snapshot = await getDoc(doc(db, 'users', userId));
    setProfile(profileFromDoc(snapshot));
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        user,
        // Derived rather than cleared in an effect, so a signed-out render can
        // never briefly expose the previous user's profile.
        profile: user ? profile : null,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Creates `users/{uid}` the first time it is missing.
 *
 * `onboarded: false` is required by firestore.rules on create — a client cannot
 * sign up already onboarded and skip the flow.
 */
async function ensureProfile(current: User | null): Promise<void> {
  if (!current) return;

  try {
    await setDoc(doc(db, 'users', current.uid), {
      email: current.email,
      displayName: current.displayName,
      photoURL: current.photoURL,
      onboarded: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch {
    // Two listeners racing, or a rules rejection. The snapshot listener stays
    // subscribed either way, so the next event tries again.
  }
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
