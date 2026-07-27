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
import {
  componentRegistrySchema,
  REGISTRY_SCHEMA_VERSION,
  type ComponentRegistry,
  type Registry,
  type ResolvedFile,
} from '../schema.js';
import { findDependencyCycle, resolveAllDependencies } from '../resolve.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFINITIONS = path.join(ROOT, 'definitions');
const GENERATED = path.join(ROOT, 'generated');

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
  return content.replace(regex, (match, _p, type: string, component: string) => {
    if (type.endsWith('components')) return `@/components/${component}`;
    if (type.endsWith('ui')) return `@/components/ui/${component}`;
    if (type.endsWith('hooks')) return `@/hooks/${component}`;
    if (type.endsWith('lib')) return `@/lib/${component}`;
    return match;
  });
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
        fail(`"${key}": registryDependencies references unknown entry "${dep}"`);
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
  const seen = new Set<string>();

  const push = (n: string) => {
    if (seen.has(n) || !registry[n]) return;
    seen.add(n);
    out.push(n);
  };

  for (const dep of resolveAllDependencies(registry, name)) {
    // Hooks and theme first: a component's source imports them.
    for (const hook of registry[dep]?.hooks ?? []) push(hook);
    for (const theme of registry[dep]?.theme ?? []) push(theme);
    push(dep);
  }

  return out;
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
  const sorted: Registry = Object.fromEntries(keys.map((k) => [k, registry[k]]));

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
  let bytes = 0;
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
    };
    const json = JSON.stringify(payload);
    bytes += json.length;
    await fs.writeFile(path.join(GENERATED, 'r', `${key}.json`), json);
  }

  const hash = createHash('sha256').update(indexJson).digest('hex').slice(0, 12);
  console.log(
    `✔ registry: ${keys.length} entries → generated/r/  ` +
      `(${(bytes / 1024 / 1024).toFixed(2)} MB, index ${hash})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
