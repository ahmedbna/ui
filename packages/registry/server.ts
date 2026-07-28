/**
 * Node-only accessors for generated payloads.
 *
 * Kept out of `index.ts` so that importing registry metadata from a client
 * component never drags ~2 MB of inlined component source into the bundle.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REGISTRY } from './index.js';
import {
  registryPayloadSchema,
  type RegistryPayload,
  type ResolvedFile,
} from './schema.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the generated payload directory (for copying into a public dir). */
export const PAYLOAD_DIR = path.join(ROOT, 'generated', 'r');

/**
 * Reads and validates one payload. Returns `null` if the entry does not exist.
 *
 * `payload.files` is the flattened transitive closure in *dependency order*, not
 * the entry's own files — `files[0]` is the leaf-most dependency and the entry
 * itself comes last. To show or copy the source of `name`, use `getEntryFiles`.
 */
export async function getPayload(
  name: string
): Promise<RegistryPayload | null> {
  // Guard against traversal — `name` reaches here from a URL slug.
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) return null;

  let raw: string;
  try {
    raw = await fs.readFile(path.join(PAYLOAD_DIR, `${name}.json`), 'utf8');
  } catch {
    return null;
  }

  const parsed = registryPayloadSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    console.error(`invalid registry payload "${name}":`, parsed.error.message);
    return null;
  }
  return parsed.data;
}

/**
 * The files an entry itself declares, with their source text — in declaration
 * order, and *without* the dependency closure `getPayload` returns.
 *
 * Every `files[].path` is unique across the registry and an entry's own files
 * are always present in its own payload, so matching on `path` is exact.
 */
export async function getEntryFiles(name: string): Promise<ResolvedFile[]> {
  const declared = REGISTRY[name]?.files;
  if (!declared) return [];

  const payload = await getPayload(name);
  if (!payload) return [];

  const byPath = new Map(payload.files.map((file) => [file.path, file]));
  return declared
    .map((file) => byPath.get(file.path))
    .filter((file): file is ResolvedFile => file !== undefined);
}

/**
 * Convenience for docs: the source text of one of an entry's own files.
 *
 * `target` selects a specific file for the few entries declaring more than one
 * (`useColorScheme` ships a `.ts` and a `.web.ts`); omitted, it's the first.
 */
export async function getSource(
  name: string,
  target?: string
): Promise<string | null> {
  const files = await getEntryFiles(name);
  const file = target ? files.find((f) => f.target === target) : files[0];
  return file?.content ?? null;
}
