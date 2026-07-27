/**
 * Public entry for `@bna-ui/registry`.
 *
 * Exposes registry *metadata* and the resolution helpers. Component source text
 * is deliberately not bundled here — it lives in `generated/r/*.json` and is
 * read lazily via `./server` (Node only) so it never reaches a client bundle.
 */
import registryIndex from './generated/registry.json' with { type: 'json' };
import type { ComponentRegistry, Registry } from './schema.js';
import * as resolvers from './resolve.js';

export * from './schema.js';

/** Every registry entry, keyed by name. Generated — do not hand-edit. */
export const REGISTRY: Registry = Object.fromEntries(
  (registryIndex.items as ComponentRegistry[]).map((item) => [item.name, item])
);

export const GENERATED_AT: string = registryIndex.generatedAt;

export const getComponent = (name: string) =>
  resolvers.getComponent(REGISTRY, name);
export const listComponents = () => resolvers.listComponents(REGISTRY);
export const searchComponents = (query: string) =>
  resolvers.searchComponents(REGISTRY, query);
export const resolveAllDependencies = (name: string) =>
  resolvers.resolveAllDependencies(REGISTRY, name);
export const getComponentInfo = (name: string) =>
  resolvers.getComponentInfo(REGISTRY, name);
