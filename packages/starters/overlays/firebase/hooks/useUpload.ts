import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from 'firebase/storage';
import { useCallback, useState } from 'react';
import { messageFor } from '@/lib/errors';
import { storage } from '@/lib/firebase';

export interface UploadedFile {
  path: string;
  downloadUrl: string;
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
 * Uploads a local file URI to the `uploads/` prefix in Cloud Storage.
 *
 * The file is read with `fetch(uri).blob()` rather than a base64 string: base64
 * inflates the payload by a third and has to be held in JS memory in one piece,
 * which is what makes large images crash on Android.
 *
 * `uploadBytesResumable` rather than `uploadBytes`, for the `progress` value —
 * it reports bytes transferred as they go, which `uploadBytes` cannot. It also
 * resumes rather than restarting when a large upload is interrupted.
 *
 * `contentType` is set explicitly. Storage otherwise infers
 * `application/octet-stream`, which makes the object download instead of render
 * *and* fails the `contentType.matches('image/…')` condition in storage.rules.
 */
export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (asset: UploadSource): Promise<UploadedFile | null> => {
      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const extension = extensionOf(asset.filename ?? asset.uri);
        const contentType = MIME[extension] ?? 'image/jpeg';
        const path = `uploads/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${extension}`;

        const blob = await fetch(asset.uri).then((res) => res.blob());
        const task = uploadBytesResumable(ref(storage, path), blob, {
          contentType,
        });

        await new Promise<void>((resolve, reject) => {
          task.on(
            'state_changed',
            (snapshot: UploadTaskSnapshot) => {
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

        // A capability URL: it carries a token that grants read access to this
        // object regardless of what storage.rules says afterwards. Tightening
        // the rules does not invalidate a URL already in the wild — rotate the
        // object's download token in the console for that.
        const downloadUrl = await getDownloadURL(task.snapshot.ref);

        return { path, downloadUrl };
      } catch (caught) {
        setError(messageFor(caught));
        return null;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  return { upload, uploading, progress, error };
}
