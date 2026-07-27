import type { ComponentRegistry, Registry } from './schema.js';

export function getComponent(
  registry: Registry,
  name: string
): ComponentRegistry | undefined {
  return registry[name];
}

export function listComponents(registry: Registry): ComponentRegistry[] {
  return Object.values(registry)
    .filter((comp) => comp.type === 'registry:ui')
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function searchComponents(
  registry: Registry,
  query: string
): ComponentRegistry[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(registry)
    .filter(
      (comp) =>
        comp.type === 'registry:ui' &&
        (comp.name.toLowerCase().includes(lowerQuery) ||
          comp.description.toLowerCase().includes(lowerQuery) ||
          comp.category?.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => {
      const aExact = a.name.toLowerCase() === lowerQuery;
      const bExact = b.name.toLowerCase() === lowerQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aNameMatch = a.name.toLowerCase().includes(lowerQuery);
      const bNameMatch = b.name.toLowerCase().includes(lowerQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      return a.name.localeCompare(b.name);
    });
}

/**
 * Depth-first walk of `registryDependencies`, dependencies before dependents.
 * Cycle-safe via the `visited` set — but note the build script rejects cycles
 * outright, so a cycle reaching here is a bug, not a supported input.
 */
export function resolveAllDependencies(
  registry: Registry,
  name: string
): string[] {
  const visited = new Set<string>();
  const resolved: string[] = [];

  function resolve(componentName: string) {
    if (visited.has(componentName)) return;
    visited.add(componentName);

    const component = registry[componentName];
    if (!component) return;

    for (const dep of component.registryDependencies ?? []) {
      resolve(dep);
    }

    resolved.push(componentName);
  }

  resolve(name);
  return resolved;
}

export function getComponentInfo(registry: Registry, name: string) {
  const component = registry[name];
  if (!component) {
    return {
      component: undefined,
      dependencies: [] as string[],
      allDependencies: [] as string[],
      packageDependencies: [] as string[],
    };
  }

  return {
    component,
    dependencies: component.registryDependencies ?? [],
    allDependencies: resolveAllDependencies(registry, name),
    packageDependencies: component.dependencies ?? [],
  };
}

/**
 * Detects a cycle in the `registryDependencies` graph.
 * Returns the offending path (e.g. `a -> b -> a`) or `null`.
 */
export function findDependencyCycle(registry: Registry): string[] | null {
  const WHITE = 0,
    GREY = 1,
    BLACK = 2;
  const state = new Map<string, number>();
  const stack: string[] = [];

  function visit(name: string): string[] | null {
    const s = state.get(name) ?? WHITE;
    if (s === BLACK) return null;
    if (s === GREY) return [...stack.slice(stack.indexOf(name)), name];

    state.set(name, GREY);
    stack.push(name);
    for (const dep of registry[name]?.registryDependencies ?? []) {
      if (!registry[dep]) continue;
      const cycle = visit(dep);
      if (cycle) return cycle;
    }
    stack.pop();
    state.set(name, BLACK);
    return null;
  }

  for (const name of Object.keys(registry)) {
    const cycle = visit(name);
    if (cycle) return cycle;
  }
  return null;
}
