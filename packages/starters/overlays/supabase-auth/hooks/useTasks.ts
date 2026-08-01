import { useCallback, useEffect, useState } from 'react';
import { applyChange, byNewest } from '@/lib/realtime';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';
import type { Task } from '@/lib/database.types';

/**
 * The signed-in user's tasks, kept live.
 *
 * The `.eq('user_id', …)` below is convenience, not security — the RLS policies
 * in 0002_tasks.sql already make it impossible to read anyone else's rows, and
 * realtime honours those same policies, so this subscription only ever
 * delivers changes to rows this user owns.
 */
export function useTasks() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // No user means this hook is mounted outside the route guards, which does
    // not happen — and resetting state synchronously inside an effect triggers
    // a cascading render. `tasks` starts empty and `loading` starts true, which
    // is the correct state for that case anyway.
    if (!userId) return;

    let active = true;

    const load = async () => {
      const { data, error: selectError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!active) return;

      if (selectError) setError(selectError.message);
      else setTasks(data ?? []);
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel(`tasks:${userId}`)
      .on<Task>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${userId}`,
        },
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
  }, [userId]);

  const add = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !userId) return;

      const { data, error: insertError } = await supabase
        .from('tasks')
        // user_id is set here and verified by the policy's `with check`, so a
        // client that lies about it is rejected rather than trusted.
        .insert({ text: trimmed, user_id: userId })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setTasks((prev) =>
        prev.some((task) => task.id === data.id)
          ? prev
          : [data, ...prev].sort(byNewest)
      );
    },
    [userId]
  );

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
