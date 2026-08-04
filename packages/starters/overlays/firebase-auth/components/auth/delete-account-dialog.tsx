import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useAuth } from '@/providers/auth-provider';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';

/**
 * Confirms, reauthenticates, then deletes.
 *
 * `deleteUser` throws `auth/requires-recent-login` unless the user signed in
 * within roughly the last five minutes — deleting an account is exactly the
 * operation Firebase will not take on a stale token. So a password-account user
 * types their password here and `useDeleteAccount` exchanges it for a fresh
 * credential.
 *
 * A federated user (Google, Apple) has no password to type. Reauthenticating
 * them means re-running the provider flow, which is a different enough shape
 * that this dialog sends them to sign out and back in instead — honest, and
 * shorter than a second copy of the OAuth code.
 *
 * Replaces the `delete-account` edge function a Supabase project would deploy.
 * Firebase lets a user delete their own account from the client, so no server
 * is needed — but read the comment in `hooks/useDeleteAccount.ts` about what
 * that costs in cascade guarantees.
 */
export function DeleteAccountDialog({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const { deleteAccount, deleting } = useDeleteAccount();
  const [password, setPassword] = useState('');
  const toast = useToast();

  // `password` means an email/password account. Anything else came from a
  // provider and cannot be reauthenticated with a typed secret.
  const usesPassword = user?.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  const confirm = async () => {
    if (usesPassword && !password) return;

    const ok = await deleteAccount(usesPassword ? password : undefined);

    if (!ok) {
      toast.error(
        'Could not delete your account',
        usesPassword
          ? 'Check your password and try again.'
          : 'Sign out, sign back in, and try again — Firebase requires a recent sign-in for this.'
      );
      return;
    }

    // No navigation: the auth listener fires with null and the route guards
    // put the user back on sign-in.
    setPassword('');
    onClose();
  };

  return (
    <AlertDialog
      isVisible={visible}
      onClose={onClose}
      title='Delete your account?'
      confirmText={deleting ? 'Deleting…' : 'Delete everything'}
      cancelText='Keep my account'
      onConfirm={confirm}
      onCancel={() => {
        setPassword('');
        onClose();
      }}
      dismissible={!deleting}
    >
      <View style={{ gap: 12 }}>
        <Text variant='caption'>
          This removes your tasks, your avatar and your profile, then deletes
          the account itself. It cannot be undone.
        </Text>

        {usesPassword ? (
          <Input
            label='Confirm your password'
            icon={Lock}
            placeholder='Your password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
            textContentType='password'
          />
        ) : (
          <Text variant='caption'>
            You signed in with a provider, so Firebase needs a recent sign-in
            before it will delete the account. If this fails, sign out, sign
            back in, and try again straight away.
          </Text>
        )}
      </View>
    </AlertDialog>
  );
}
