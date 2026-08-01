import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { MediaPicker, type MediaAsset } from '@/components/ui/media-picker';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useUpload, type UploadedFile } from '@/hooks/useUpload';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function SettingsScreen() {
  const { upload, uploading } = useUpload();
  const [selected, setSelected] = useState<MediaAsset[]>([]);
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [invoking, setInvoking] = useState(false);
  const [functionResult, setFunctionResult] = useState<string | null>(null);
  const toast = useToast();

  const projectUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
  const projectRef = projectUrl.replace(/^https?:\/\//, '').split('.')[0];

  const handleUpload = async () => {
    const asset = selected[0];
    if (!asset) return;

    const result = await upload(asset);
    if (!result) {
      toast.error(
        'Upload failed',
        'Check the bucket policies in supabase/migrations/0002_storage.sql'
      );
      return;
    }

    setUploaded((prev) => [result, ...prev]);
    setSelected([]);
    toast.success('Uploaded', result.path);
  };

  const invokeFunction = async () => {
    setInvoking(true);
    setFunctionResult(null);

    const { data, error } = await supabase.functions.invoke('hello-world');

    setInvoking(false);

    if (error) {
      toast.error(
        'Function failed',
        'Deploy it first: npm run functions:deploy'
      );
      return;
    }

    setFunctionResult(JSON.stringify(data, null, 2));
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
          <Badge variant={projectRef ? 'success' : 'destructive'}>
            {projectRef ? 'Connected' : 'Not configured'}
          </Badge>
        </View>
        <Text variant='caption' numberOfLines={1}>
          {projectUrl || 'Set EXPO_PUBLIC_SUPABASE_URL in .env.local'}
        </Text>
      </Card>

      <Separator />

      <View style={{ gap: 8 }}>
        <Text variant='subtitle'>Storage</Text>
        <Text variant='caption'>
          Uploads land in the public `uploads` bucket, so `getPublicUrl()`
          returns a link anyone can open. Use a private bucket and
          `createSignedUrl()` for anything that is not meant to be shared.
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
          Upload to Supabase
        </Button>
      </Card>

      {uploaded.map((file) => (
        <Card key={file.path} style={{ gap: 8 }}>
          <Image
            source={{ uri: file.publicUrl }}
            style={{ width: '100%', height: 180 }}
            contentFit='cover'
          />
          <Text variant='caption' numberOfLines={1}>
            {file.path}
          </Text>
        </Card>
      ))}

      <Separator />

      <View style={{ gap: 8 }}>
        <Text variant='subtitle'>Edge function</Text>
        <Text variant='caption'>
          Deno, running close to your database. `supabase/functions/hello-world`
          counts the tasks table server-side and returns JSON.
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
    </ScrollView>
  );
}
