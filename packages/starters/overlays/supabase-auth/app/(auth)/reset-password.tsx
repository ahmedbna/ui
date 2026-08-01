import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { AuthScreen } from '@/components/auth/auth-screen';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { useEffect, useState } from 'react';

function describePasswordProblem(password: string): string | undefined {
  if (password.length < 8) return 'At least 8 characters.';
  if (!/[a-z]/.test(password)) return 'Include a lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Include a digit.';
  return undefined;
}

/**
 * Reached by opening the recovery link, not by navigation.
 *
 * By the time this renders, the deep-link handler has already exchanged the
 * code for a session — so the user is technically signed in, and `updateUser`
 * needs no old password. The screen still lives under `(auth)` because the
 * route guards will move on the moment the password is set.
 */
export default function ResetPasswordScreen() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const problem = describePasswordProblem(password);

  useEffect(() => {
    // The exchange is in flight when this mounts on a cold start. Wait for a
    // session rather than showing a form that would fail on submit.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const submit = async () => {
    setTouched(true);
    if (problem) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error('Could not update your password', error.message);
      return;
    }

    toast.success('Password updated', 'You are signed in.');
    // The session is already valid, so the guards send us into the app.
  };

  if (!ready) {
    return (
      <AuthScreen title='Opening your link' subtitle='One moment.'>
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Spinner size='lg' variant='circle' />
        </View>

        <Text variant='caption'>
          If this does not move, the link may have expired. Request a new one.
        </Text>

        <Button
          variant='ghost'
          onPress={() => router.replace('/forgot-password')}
        >
          Send a new link
        </Button>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen title='Choose a new password' subtitle='Then you are back in.'>
      <Input
        label='New password'
        icon={Lock}
        placeholder='At least 8 characters'
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched(true)}
        error={touched ? problem : undefined}
        secureTextEntry
        autoCapitalize='none'
        autoComplete='new-password'
        textContentType='newPassword'
        autoFocus
      />

      <Button
        disabled={!password || loading}
        loading={loading}
        onPress={submit}
      >
        Update password
      </Button>
    </AuthScreen>
  );
}
