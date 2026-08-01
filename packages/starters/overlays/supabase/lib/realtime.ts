import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import type { Task } from '@/lib/database.types';

const byNewest = (a: Task, b: Task) => b.created_at.localeCompare(a.created_at);

/**
 * Folds one `postgres_changes` event into a local list.
 *
 * INSERT is deduplicated by id because a mutation this device made has already
 * been applied optimistically — realtime echoes every write back, including
 * your own.
 *
 * Kept in its own module, separate from the client: it is a pure function, so
 * it can be unit-tested (see `__tests__/realtime.test.ts`) without importing
 * `lib/supabase.ts`, which needs environment variables and native storage.
 * It is also the part worth copying when you write your own realtime hook.
 */
export function applyChange(
  tasks: Task[],
  payload: RealtimePostgresChangesPayload<Task>
): Task[] {
  switch (payload.eventType) {
    case 'INSERT': {
      const row = payload.new;
      if (tasks.some((task) => task.id === row.id)) return tasks;
      return [row, ...tasks].sort(byNewest);
    }
    case 'UPDATE': {
      const row = payload.new;
      return tasks.map((task) => (task.id === row.id ? row : task));
    }
    case 'DELETE': {
      // DELETE only carries the primary key, and only because 0001_tasks.sql
      // sets `replica identity full`.
      const { id } = payload.old as Partial<Task>;
      return tasks.filter((task) => task.id !== id);
    }
    default:
      return tasks;
  }
}

export { byNewest };
