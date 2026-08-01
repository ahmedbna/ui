import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollView } from '@/components/ui/scroll-view';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { supabase } from '@/lib/supabase';
import type { Task } from '@/lib/database.types';
import { useSearch } from '@/providers/search-context';
import { useEffect, useState } from 'react';

/**
 * Full-text-ish search over the tasks table.
 *
 * `ilike` with `%term%` is the honest starting point: no extra indexes, no
 * configuration, and it goes to the database rather than filtering a local
 * array — so it still works when the table outgrows the 50 rows the home tab
 * holds. For real full-text search, add a `tsvector` column and switch to
 * `.textSearch()`; the docs cover it.
 */
export default function SearchScreen() {
  const { searchText } = useSearch();
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = searchText.trim();
    // Nothing to fetch. No state reset either: the render below branches on the
    // empty term before it ever reads `results`, and clearing state
    // synchronously inside an effect triggers a cascading render.
    if (!term) return;

    let active = true;

    // Debounced: the native search bar fires on every keystroke, and each one
    // would otherwise be a round trip. Results from the previous term stay
    // visible meanwhile, which reads better than a skeleton on every keystroke.
    const timer = setTimeout(async () => {
      setLoading(true);

      const { data } = await supabase
        .from('tasks')
        .select('*')
        .ilike('text', `%${term}%`)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!active) return;
      setResults(data ?? []);
      setLoading(false);
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
            Type above. Each query runs `ilike` against Postgres, not against a
            local array.
          </Text>
        </Card>
      ) : loading ? (
        <View style={{ gap: 8 }}>
          <Skeleton height={56} variant='rounded' />
          <Skeleton height={56} variant='rounded' />
        </View>
      ) : results.length === 0 ? (
        <Text variant='caption' style={{ textAlign: 'center' }}>
          No tasks match “{searchText.trim()}”.
        </Text>
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
              {task.is_complete && <Badge variant='success'>Done</Badge>}
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
}
