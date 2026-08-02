import schema from '@/convex/schema';

// `defineTable`/`defineSchema` are pure, synchronous builder calls — no
// deployment needed to test them. This is the one check that catches a typo
// in a field name before `app/(tabs)/(home)/index.tsx` fails at runtime
// instead of at review time.
describe('convex/schema', () => {
  it('defines a tasks table with the fields the demo screen reads', () => {
    const tasks = schema.tables.tasks.validator.fields;

    expect(tasks.text.kind).toBe('string');
    expect(tasks.isCompleted.kind).toBe('boolean');
  });
});
