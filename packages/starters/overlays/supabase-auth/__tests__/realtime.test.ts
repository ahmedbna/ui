import { applyChange } from '@/lib/realtime';
import type { Task } from '@/lib/database.types';

const task = (over: Partial<Task> = {}): Task => ({
  id: 'a',
  user_id: 'user-1',
  text: 'write a migration',
  is_complete: false,
  created_at: '2026-01-01T00:00:00.000Z',
  ...over,
});

// `postgres_changes` payloads carry more than this, but only these fields reach
// the reducer. Cast at the boundary rather than reconstructing the whole type.
const event = (payload: object) => payload as never;

describe('applyChange', () => {
  it('prepends an inserted row', () => {
    const older = task({ id: 'a', created_at: '2026-01-01T00:00:00.000Z' });
    const newer = task({ id: 'b', created_at: '2026-02-01T00:00:00.000Z' });

    const next = applyChange(
      [older],
      event({ eventType: 'INSERT', new: newer })
    );

    expect(next.map((t) => t.id)).toEqual(['b', 'a']);
  });

  it('ignores an insert it already applied optimistically', () => {
    const existing = task({ id: 'a' });
    const tasks = [existing];

    // Same array back, not a duplicate row: realtime echoes every write,
    // including the one this device just made.
    expect(
      applyChange(tasks, event({ eventType: 'INSERT', new: existing }))
    ).toBe(tasks);
  });

  it('replaces the row an update names', () => {
    const before = task({ id: 'a', is_complete: false });
    const after = task({ id: 'a', is_complete: true });

    const next = applyChange(
      [before, task({ id: 'b' })],
      event({ eventType: 'UPDATE', new: after })
    );

    expect(next[0].is_complete).toBe(true);
    expect(next[1].id).toBe('b');
  });

  it('removes the row a delete names', () => {
    const next = applyChange(
      [task({ id: 'a' }), task({ id: 'b' })],
      event({ eventType: 'DELETE', old: { id: 'a' } })
    );

    expect(next.map((t) => t.id)).toEqual(['b']);
  });

  it('leaves the list alone for an unknown event', () => {
    const tasks = [task({ id: 'a' })];

    expect(applyChange(tasks, event({ eventType: 'SYSTEM' }))).toBe(tasks);
  });
});
