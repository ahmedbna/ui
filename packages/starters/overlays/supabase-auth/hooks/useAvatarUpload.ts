import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';

/** What `MediaPicker` hands back, narrowed to the fields an upload needs. */
export interface UploadSource {
  uri: string;
  filename?: string;
}

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

const extensionOf = (uri: string) =>
  uri.split('.').pop()?.split('?')[0]?.toLowerCase() || 'jpg';

/**
 * Uploads an avatar and returns its public URL.
 *
 * The object path is always `<user-id>/avatar.<ext>`. That is not cosmetic —
 * the storage policies in 0003_storage.sql compare
 * `(storage.foldername(name))[1]` to `auth.uid()`, so a path that does not
 * start with the caller's own id is rejected by the database. It also means one
 * avatar per user, replaced in place rather than accumulating.
 *
 * The file is read with `fetch(uri).arrayBuffer()` rather than base64: base64
 * is a third larger and has to be held in memory whole, which is what makes
 * large images fail on Android.
 */
export function useAvatarUpload() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (asset: UploadSource): Promise<string | null> => {
      if (!user) return null;

      setUploading(true);
      setError(null);

      try {
        const extension = extensionOf(asset.filename ?? asset.uri);
        const contentType = MIME[extension] ?? 'image/jpeg';
        const path = `${user.id}/avatar.${extension}`;

        const body = await fetch(asset.uri).then((res) => res.arrayBuffer());

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(path, body, {
            contentType,
            // Replaces the previous avatar instead of failing on a name clash.
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('avatars').getPublicUrl(path);

        // The path is stable, so every upload returns the same URL and the CDN
        // keeps serving the old image. A cache-buster is the difference between
        // the new avatar appearing now and appearing tomorrow.
        return `${publicUrl}?v=${Date.now()}`;
      } catch (caught) {
        setError((caught as Error).message);
        return null;
      } finally {
        setUploading(false);
      }
    },
    [user]
  );

  return { upload, uploading, error };
}
