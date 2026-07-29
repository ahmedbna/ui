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

/**
 * Documentation metadata: the API reference, as data.
 *
 * These fields used to exist only as hand-written Markdown inside MDX pages, so
 * a component's props were prose — unvalidated, unqueryable, and invisible to
 * anything that did not render React. Modelling them lets one definition feed
 * the rendered table, the `.md` build and the JSON an agent fetches, so the
 * three can no longer disagree.
 *
 * Deliberately narrow. Only what is genuinely structured lives here: the API
 * reference tables, the enumerated unions, the usage snippet, the accessibility
 * checklist. The other eighty-odd prose sections across the docs — Animations,
 * Performance, Platform Behavior, Troubleshooting — stay in MDX, where their
 * paragraphs and sub-headings survive intact and still reach a model through
 * the Markdown build.
 *
 * Additive and entirely optional: `REGISTRY_SCHEMA_VERSION` does not move, and
 * a CLI that has never heard of `meta` keeps working.
 */
export const propSchema = z.object({
  name: z.string().min(1),
  /**
   * The bare type, e.g. `ViewStyle | ViewStyle[]`, rendered in a code span.
   *
   * A handful of entries annotate the type with prose — "`SwitchProps` (from
   * React Native)". Those keep their backticks and are rendered as inline
   * Markdown instead, so the distinction survives a round trip.
   */
  type: z.string().min(1),
  /**
   * As authored: `` `false` `` keeps its code span, "theme color" stays prose.
   * Renderers emit it verbatim rather than deciding how to format it.
   */
  default: z.string().optional(),
  required: z.boolean().optional(),
  /** May contain inline Markdown; several descriptions carry code spans. */
  description: z.string(),
});

/** One `### TypeName` block of the API reference. */
export const typeDocSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  props: z.array(propSchema),
});

/** One member of an enumerated union, e.g. `'destructive'`. */
export const variantSchema = z.object({
  value: z.string().min(1),
  description: z.string().optional(),
});

/**
 * A `### ButtonVariant` block: an enumerated union rather than a prop table.
 *
 * Named after the *type* — which is what the docs head these sections with —
 * rather than the prop that takes it, since a union is often accepted by more
 * than one prop and guessing the owner would be wrong as often as right.
 */
export const variantGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  values: z.array(variantSchema),
});

export const componentMetaSchema = z.object({
  /** Must name an entry in the registry. */
  name: z.string().min(1),
  /** One entry per `### TypeName` block of the API reference. */
  types: z.array(typeDocSchema).optional(),
  variants: z.array(variantGroupSchema).optional(),
  usage: z
    .object({
      import: z.string(),
      snippet: z.string(),
    })
    .optional(),
  accessibility: z
    .object({
      summary: z.string().optional(),
      items: z.array(z.string()),
    })
    .optional(),
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
  /** Merged in from `meta/` at build time; not authored on the definition. */
  meta: componentMetaSchema.optional(),
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
  meta: componentMetaSchema.optional(),
});

/** What `GET /r/index.json` returns: metadata only, no source. */
export const registryIndexSchema = z.object({
  $schemaVersion: z.literal(REGISTRY_SCHEMA_VERSION),
  generatedAt: z.string(),
  items: z.array(componentRegistrySchema),
});

export type RegistryItemType = z.infer<typeof registryTypeSchema>;
export type ComponentFile = z.infer<typeof componentFileSchema>;
export type PropDoc = z.infer<typeof propSchema>;
export type TypeDoc = z.infer<typeof typeDocSchema>;
export type VariantDoc = z.infer<typeof variantSchema>;
export type VariantGroup = z.infer<typeof variantGroupSchema>;
export type ComponentMeta = z.infer<typeof componentMetaSchema>;
export type ComponentRegistry = z.infer<typeof componentRegistrySchema>;
export type ResolvedFile = z.infer<typeof resolvedFileSchema>;
export type RegistryPayload = z.infer<typeof registryPayloadSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type Registry = Record<string, ComponentRegistry>;
