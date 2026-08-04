import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { MediaPicker, type MediaAsset } from '@/components/ui/media-picker';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Progress } from '@/components/ui/progress';
import { ScrollView } from '@/components/ui/scroll-view';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useUpload, type UploadedFile } from '@/hooks/useUpload';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useState } from 'react';

export default function SettingsScreen() {
  const { upload, uploading, progress } = useUpload();
  const [selected, setSelected] = useState<MediaAsset[]>([]);
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const toast = useToast();

  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '';
  const usingEmulator = process.env.EXPO_PUBLIC_FIREBASE_USE_EMULATOR === '1';

  const handleUpload = async () => {
    const asset = selected[0];
    if (!asset) return;

    const result = await upload(asset);
    if (!result) {
      toast.error(
        'Upload failed',
        'Check the conditions in storage.rules — size and contentType are both enforced there.'
      );
      return;
    }

    setUploaded((prev) => [result, ...prev]);
    setSelected([]);
    toast.success('Uploaded', result.path);
  };

  const countTasks = async () => {
    setCounting(true);
    try {
      // An aggregation query: the count is computed server-side and only the
      // number comes back, so this costs a handful of reads rather than one per
      // document. Never fetch a collection just to call `.length` on it.
      const snapshot = await getCountFromServer(collection(db, 'tasks'));
      setCount(snapshot.data().count);
    } catch (caught) {
      toast.error('Count failed', messageFor(caught));
    } finally {
      setCounting(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingTop: 120, gap: 20 }}
    >
      <View style={{ alignItems: 'center' }}>
        <ModeToggle />
      </View>

      <Card style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text variant='subtitle' style={{ flex: 1 }}>
            Project
          </Text>
          <Badge
            variant={
              !projectId
                ? 'destructive'
                : usingEmulator
                  ? 'secondary'
                  : 'success'
            }
          >
            {!projectId
              ? 'Not configured'
              : usingEmulator
                ? 'Emulator'
                : 'Connected'}
          </Badge>
        </View>
        <Text variant='caption' numberOfLines={1}>
          {projectId || 'Set EXPO_PUBLIC_FIREBASE_PROJECT_ID in .env.local'}
        </Text>
      </Card>

      <Separator />

      <View style={{ gap: 8 }}>
        <Text variant='subtitle'>Aggregation</Text>
        <Text variant='caption'>
          `getCountFromServer` counts documents without reading them. The whole
          collection is counted, not just the 50 the home tab subscribes to.
        </Text>
      </View>

      <Card style={{ gap: 12 }}>
        <Button loading={counting} onPress={countTasks}>
          Count every task
        </Button>
        {count !== null && (
          <Text variant='caption'>
            {count} {count === 1 ? 'task' : 'tasks'} in Firestore
          </Text>
        )}
      </Card>

      <Separator />

      <View style={{ gap: 8 }}>
        <Text variant='subtitle'>Storage</Text>
        <Text variant='caption'>
          Uploads land under `uploads/`, which storage.rules leaves publicly
          readable. `getDownloadURL()` returns a URL carrying an access token —
          anyone holding it can read the file even after you tighten the rules,
          so treat it as a shared link rather than a permission check.
        </Text>
      </View>

      <Card style={{ gap: 12 }}>
        <MediaPicker
          mediaType='image'
          buttonText='Choose an image'
          selectedAssets={selected}
          onSelectionChange={setSelected}
          onError={(message) => toast.error('Picker error', message)}
        />
        <Button
          disabled={selected.length === 0 || uploading}
          loading={uploading}
          onPress={handleUpload}
        >
          Upload to Firebase
        </Button>
        {/* Real byte-level progress, which `uploadBytes` cannot report —
            `uploadBytesResumable` is what makes this possible. */}
        {uploading && <Progress value={progress * 100} />}
      </Card>

      {uploaded.map((file) => (
        <Card key={file.path} style={{ gap: 8 }}>
          <Image
            source={{ uri: file.downloadUrl }}
            style={{ width: '100%', height: 180 }}
            contentFit='cover'
          />
          <Text variant='caption' numberOfLines={1}>
            {file.path}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}
