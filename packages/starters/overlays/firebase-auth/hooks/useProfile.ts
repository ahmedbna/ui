import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';
import { useAuth } from '@/providers/auth-provider';

/** The fields firestore.rules lets a user change on their own document. */
export interface ProfilePatch {
  displayName?: string | null;
  photoURL?: string | null;
  onboarded?: boolean;
}

/**
 * Writes to the signed-in user's profile document.
 *
 * Reading is the provider's job — it holds the document and keeps it current
 * over an `onSnapshot` subscription, so there is no second copy to keep in sync
 * here.
 *
 * `email` is never sent: it mirrors the Firebase Auth record, and the update
 * rule in firestore.rules rejects it outright rather than letting the two drift
 * apart. `updatedAt` is always sent because the rule's `affectedKeys().hasOnly`
 * list includes it and nothing else refreshes it.
 */
export function useProfile() {
  const { profile, user, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    async (patch: ProfilePatch): Promise<boolean> => {
      if (!user) return false;

      setSaving(true);
      setError(null);

      try {
        await updateDoc(doc(db, 'users', user.uid), {
          ...patch,
          updatedAt: serverTimestamp(),
        });

        // The snapshot listener in the provider almost always beats this, but
        // an explicit refresh means a caller can await the write and then read
        // a current profile without a render in between.
        await refreshProfile();
        return true;
      } catch (caught) {
        setError(messageFor(caught));
        return false;
      } finally {
        setSaving(false);
      }
    },
    [user, refreshProfile]
  );

  const completeOnboarding = useCallback(
    (patch: Omit<ProfilePatch, 'onboarded'> = {}) =>
      update({ ...patch, onboarded: true }),
    [update]
  );

  return { profile, update, completeOnboarding, saving, error };
}
