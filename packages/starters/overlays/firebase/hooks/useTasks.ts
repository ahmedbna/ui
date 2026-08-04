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
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { tasksFromSnapshot, tokenize, type Task } from '@/lib/documents';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';

/**
 * The task list, kept live.
 *
 * One `onSnapshot` subscription is the whole thing. Coming from a Supabase or
 * REST codebase, three habits are worth unlearning here:
 *
 * 1. **No initial fetch.** `onSnapshot` delivers the current result set itself —
 *    from cache first if it has one, then from the server — and re-delivers it
 *    on every change. A `select` before subscribing would just be a slower
 *    duplicate of the first callback.
 *
 * 2. **No optimistic apply, and no rollback.** `addDoc` / `updateDoc` /
 *    `deleteDoc` mutate the local cache synchronously and the listener re-fires
 *    with `hasPendingWrites: true` before the network is touched. If the server
 *    rejects the write, the SDK reverts the local mutation and fires again.
 *    That is roughly forty lines of bookkeeping the SDK is doing for you.
 *
 * 3. **No refetch on reconnect.** The stream resumes from a resume token and
 *    the server sends what was missed.
 *
 * What the SDK does *not* do for you is tell the user a write was rejected —
 * the awaited promise is the only place a `permission-denied` surfaces, so
 * every mutation below catches.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, 'tasks'),
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
  }, [attempt]);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setAttempt((n) => n + 1);
  }, []);

  const add = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        text: trimmed,
        isComplete: false,
        // firestore.rules requires `createdAt == request.time`, so a client
        // clock cannot forge this. Locally it reads as null until the server
        // acknowledges the write — see `millisOf` in lib/documents.ts.
        createdAt: serverTimestamp(),
        // Written at write time by the same function the search screen queries
        // with, because Firestore cannot match substrings at read time.
        searchTokens: tokenize(trimmed),
      });
    } catch (caught) {
      setError(messageFor(caught));
    }
  }, []);

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
