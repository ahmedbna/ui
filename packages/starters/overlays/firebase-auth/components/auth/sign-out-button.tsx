import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/providers/auth-provider';
import { useState } from 'react';

export function SignOutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      // Clears the persisted user from LargeSecureStore. `onAuthStateChanged`
      // fires with null, the guards in app/_layout.tsx unmount `(tabs)`, and
      // the user lands back on sign-in.
      await signOut();
    } catch (error) {
      toast.error('Could not sign out', (error as Error).message);
      setLoading(false);
    }
  };

  return (
    <Button variant='outline' loading={loading} onPress={handleSignOut}>
      Sign out
    </Button>
  );
}
