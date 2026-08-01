import { AlertDialog } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MediaPicker, type MediaAsset } from '@/components/ui/media-picker';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';
import { User } from 'lucide-react-native';
import { useState } from 'react';

const initialsOf = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || '?';

export default function SettingsScreen() {
  const { user, profile, signOut } = useAuth();
  const { update, saving } = useProfile();
  const { upload, uploading } = useAvatarUpload();
  const toast = useToast();

  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [invoking, setInvoking] = useState(false);
  const [functionResult, setFunctionResult] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const changeAvatar = async (assets: MediaAsset[]) => {
    const asset = assets[0];
    if (!asset) return;

    const url = await upload(asset);
    if (!url) {
      toast.error('Could not upload', 'Check the avatars bucket policies.');
      return;
    }

    if (await update({ avatar_url: url })) {
      toast.success('Avatar updated');
    }
  };

  const saveName = async () => {
    if (await update({ display_name: displayName.trim() || null })) {
      toast.success('Saved');
    }
  };

  const invokeFunction = async () => {
    setInvoking(true);
    setFunctionResult(null);

    // The client attaches the user's access token automatically, so the
    // function sees who is calling and its own queries run under the same RLS
    // policies this app does.
    const { data, error } = await supabase.functions.invoke('hello-world');

    setInvoking(false);

    if (error) {
      toast.error('Function failed', 'Deploy it: npm run functions:deploy');
      return;
    }

    setFunctionResult(JSON.stringify(data, null, 2));
  };

  const deleteAccount = async () => {
    setConfirmingDelete(false);

    // Deleting a user requires a secret key, which must never be in the app
    // bundle — so this calls `supabase/functions/delete-account`, which holds
    // one server-side and identifies the caller from their own JWT.
    const { error } = await supabase.functions.invoke('delete-account');

    if (error) {
      toast.error('Could not delete', 'Deploy it: npm run functions:deploy');
      return;
    }

    // The account is gone; the session it belonged to has to go too.
    await signOut();
  };

  const nameChanged = displayName.trim() !== (profile?.display_name ?? '');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingTop: 120, gap: 20 }}
    >
      <Card style={{ alignItems: 'center', gap: 12 }}>
        <Avatar size={88}>
          {profile?.avatar_url ? (
            <AvatarImage source={{ uri: profile.avatar_url }} />
          ) : (
            <AvatarFallback>
              {initialsOf(profile?.display_name ?? user?.email ?? '')}
            </AvatarFallback>
          )}
        </Avatar>

        <View style={{ alignItems: 'center', gap: 4 }}>
          <Text variant='subtitle'>
            {profile?.display_name ?? 'No display name'}
          </Text>
          <Text variant='caption'>{user?.email}</Text>
          {user?.app_metadata.provider && (
            <Badge variant='secondary'>
              {`Signed in with ${user.app_metadata.provider}`}
            </Badge>
          )}
        </View>

        <MediaPicker
          mediaType='image'
          variant='outline'
          size='sm'
          buttonText='Change photo'
          showPreview={false}
          disabled={uploading || saving}
          onSelectionChange={changeAvatar}
          onError={(message) => toast.error('Picker error', message)}
        />
      </Card>

      <Card style={{ gap: 12 }}>
        <Input
          label='Display name'
          icon={User}
          placeholder='Ada Lovelace'
          value={displayName}
          onChangeText={setDisplayName}
          autoCapitalize='words'
        />
        <Button
          disabled={!nameChanged || saving}
          loading={saving}
          onPress={saveName}
        >
          Save
        </Button>
      </Card>

      <Separator />

      <View style={{ alignItems: 'center' }}>
        <ModeToggle />
      </View>

      <Separator />

      <View style={{ gap: 8 }}>
        <Text variant='subtitle'>Edge function</Text>
        <Text variant='caption'>
          Deno, running close to your database, with your access token attached.
        </Text>
      </View>

      <Card style={{ gap: 12 }}>
        <Button loading={invoking} onPress={invokeFunction}>
          Invoke hello-world
        </Button>
        {functionResult && (
          <Text
            variant='caption'
            style={{ fontFamily: 'monospace', fontSize: 12 }}
          >
            {functionResult}
          </Text>
        )}
      </Card>

      <Separator />

      <View style={{ gap: 12 }}>
        <SignOutButton />

        <Button variant='destructive' onPress={() => setConfirmingDelete(true)}>
          Delete account
        </Button>
      </View>

      <AlertDialog
        isVisible={confirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        title='Delete your account?'
        description='Your profile, tasks and uploaded files are removed. This cannot be undone.'
        confirmText='Delete'
        cancelText='Keep it'
        onConfirm={deleteAccount}
        onCancel={() => setConfirmingDelete(false)}
      />
    </ScrollView>
  );
}
