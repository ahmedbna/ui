'use client';

import { useConvexAuth } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export const SignOutButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force a hard refresh to ensure clean state
      router.dismissAll();
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback navigation
      router.dismissAll();
    }
  };

  return isAuthenticated ? (
    <Button
      size='lg'
      variant='destructive'
      onPress={handleSignOut}
      icon={LogOut}
    >
      Logout
    </Button>
  ) : null;
};
