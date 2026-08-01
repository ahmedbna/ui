import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface UploadedFile {
  path: string;
  publicUrl: string;
}

/** What `MediaPicker` hands back, narrowed to the fields an upload needs. */
export interface UploadSource {
  uri: string;
  filename?: string;
}

const extensionOf = (uri: string) =>
  uri.split('.').pop()?.split('?')[0]?.toLowerCase() || 'jpg';

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

/**
 * Uploads a local file URI to the public `uploads` bucket.
 *
 * The file is read with `fetch(uri).arrayBuffer()` rather than a base64 string:
 * base64 inflates the payload by a third and has to be held in JS memory in one
 * piece, which is what makes large images crash on Android.
 *
 * `contentType` is set explicitly. Supabase defaults to
 * `application/octet-stream`, which makes the object download instead of render
 * and fails the bucket's `allowed_mime_types` check from 0002_storage.sql.
 */
export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (asset: UploadSource): Promise<UploadedFile | null> => {
      setUploading(true);
      setError(null);

      try {
        const extension = extensionOf(asset.filename ?? asset.uri);
        const contentType = MIME[extension] ?? 'image/jpeg';
        const path = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${extension}`;

        const body = await fetch(asset.uri).then((res) => res.arrayBuffer());

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(path, body, { contentType, upsert: false });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('uploads').getPublicUrl(path);

        return { path, publicUrl };
      } catch (caught) {
        setError((caught as Error).message);
        return null;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  return { upload, uploading, error };
}
