import { useCallback, useEffect, useState } from 'react';
import { applyChange, byNewest } from '@/lib/realtime';
import { supabase } from '@/lib/supabase';
import type { Task } from '@/lib/database.types';

/**
 * The task list, kept live.
 *
 * One `select` on mount, then a `postgres_changes` subscription patches the
 * list for the rest of the session — including changes made on other devices.
 * Mutations are applied optimistically and rolled back if the write fails, so
 * the UI stays responsive on a slow connection and still tells the truth.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data, error: selectError } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!active) return;

      if (selectError) setError(selectError.message);
      else setTasks(data ?? []);
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel('public:tasks')
      .on<Task>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => setTasks((prev) => applyChange(prev, payload))
      )
      .subscribe((status) => {
        if (!active) return;
        setConnected(status === 'SUBSCRIBED');
        // Reconnecting after a backgrounded app or a dropped network means the
        // list missed whatever happened while it was away. Refetch rather than
        // trusting the cache.
        if (status === 'SUBSCRIBED') load();
      });

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const add = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const { data, error: insertError } = await supabase
      .from('tasks')
      .insert({ text: trimmed })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }
    // Do not wait for the realtime echo — it may be several hundred
    // milliseconds behind, and `applyChange` deduplicates when it lands.
    setTasks((prev) =>
      prev.some((task) => task.id === data.id)
        ? prev
        : [data, ...prev].sort(byNewest)
    );
  }, []);

  const toggle = useCallback(async (task: Task) => {
    const next = !task.is_complete;
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, is_complete: next } : t))
    );

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ is_complete: next })
      .eq('id', task.id);

    if (updateError) {
      setError(updateError.message);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  }, []);

  const remove = useCallback(async (task: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));

    const { error: deleteError } = await supabase
      .from('tasks')
      .delete()
      .eq('id', task.id);

    if (deleteError) {
      setError(deleteError.message);
      setTasks((prev) => [task, ...prev].sort(byNewest));
    }
  }, []);

  return { tasks, loading, error, connected, add, toggle, remove };
}
