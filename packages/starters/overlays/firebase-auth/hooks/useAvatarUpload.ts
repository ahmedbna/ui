import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback, useState } from 'react';
import { messageFor } from '@/lib/errors';
import { auth, storage } from '@/lib/firebase';
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
 * Uploads an avatar and returns its download URL.
 *
 * The object path is always `avatars/<uid>/avatar.<ext>`. That is not cosmetic
 * — storage.rules compares the first path segment after `avatars/` to
 * `request.auth.uid`, so a path that does not start with the caller's own uid
 * is rejected by the server. It also means one avatar per user, replaced in
 * place rather than accumulating.
 *
 * Unlike the Supabase equivalent there is no `?v=` cache-buster. Supabase's
 * public URL is stable across uploads, so the CDN keeps serving the old image;
 * Firebase mints a fresh download token per upload, so `getDownloadURL` already
 * returns a different URL.
 *
 * The Firebase Auth `photoURL` is updated alongside the Firestore document, so
 * `user.photoURL` and `profile.photoURL` agree — several Firebase features read
 * the former.
 */
export function useAvatarUpload() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (asset: UploadSource): Promise<string | null> => {
      if (!user) return null;

      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const extension = extensionOf(asset.filename ?? asset.uri);
        const contentType = MIME[extension] ?? 'image/jpeg';
        const path = `avatars/${user.uid}/avatar.${extension}`;

        const blob = await fetch(asset.uri).then((res) => res.blob());
        const task = uploadBytesResumable(ref(storage, path), blob, {
          contentType,
        });

        await new Promise<void>((resolve, reject) => {
          task.on(
            'state_changed',
            (snapshot) => {
              // totalBytes is 0 for a beat on some platforms; guard the divide.
              setProgress(
                snapshot.totalBytes
                  ? snapshot.bytesTransferred / snapshot.totalBytes
                  : 0
              );
            },
            reject,
            resolve
          );
        });

        const downloadUrl = await getDownloadURL(task.snapshot.ref);

        // Best-effort: the Firestore document is the source of truth the app
        // renders from, so a failure here is not worth failing the upload over.
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
          }).catch(() => {});
        }

        return downloadUrl;
      } catch (caught) {
        setError(messageFor(caught));
        return null;
      } finally {
        setUploading(false);
      }
    },
    [user]
  );

  return { upload, uploading, progress, error };
}
