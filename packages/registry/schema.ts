import { z } from 'zod';

/**
 * Payload format version. Bumped only on a breaking change to the shape of the
 * JSON the CLI fetches. The CLI refuses a payload whose version it does not
 * understand — necessary now that the CLI and the registry deploy independently.
 */
export const REGISTRY_SCHEMA_VERSION = 1;

export const registryTypeSchema = z.enum([
  'registry:ui',
  'registry:example',
  'registry:hook',
  'registry:theme',
  'registry:lib',
  'registry:component',
  'registry:page',
]);

export const componentFileSchema = z.object({
  type: registryTypeSchema,
  /** Path relative to the registry package root, e.g. `src/components/ui/button.tsx`. */
  path: z.string().min(1),
  /** Destination inside the consumer's project, e.g. `components/ui/button.tsx`. */
  target: z.string().min(1),
});

export const previewSchema = z.object({
  light: z.string(),
  dark: z.string(),
});

export const componentRegistrySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  type: registryTypeSchema,
  category: z.string().optional(),
  /** npm packages the component needs at runtime. */
  dependencies: z.array(z.string()).optional(),
  /** Other registry entries this one composes. */
  registryDependencies: z.array(z.string()).optional(),
  hooks: z.array(z.string()).optional(),
  theme: z.array(z.string()).optional(),
  files: z.array(componentFileSchema).min(1),
  preview: previewSchema.optional(),
});

/** A file as delivered to the CLI: metadata plus the source text itself. */
export const resolvedFileSchema = componentFileSchema.extend({
  content: z.string(),
});

/**
 * What `GET /r/<name>.json` returns. `files` is the *flattened transitive
 * closure* — every file the consumer needs, in dependency order — so `add`
 * is a single round-trip.
 */
export const registryPayloadSchema = z.object({
  $schemaVersion: z.literal(REGISTRY_SCHEMA_VERSION),
  name: z.string(),
  type: registryTypeSchema,
  description: z.string(),
  dependencies: z.array(z.string()),
  registryDependencies: z.array(z.string()),
  files: z.array(resolvedFileSchema),
});

/** What `GET /r/index.json` returns: metadata only, no source. */
export const registryIndexSchema = z.object({
  $schemaVersion: z.literal(REGISTRY_SCHEMA_VERSION),
  generatedAt: z.string(),
  items: z.array(componentRegistrySchema),
});

export type RegistryItemType = z.infer<typeof registryTypeSchema>;
export type ComponentFile = z.infer<typeof componentFileSchema>;
export type ComponentRegistry = z.infer<typeof componentRegistrySchema>;
export type ResolvedFile = z.infer<typeof resolvedFileSchema>;
export type RegistryPayload = z.infer<typeof registryPayloadSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type Registry = Record<string, ComponentRegistry>;
