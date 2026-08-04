import { AuthScreen } from '@/components/auth/auth-screen';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MediaPicker, type MediaAsset } from '@/components/ui/media-picker';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
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
  const { upload, uploading, progress } = useAvatarUpload();
  const toast = useToast();

  const [displayName, setDisplayName] = useState(
    profile?.displayName ?? user?.displayName ?? ''
  );
  const [photoURL, setPhotoURL] = useState(profile?.photoURL ?? null);

  const pickAvatar = async (assets: MediaAsset[]) => {
    const asset = assets[0];
    if (!asset) return;

    const url = await upload(asset);
    if (!url) {
      toast.error(
        'Could not upload',
        'Check storage.rules — the path has to start with your own uid.'
      );
      return;
    }
    setPhotoURL(url);
  };

  const finish = async () => {
    const ok = await completeOnboarding({
      displayName: displayName.trim() || null,
      photoURL,
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
          {photoURL ? (
            <AvatarImage source={{ uri: photoURL }} />
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
          buttonText={photoURL ? 'Change photo' : 'Add a photo'}
          showPreview={false}
          disabled={busy}
          onSelectionChange={pickAvatar}
          onError={(message) => toast.error('Picker error', message)}
        />

        {uploading && (
          <View style={{ alignSelf: 'stretch' }}>
            <Progress value={progress * 100} />
          </View>
        )}
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
