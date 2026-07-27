/**
 * Node-only accessors for generated payloads.
 *
 * Kept out of `index.ts` so that importing registry metadata from a client
 * component never drags ~2 MB of inlined component source into the bundle.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { registryPayloadSchema, type RegistryPayload } from './schema.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the generated payload directory (for copying into a public dir). */
export const PAYLOAD_DIR = path.join(ROOT, 'generated', 'r');

/** Reads and validates one payload. Returns `null` if the entry does not exist. */
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

/** Convenience for docs: the source text of an entry's first file. */
export async function getSource(name: string): Promise<string | null> {
  const payload = await getPayload(name);
  return payload?.files[0]?.content ?? null;
}
