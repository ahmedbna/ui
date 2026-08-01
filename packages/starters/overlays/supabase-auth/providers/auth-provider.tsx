import type { Session, User } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/database.types';

interface AuthContextType {
  /** `null` once resolved and signed out; the session while signed in. */
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /** True until the persisted session has been read off disk. */
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user.id ?? null;

  const loadProfile = useCallback(async (id: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    // `maybeSingle` rather than `single`: the row is created by a trigger on
    // auth.users, and on a fast device the first read can land before the
    // trigger commits. A null profile means "not yet", not "error".
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    let active = true;

    // Reads the persisted session from LargeSecureStore. Everything renders a
    // spinner until this resolves, so a returning user never sees the sign-in
    // screen flash before their session loads.
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    // Fires on sign-in, sign-out, token refresh, and user updates — including
    // ones triggered on another tab or by a deep link below.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    loadProfile(userId);
  }, [userId, loadProfile]);

  useEffect(() => {
    if (!userId) return;

    // The profile row may not exist yet when the trigger is still committing,
    // and onboarding writes to it from another screen. Subscribing keeps
    // `needsOnboarding` in the root layout honest without polling.
    const channel = supabase
      .channel(`profiles:${userId}`)
      .on<Profile>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') setProfile(null);
          else setProfile(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    /**
     * Completes a sign-in that finished in the browser or a mail client.
     *
     * Magic links, email confirmations, password recovery and OAuth all come
     * back as a deep link into the app. Under PKCE that link carries `?code=`,
     * which has to be exchanged for a session; older projects and some email
     * templates still return tokens in the `#fragment` instead, so both are
     * handled.
     *
     * This lives on the provider rather than a `callback` route because the
     * link can arrive while any screen is mounted, and on a cold start before
     * the router has settled anywhere at all.
     */
    const handleUrl = async (url: string) => {
      const { queryParams } = Linking.parse(url);

      const code = queryParams?.code;
      if (typeof code === 'string') {
        await supabase.auth.exchangeCodeForSession(code);
        return;
      }

      const fragment = url.split('#')[1];
      if (!fragment) return;

      const params = new URLSearchParams(fragment);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
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
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (userId) await loadProfile(userId);
  }, [userId, loadProfile]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        // Derived rather than cleared in an effect, so a signed-out render can
        // never briefly expose the previous user's profile.
        profile: session ? profile : null,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
