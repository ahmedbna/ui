import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MediaPicker, type MediaAsset } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { AuthScreen } from '@/components/auth/auth-screen';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import { useProfile } from '@/hooks/useProfile';
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

export default function OnboardingProfileScreen() {
  const { user, profile } = useAuth();
  const { completeOnboarding, saving } = useProfile();
  const { upload, uploading } = useAvatarUpload();
  const toast = useToast();

  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? null);

  const pickAvatar = async (assets: MediaAsset[]) => {
    const asset = assets[0];
    if (!asset) return;

    const url = await upload(asset);
    if (!url) {
      toast.error('Could not upload', 'Check the avatars bucket policies.');
      return;
    }
    setAvatarUrl(url);
  };

  const finish = async () => {
    const ok = await completeOnboarding({
      display_name: displayName.trim() || null,
      avatar_url: avatarUrl,
    });

    if (!ok) {
      toast.error('Could not save', 'Try again in a moment.');
      return;
    }

    // `onboarded` is now true, so the guard in app/_layout.tsx unmounts this
    // group and mounts the tabs. No navigation call needed.
  };

  const busy = saving || uploading;

  return (
    <AuthScreen
      title='One last thing'
      subtitle='How should we show you around the app?'
      footer={
        <Button variant='ghost' disabled={busy} onPress={finish}>
          Skip for now
        </Button>
      }
    >
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Avatar size={96}>
          {avatarUrl ? (
            <AvatarImage source={{ uri: avatarUrl }} />
          ) : (
            <AvatarFallback>
              {initialsOf(displayName || user?.email || '')}
            </AvatarFallback>
          )}
        </Avatar>

        <MediaPicker
          mediaType='image'
          variant='outline'
          size='sm'
          buttonText={avatarUrl ? 'Change photo' : 'Add a photo'}
          showPreview={false}
          disabled={busy}
          onSelectionChange={pickAvatar}
          onError={(message) => toast.error('Picker error', message)}
        />
      </View>

      <Input
        label='Display name'
        icon={User}
        placeholder='Ada Lovelace'
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize='words'
        autoComplete='name'
        textContentType='name'
      />

      <Button disabled={busy} loading={saving} onPress={finish}>
        Finish
      </Button>

      <Text variant='caption'>
        You can change both of these later in Settings.
      </Text>
    </AuthScreen>
  );
}
