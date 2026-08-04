import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollView } from '@/components/ui/scroll-view';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { tasksFromSnapshot, type Task } from '@/lib/documents';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';
import { useAuth } from '@/providers/auth-provider';
import { useSearch } from '@/providers/search-context';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

/**
 * Search over the signed-in user's tasks.
 *
 * Two things are worth reading before you change this query.
 *
 * **The ownerId filter is mandatory, not a convenience.** Firestore evaluates a
 * read rule against the *query*, refusing any it cannot prove in advance is
 * limited to documents the rule allows. Drop `where('ownerId', '==', uid)` and
 * this fails with permission-denied — it does not fall back to returning only
 * your own rows. That is the exact inverse of Postgres row level security,
 * where the filter is optional and the policy quietly narrows the result. If
 * you are moving between the Supabase and Firebase starters, this is the
 * difference that will bite you.
 *
 * **Search matches whole words.** Firestore has no `LIKE`, so this queries a
 * `searchTokens` array written at insert time by `tokenize()`. Typing "migra"
 * finds nothing where a Postgres `ilike '%migra%'` would find "migration". When
 * that stops being good enough, put an Algolia, Typesense or Elastic extension
 * in front of the collection — do not fetch everything and filter in JS, which
 * reads (and bills for) the whole collection on every keystroke.
 *
 * Three fields combined needs a composite index; it is already in
 * firestore.indexes.json.
 */
export default function SearchScreen() {
  const { searchText } = useSearch();
  const { user } = useAuth();
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.uid ?? null;

  useEffect(() => {
    const term = searchText.trim().toLowerCase();
    // Nothing to fetch. No state reset either: the render below branches on the
    // empty term before it ever reads `results`, and clearing state
    // synchronously inside an effect triggers a cascading render.
    if (!term || !userId) return;

    let active = true;

    // Debounced: the native search bar fires on every keystroke, and each one
    // would otherwise be a document read you pay for.
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        // `getDocs`, not `onSnapshot`: a search result is a point-in-time
        // answer, and a listener per keystroke would leak subscriptions.
        const snapshot = await getDocs(
          query(
            collection(db, 'tasks'),
            where('ownerId', '==', userId),
            where('searchTokens', 'array-contains', term),
            orderBy('createdAt', 'desc'),
            limit(50)
          )
        );

        if (!active) return;
        setResults(tasksFromSnapshot(snapshot));
      } catch (caught) {
        if (!active) return;
        setError(messageFor(caught));
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchText, userId]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingTop: 120, gap: 12 }}
      keyboardShouldPersistTaps='handled'
    >
      {!searchText.trim() ? (
        <Card style={{ alignItems: 'center', gap: 8, paddingVertical: 32 }}>
          <Text variant='subtitle'>Search your tasks</Text>
          <Text variant='caption' style={{ textAlign: 'center' }}>
            Type above. Each query runs `array-contains` against Firestore,
            scoped to your own documents.
          </Text>
        </Card>
      ) : error ? (
        <Card style={{ gap: 8 }}>
          <Text variant='caption'>{error}</Text>
        </Card>
      ) : loading ? (
        <View style={{ gap: 8 }}>
          <Skeleton height={56} variant='rounded' />
          <Skeleton height={56} variant='rounded' />
        </View>
      ) : results.length === 0 ? (
        <View style={{ gap: 8 }}>
          <Text variant='caption' style={{ textAlign: 'center' }}>
            No tasks match “{searchText.trim()}”.
          </Text>
          <Text variant='caption' style={{ textAlign: 'center', opacity: 0.7 }}>
            Search matches whole words, so a partial word finds nothing.
          </Text>
        </View>
      ) : (
        <>
          <Text variant='caption'>
            {results.length} {results.length === 1 ? 'match' : 'matches'}
          </Text>
          {results.map((task) => (
            <Card
              key={task.id}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <Text variant='body' style={{ flex: 1 }}>
                {task.text}
              </Text>
              {task.isComplete && <Badge variant='success'>Done</Badge>}
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
}
