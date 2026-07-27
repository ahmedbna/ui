// src/utils/registry-client.ts
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { logger } from './logger.js';

/**
 * Payload format version this CLI understands. The registry stamps every
 * response with its own version; a mismatch means the user's CLI predates a
 * breaking change and should be upgraded rather than fed data it will
 * misinterpret. Needed because the CLI and the registry now ship independently.
 */
export const SUPPORTED_SCHEMA_VERSION = 1;

const DEFAULT_REGISTRY_URL = 'https://ui.ahmedbna.com/r';

export interface RegistryFile {
  type: string;
  path: string;
  target: string;
  content: string;
}

export interface RegistryPayload {
  $schemaVersion: number;
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface RegistryIndexItem {
  name: string;
  description: string;
  type: string;
  category?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { type: string; path: string; target: string }[];
}

export interface RegistryIndex {
  $schemaVersion: number;
  generatedAt: string;
  items: RegistryIndexItem[];
}

/**
 * Resolution order: explicit `--registry` flag, then `BNA_UI_REGISTRY`, then
 * the public registry. The flag exists so an unreleased component can be tested
 * against a local docs server (`--registry http://localhost:3000/r`).
 */
export function resolveRegistryUrl(override?: string): string {
  const url = override || process.env.BNA_UI_REGISTRY || DEFAULT_REGISTRY_URL;
  return url.replace(/\/+$/, '');
}

function cacheDir(registryUrl: string): string {
  // Namespace by registry host so a local dev registry never poisons the cache
  // of the public one.
  const key = Buffer.from(registryUrl)
    .toString('base64url')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 32);
  return path.join(os.homedir(), '.cache', 'bna-ui', key);
}

interface CacheEntry<T> {
  etag?: string;
  data: T;
}

async function readCache<T>(file: string): Promise<CacheEntry<T> | null> {
  try {
    return (await fs.readJson(file)) as CacheEntry<T>;
  } catch {
    return null;
  }
}

async function writeCache<T>(file: string, entry: CacheEntry<T>) {
  try {
    await fs.ensureDir(path.dirname(file));
    await fs.writeJson(file, entry);
  } catch {
    // A read-only or full home directory must not break `add`.
  }
}

function assertSchemaVersion(payload: { $schemaVersion?: number }, what: string) {
  const version = payload.$schemaVersion;
  if (version === undefined) {
    throw new Error(
      `The registry returned ${what} without a schema version. ` +
        `It may be an old or misconfigured registry.`
    );
  }
  if (version > SUPPORTED_SCHEMA_VERSION) {
    throw new Error(
      `This registry speaks schema v${version}, but your CLI only understands ` +
        `v${SUPPORTED_SCHEMA_VERSION}.\n` +
        `  Upgrade with: npm install -g bna-ui@latest`
    );
  }
}

async function fetchJson<T extends { $schemaVersion?: number }>(
  url: string,
  cacheFile: string,
  what: string
): Promise<T> {
  const cached = await readCache<T>(cacheFile);

  let response: Response;
  try {
    response = await fetch(url, {
      headers: cached?.etag ? { 'If-None-Match': cached.etag } : {},
    });
  } catch (error) {
    // Offline: a warm cache is far better than failing outright.
    if (cached) {
      logger.warn(`Could not reach the registry — using cached ${what}.`);
      return cached.data;
    }
    throw new Error(
      `Could not reach the registry at ${url}\n` +
        `  ${error instanceof Error ? error.message : String(error)}\n` +
        `  Check your connection, or pass --registry <url>.`
    );
  }

  if (response.status === 304 && cached) {
    return cached.data;
  }

  if (response.status === 404) {
    throw new Error(`NOT_FOUND:${what}`);
  }

  if (!response.ok) {
    if (cached) {
      logger.warn(
        `Registry returned ${response.status} — using cached ${what}.`
      );
      return cached.data;
    }
    throw new Error(
      `Registry returned ${response.status} ${response.statusText} for ${url}`
    );
  }

  const data = (await response.json()) as T;
  assertSchemaVersion(data, what);

  await writeCache(cacheFile, {
    etag: response.headers.get('etag') ?? undefined,
    data,
  });

  return data;
}

/** The searchable index: every entry's metadata, no source text. */
export async function fetchRegistryIndex(
  registryUrl: string
): Promise<RegistryIndex> {
  return fetchJson<RegistryIndex>(
    `${registryUrl}/index.json`,
    path.join(cacheDir(registryUrl), 'index.json'),
    'the registry index'
  );
}

/**
 * One entry with its full transitive closure already flattened by the registry
 * build, so adding a component is a single request regardless of depth.
 */
export async function fetchRegistryItem(
  registryUrl: string,
  name: string
): Promise<RegistryPayload | null> {
  try {
    return await fetchJson<RegistryPayload>(
      `${registryUrl}/${encodeURIComponent(name)}.json`,
      path.join(cacheDir(registryUrl), `${name}.json`),
      `component "${name}"`
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('NOT_FOUND:')) {
      return null;
    }
    throw error;
  }
}

export async function clearRegistryCache(registryUrl: string): Promise<void> {
  await fs.remove(cacheDir(registryUrl));
}
