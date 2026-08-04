import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollView } from '@/components/ui/scroll-view';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { tasksFromSnapshot, type Task } from '@/lib/documents';
import { messageFor } from '@/lib/errors';
import { db } from '@/lib/firebase';
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
 * Search over the tasks collection.
 *
 * Firestore has no `LIKE`, no substring matching and no built-in full-text
 * index, so this queries a `searchTokens` array written at insert time by
 * `tokenize()` in lib/documents.ts. The trade is honest and worth understanding
 * before you build on it: **this matches whole words only**. Typing "migra"
 * finds nothing where a Postgres `ilike '%migra%'` would find "migration".
 *
 * When that stops being good enough, put a real search service in front of the
 * collection — the Firestore console lists official Algolia, Typesense and
 * Elastic extensions that mirror writes for you. Do not try to fix it by
 * fetching everything and filtering in JS; that reads the whole collection on
 * every keystroke and you pay for each document.
 *
 * The combination of `array-contains` with an `orderBy` on a different field
 * needs a composite index. It is already in firestore.indexes.json — if you
 * change this query, Firestore will reject it with a console URL that builds
 * the right one.
 */
export default function SearchScreen() {
  const { searchText } = useSearch();
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const term = searchText.trim().toLowerCase();
    // Nothing to fetch. No state reset either: the render below branches on the
    // empty term before it ever reads `results`, and clearing state
    // synchronously inside an effect triggers a cascading render.
    if (!term) return;

    let active = true;

    // Debounced: the native search bar fires on every keystroke, and each one
    // would otherwise be a document read you pay for. Results from the previous
    // term stay visible meanwhile, which reads better than a skeleton on every
    // keystroke.
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        // `getDocs`, not `onSnapshot`: a search result is a point-in-time
        // answer, and a listener per keystroke would leak subscriptions.
        const snapshot = await getDocs(
          query(
            collection(db, 'tasks'),
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
  }, [searchText]);

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
            Type above. Each query runs `array-contains` against Firestore, not
            against a local array.
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
