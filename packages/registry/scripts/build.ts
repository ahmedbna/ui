/**
 * Registry generator.
 *
 * Replaces the two hand-maintained index files the old three-repo layout
 * required (`cli/src/registry/index.ts` and `docs/templates/__index__.tsx`):
 * definitions are discovered by globbing, so adding a component means adding
 * one file, not editing three.
 *
 * Emits, into `generated/`:
 *   registry.json  — metadata for every entry (no source text)
 *   r/index.json   — same, as served at /r/index.json
 *   r/<name>.json  — one payload per entry, source inlined, transitive deps
 *                    flattened so `bna-ui add <name>` is a single round-trip
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findDependencyCycle } from '../resolve.js';
import {
  componentMetaSchema,
  componentRegistrySchema,
  REGISTRY_SCHEMA_VERSION,
  type ComponentMeta,
  type ComponentRegistry,
  type Registry,
  type ResolvedFile,
} from '../schema.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFINITIONS = path.join(ROOT, 'definitions');
const META = path.join(ROOT, 'meta');
const GENERATED = path.join(ROOT, 'generated');

/** Entry types that are user-facing and therefore expected to be documented. */
const DOCUMENTED_TYPES = new Set([
  'registry:ui',
  'registry:hook',
  'registry:theme',
]);

/** Where the published registry lives; overridable for a staging deploy. */
const SITE_URL = (
  process.env.BNA_UI_SITE_URL ?? 'https://ui.ahmedbna.com'
).replace(/\/+$/, '');

/**
 * The Expo SDK the shipped source is typechecked against, read from this
 * package rather than restated — a claim about compatibility that drifts is
 * worse than none.
 */
const EXPO_VERSION = JSON.parse(
  await fs.readFile(path.join(ROOT, 'package.json'), 'utf8')
).devDependencies?.expo;

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

async function walk(dir: string, filter: (f: string) => boolean) {
  const out: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, filter)));
    else if (filter(full)) out.push(full);
  }
  return out.sort();
}

/**
 * Normalises the `@/…` aliases in component source to the shape a consumer
 * project expects. Ported from the old `docs/lib/registry.ts` so that the docs
 * site and the CLI now share one implementation instead of two.
 */
export function fixImport(content: string): string {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g;
  return content.replace(
    regex,
    (match, _p, type: string, component: string) => {
      if (type.endsWith('components')) return `@/components/${component}`;
      if (type.endsWith('ui')) return `@/components/ui/${component}`;
      if (type.endsWith('hooks')) return `@/hooks/${component}`;
      if (type.endsWith('lib')) return `@/lib/${component}`;
      return match;
    }
  );
}

/** Registry consumers import named exports; demos must not use `export default`. */
function toNamedExport(content: string, type: string): string {
  if (type === 'registry:page') return content;
  return content.replaceAll('export default', 'export');
}

async function loadDefinitions(): Promise<Registry> {
  const files = await walk(DEFINITIONS, (f) => f.endsWith('.ts'));
  const registry: Registry = {};
  const origin = new Map<string, string>();

  for (const file of files) {
    const mod = await import(pathToFileURL(file).href);
    const rel = path.relative(ROOT, file);

    for (const [exportName, value] of Object.entries(mod)) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
      if (!exportName.endsWith('Registry')) continue;

      for (const [key, entry] of Object.entries(value as Registry)) {
        if (key in registry) {
          fail(
            `duplicate registry key "${key}" — defined in both ${origin.get(key)} and ${rel}`
          );
          continue;
        }
        origin.set(key, rel);
        registry[key] = entry as ComponentRegistry;
      }
    }
  }

  if (Object.keys(registry).length === 0) {
    fail(`no definitions found under ${path.relative(ROOT, DEFINITIONS)}`);
  }
  return registry;
}

/**
 * Loads `meta/` — the API reference as data.
 *
 * Same discovery convention as `loadDefinitions`: walk the directory, import
 * every file, keep the named exports ending in `Meta`, each one a single
 * `ComponentMeta` naming the entry it documents. Kept separate from
 * `definitions/` so the two concerns stay legible — a definition says what to
 * install, a meta says what it does.
 */
async function loadMeta(): Promise<Map<string, ComponentMeta>> {
  const metas = new Map<string, ComponentMeta>();

  let files: string[];
  try {
    files = await walk(META, (f) => f.endsWith('.ts'));
  } catch {
    // No `meta/` yet — every entry simply has no documentation metadata.
    return metas;
  }

  const origin = new Map<string, string>();

  for (const file of files) {
    const mod = await import(pathToFileURL(file).href);
    const rel = path.relative(ROOT, file);

    for (const [exportName, value] of Object.entries(mod)) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
      if (!exportName.endsWith('Meta')) continue;

      const meta = value as ComponentMeta;
      if (typeof meta.name !== 'string') {
        fail(`${rel}: export \`${exportName}\` has no \`name\``);
        continue;
      }
      if (metas.has(meta.name)) {
        fail(
          `duplicate meta for "${meta.name}" — also in ${origin.get(meta.name)}`
        );
        continue;
      }
      origin.set(meta.name, rel);
      metas.set(meta.name, meta);
    }
  }

  return metas;
}

/** Validates every meta and merges it onto its registry entry. */
function attachMeta(registry: Registry, metas: Map<string, ComponentMeta>) {
  for (const [name, meta] of metas) {
    const parsed = componentMetaSchema.safeParse(meta);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(`meta "${name}": ${issue.path.join('.')} — ${issue.message}`);
      }
      continue;
    }

    const entry = registry[name];
    if (!entry) {
      fail(`meta "${name}": no registry entry with that name`);
      continue;
    }

    entry.meta = parsed.data;
  }

  // A user-facing entry with no meta has no API reference anywhere — not on its
  // page, not in its `.md`, not in the JSON an agent reads.
  const undocumented = Object.values(registry)
    .filter((entry) => DOCUMENTED_TYPES.has(entry.type) && !entry.meta)
    .map((entry) => entry.name);

  if (undocumented.length) {
    console.warn(
      `⚠ ${undocumented.length} documented-type entries have no meta/: ` +
        `${undocumented.slice(0, 6).join(', ')}` +
        (undocumented.length > 6 ? `, +${undocumented.length - 6} more` : '')
    );
  }
}

async function validate(registry: Registry) {
  for (const [key, entry] of Object.entries(registry)) {
    const parsed = componentRegistrySchema.safeParse(entry);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(`"${key}": ${issue.path.join('.')} — ${issue.message}`);
      }
      continue;
    }
    if (entry.name !== key) {
      fail(`"${key}": \`name\` is "${entry.name}" but the key is "${key}"`);
    }
    for (const dep of entry.registryDependencies ?? []) {
      if (!registry[dep]) {
        fail(
          `"${key}": registryDependencies references unknown entry "${dep}"`
        );
      }
    }
    // `hooks` and `theme` name registry entries too — they are just declared in
    // separate fields. Validate them the same way so a typo can't slip through.
    for (const hook of entry.hooks ?? []) {
      if (!registry[hook]) {
        fail(`"${key}": hooks references unknown entry "${hook}"`);
      }
    }
    for (const theme of entry.theme ?? []) {
      if (!registry[theme]) {
        fail(`"${key}": theme references unknown entry "${theme}"`);
      }
    }
    for (const file of entry.files) {
      try {
        await fs.access(path.join(ROOT, file.path));
      } catch {
        fail(`"${key}": file not found on disk — ${file.path}`);
      }
    }
  }

  const cycle = findDependencyCycle(registry);
  if (cycle) fail(`dependency cycle: ${cycle.join(' -> ')}`);
}

/**
 * The full set of entries a consumer needs for `name`: its registryDependencies
 * closure, plus the hook and theme entries those declare. Hooks and theme live
 * in their own fields rather than in registryDependencies, but the consumer
 * needs their files just the same — folding them in here is what lets
 * `bna-ui add <name>` be a single request.
 */
function expandClosure(registry: Registry, name: string): string[] {
  const out: string[] = [];
  const visiting = new Set<string>();
  const done = new Set<string>();

  // Depth-first over the union of registryDependencies, hooks and theme, so a
  // hook that itself pulls a hook and a theme file (useColor -> useColorScheme,
  // colors) is fully expanded. Expanding only one level shipped payloads whose
  // files imported things the payload did not contain.
  const visit = (n: string) => {
    if (done.has(n) || visiting.has(n) || !registry[n]) return;
    visiting.add(n);

    const entry = registry[n];
    for (const dep of entry.hooks ?? []) visit(dep);
    for (const dep of entry.theme ?? []) visit(dep);
    for (const dep of entry.registryDependencies ?? []) visit(dep);

    visiting.delete(n);
    done.add(n);
    out.push(n);
  };

  visit(name);
  return out;
}

/**
 * Everything an agent needs about one component, in a single request.
 *
 * `/r/<name>.json` exists to be written to disk by the CLI — it is the flattened
 * file closure and nothing else. An agent asking "what does this component do,
 * what props does it take, how do I use it" would have to fetch that, guess the
 * documentation URL, scrape the HTML, and infer the rest. This answers all of it
 * at `/r/ai/<name>.json`: prose, props, usage, install command, the entry's own
 * source, and every example that composes it.
 *
 * Only for entries a human would install. The 394 demos are reachable as the
 * `examples` of the component they belong to, and would otherwise triple the
 * size of the endpoint for no gain.
 */
async function buildAiBundle(
  registry: Registry,
  key: string,
  payload: {
    dependencies: string[];
    registryDependencies: string[];
  }
): Promise<Record<string, unknown>> {
  const entry = registry[key];
  const docUrl = docPathFor(entry);

  // Ownership comes from the demo's directory, not from its dependency list:
  // `registryDependencies` says a demo *uses* Button, which is true of eighty-
  // odd demos across the library, whereas `src/demo/button/` says it *is* a
  // Button example. Charts nest one level deeper.
  const examples = Object.values(registry).filter(
    (candidate) =>
      candidate.type === 'registry:example' && demoOwner(candidate) === key
  );

  return {
    $schemaVersion: REGISTRY_SCHEMA_VERSION,
    name: entry.name,
    type: entry.type,
    description: entry.description,
    ...(docUrl
      ? { docs: `${SITE_URL}${docUrl}`, markdown: `${SITE_URL}${docUrl}.md` }
      : {}),
    registry: `${SITE_URL}/r/${key}.json`,
    install: {
      cli: `npx bna-ui add ${key}`,
      npm: payload.dependencies,
    },
    // Library-level facts only. Per-component platform support is not recorded
    // anywhere today, and asserting it here would be a guess.
    framework: {
      runtime: 'react-native',
      framework: 'expo',
      expo: EXPO_VERSION,
      note:
        'Not a web library. Components render through react-native — no DOM, ' +
        'no Tailwind, no Radix. Style with StyleSheet objects and the style ' +
        'prop. Source is copied into the project and imported through ' +
        '@/components/ui/*, @/components/charts/*, @/hooks/* and @/theme/*.',
    },
    dependencies: payload.dependencies,
    registryDependencies: payload.registryDependencies,
    ...(entry.meta ? { meta: entry.meta } : {}),
    files: await readFiles(registry, [key]),
    examples: await Promise.all(
      examples.map(async (example) => ({
        name: example.name,
        description: example.description,
        files: await readFiles(registry, [example.name]),
      }))
    ),
  };
}

/**
 * The component a demo illustrates, from its directory.
 *
 *   src/demo/button/button-variants.tsx        -> button
 *   src/demo/charts/area-chart/area-chart-demo -> area-chart
 */
function demoOwner(entry: ComponentRegistry): string | undefined {
  const parts = (entry.files[0]?.path ?? '').split('/');
  const i = parts.indexOf('demo');
  if (i === -1) return undefined;
  const rest = parts.slice(i + 1, -1);
  return rest[0] === 'charts' ? rest[1] : rest[0];
}

/**
 * The documentation path for an entry, derived from where its file lands in a
 * consumer project — the only field that says which docs section it belongs to.
 */
function docPathFor(entry: ComponentRegistry): string | undefined {
  const target = entry.files[0]?.target ?? '';
  if (target.startsWith('components/charts/'))
    return `/docs/charts/${entry.name}`;
  if (target.startsWith('components/ui/'))
    return `/docs/components/${entry.name}`;
  if (target.startsWith('hooks/')) return `/docs/hooks/${entry.name}`;
  if (target.startsWith('theme/')) return `/docs/theme/${entry.name}`;
  return undefined;
}

async function readFiles(
  registry: Registry,
  names: string[]
): Promise<ResolvedFile[]> {
  const seen = new Set<string>();
  const out: ResolvedFile[] = [];

  for (const name of names) {
    for (const file of registry[name]?.files ?? []) {
      if (seen.has(file.target)) continue;
      seen.add(file.target);
      const raw = await fs.readFile(path.join(ROOT, file.path), 'utf8');
      out.push({
        ...file,
        content: toNamedExport(fixImport(raw), file.type),
      });
    }
  }
  return out;
}

async function main() {
  const registry = await loadDefinitions();
  attachMeta(registry, await loadMeta());
  await validate(registry);

  if (errors.length) {
    console.error(`\n✖ registry validation failed (${errors.length}):\n`);
    for (const e of errors) console.error(`  • ${e}`);
    console.error('');
    process.exit(1);
  }

  await fs.rm(GENERATED, { recursive: true, force: true });
  await fs.mkdir(path.join(GENERATED, 'r'), { recursive: true });

  const keys = Object.keys(registry).sort();
  const sorted: Registry = Object.fromEntries(
    keys.map((k) => [k, registry[k]])
  );

  // Metadata index — no source text.
  const index = {
    $schemaVersion: REGISTRY_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    items: keys.map((k) => sorted[k]),
  };
  const indexJson = JSON.stringify(index, null, 2);
  await fs.writeFile(path.join(GENERATED, 'registry.json'), indexJson);
  await fs.writeFile(path.join(GENERATED, 'r', 'index.json'), indexJson);

  // Emitted as a module rather than consumed as a JSON import: JSON modules
  // still need import attributes in Node ESM and are handled inconsistently
  // across bundlers, whereas a plain .ts module works everywhere.
  await fs.writeFile(
    path.join(GENERATED, 'registry.ts'),
    [
      '// GENERATED by scripts/build.ts — do not edit.',
      "import type { ComponentRegistry } from '../schema.js';",
      '',
      `export const generatedAt = ${JSON.stringify(index.generatedAt)};`,
      '',
      `export const items: ComponentRegistry[] = ${JSON.stringify(index.items, null, 2)};`,
      '',
    ].join('\n')
  );

  // One payload per entry, transitive closure flattened.
  await fs.mkdir(path.join(GENERATED, 'r', 'ai'), { recursive: true });
  let bytes = 0;
  const aiIndex: Array<Record<string, unknown>> = [];

  for (const key of keys) {
    const entry = sorted[key];
    const chain = expandClosure(sorted, key);
    const payload = {
      $schemaVersion: REGISTRY_SCHEMA_VERSION,
      name: entry.name,
      type: entry.type,
      description: entry.description,
      dependencies: [
        ...new Set(chain.flatMap((n) => sorted[n]?.dependencies ?? [])),
      ].sort(),
      registryDependencies: chain.filter((n) => n !== key),
      files: await readFiles(sorted, chain),
      ...(entry.meta ? { meta: entry.meta } : {}),
    };
    const json = JSON.stringify(payload);
    bytes += json.length;
    await fs.writeFile(path.join(GENERATED, 'r', `${key}.json`), json);

    if (!DOCUMENTED_TYPES.has(entry.type)) continue;

    const bundle = await buildAiBundle(sorted, key, payload);
    await fs.writeFile(
      path.join(GENERATED, 'r', 'ai', `${key}.json`),
      JSON.stringify(bundle)
    );
    aiIndex.push({
      name: entry.name,
      type: entry.type,
      description: entry.description,
      docs: bundle.docs,
      markdown: bundle.markdown,
      url: `${SITE_URL}/r/ai/${key}.json`,
      install: `npx bna-ui add ${key}`,
    });
  }

  await fs.writeFile(
    path.join(GENERATED, 'r', 'ai', 'index.json'),
    JSON.stringify(
      {
        $schemaVersion: REGISTRY_SCHEMA_VERSION,
        generatedAt: index.generatedAt,
        description:
          'BNA UI — React Native / Expo components. Each item links to a bundle ' +
          'carrying that component’s description, props, usage, dependencies, ' +
          'source and examples.',
        items: aiIndex,
      },
      null,
      2
    )
  );

  const hash = createHash('sha256')
    .update(indexJson)
    .digest('hex')
    .slice(0, 12);
  console.log(
    `✔ registry: ${keys.length} entries → generated/r/  ` +
      `(${(bytes / 1024 / 1024).toFixed(2)} MB, index ${hash})`
  );
  console.log(`✔ ai bundles: ${aiIndex.length} → generated/r/ai/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
