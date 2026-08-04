import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { tasksFromSnapshot, tokenize, type Task } from '@/lib/documents';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';
import { useAuth } from '@/providers/auth-provider';

/**
 * The signed-in user's task list, kept live.
 *
 * One `onSnapshot` subscription is the whole thing. Coming from a Supabase or
 * REST codebase, three habits are worth unlearning here:
 *
 * 1. **No initial fetch.** `onSnapshot` delivers the current result set itself
 *    and re-delivers it on every change.
 *
 * 2. **No optimistic apply, and no rollback.** `addDoc` / `updateDoc` /
 *    `deleteDoc` mutate the local cache synchronously and the listener re-fires
 *    with `hasPendingWrites: true` before the network is touched. If the server
 *    rejects the write, the SDK reverts it and fires again.
 *
 * 3. **No refetch on reconnect.** The stream resumes from a resume token.
 *
 * What the SDK does *not* do is tell the user a write was rejected — the
 * awaited promise is the only place a `permission-denied` surfaces, so every
 * mutation below catches.
 */
export function useTasks() {
  const { user } = useAuth();
  const userId = user?.uid ?? null;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const tasksQuery = query(
      collection(db, 'tasks'),
      // Required by firestore.rules, not a convenience. Firestore evaluates a
      // read rule against the QUERY: without this filter it cannot prove the
      // result is limited to documents you own, so the whole query fails with
      // permission-denied. It does not return fewer rows — it returns none.
      // This is the exact inverse of Postgres row level security.
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    return onSnapshot(
      tasksQuery,
      // Without this the listener does not re-fire when only metadata changed,
      // so `fromCache` never flips and the connection dot stays grey forever
      // after the first server response.
      { includeMetadataChanges: true },
      (snapshot) => {
        setTasks(tasksFromSnapshot(snapshot));
        setConnected(!snapshot.metadata.fromCache);
        setLoading(false);
      },
      (caught) => {
        // Terminal. Firestore has already torn the listener down and will not
        // retry a permission-denied or a missing-index failure — unlike
        // Supabase's channel status, this fires once and never again. Hence
        // `retry()` below rather than waiting for a reconnect that never comes.
        setError(messageFor(caught));
        setConnected(false);
        setLoading(false);
      }
    );
  }, [userId, attempt]);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setAttempt((n) => n + 1);
  }, []);

  const add = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !userId) return;

      try {
        await addDoc(collection(db, 'tasks'), {
          text: trimmed,
          isComplete: false,
          // firestore.rules requires `createdAt == request.time`, so a client
          // clock cannot forge this. Locally it reads as null until the server
          // acknowledges the write — see `millisOf` in lib/documents.ts.
          createdAt: serverTimestamp(),
          searchTokens: tokenize(trimmed),
          // Checked on every read, update and delete. Setting someone else's
          // uid here is rejected by the create rule.
          ownerId: userId,
        });
      } catch (caught) {
        setError(messageFor(caught));
      }
    },
    [userId]
  );

  const toggle = useCallback(async (task: Task) => {
    try {
      // A partial patch, but the rules see the *merged* document — so this
      // still satisfies `isValidTask(request.resource.data)`. If you ever let
      // users edit `text`, rewrite `searchTokens` in the same updateDoc or the
      // search index silently goes stale.
      await updateDoc(doc(db, 'tasks', task.id), {
        isComplete: !task.isComplete,
      });
    } catch (caught) {
      setError(messageFor(caught));
    }
  }, []);

  const remove = useCallback(async (task: Task) => {
    try {
      await deleteDoc(doc(db, 'tasks', task.id));
    } catch (caught) {
      setError(messageFor(caught));
    }
  }, []);

  return { tasks, loading, error, connected, add, toggle, remove, retry };
}
