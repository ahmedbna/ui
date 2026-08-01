import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';
import type { TablesUpdate } from '@/lib/database.types';

/**
 * Writes to the signed-in user's profile row.
 *
 * Reading is the provider's job — it holds the row and keeps it current over a
 * realtime subscription, so there is no second copy to keep in sync here.
 *
 * `id` is never sent: the RLS policy in 0001_profiles.sql already restricts the
 * update to `auth.uid() = id`, so the filter below is belt and braces and the
 * column stays out of reach either way.
 */
export function useProfile() {
  const { profile, user, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    async (patch: Omit<TablesUpdate<'profiles'>, 'id'>) => {
      if (!user) return false;

      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('profiles')
        .update(patch)
        .eq('id', user.id);

      setSaving(false);

      if (updateError) {
        setError(updateError.message);
        return false;
      }

      // The realtime subscription usually beats this, but a project with
      // realtime disabled would otherwise show stale data until remount.
      await refreshProfile();
      return true;
    },
    [user, refreshProfile]
  );

  const completeOnboarding = useCallback(
    (patch: Omit<TablesUpdate<'profiles'>, 'id' | 'onboarded'> = {}) =>
      update({ ...patch, onboarded: true }),
    [update]
  );

  return { profile, update, completeOnboarding, saving, error };
}
