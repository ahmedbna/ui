// src/utils/registry-client.ts
import os from 'os';
import path from 'path';
import { CliError, RegistryNotFoundError } from './errors.js';
import { readJson, remove, writeJson } from './filesystem.js';
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
    return await readJson<CacheEntry<T>>(file);
  } catch {
    return null;
  }
}

async function writeCache<T>(file: string, entry: CacheEntry<T>) {
  try {
    await writeJson(file, entry);
  } catch {
    // A read-only or full home directory must not break `add`.
  }
}

function assertSchemaVersion(
  payload: { $schemaVersion?: number },
  what: string
) {
  const version = payload.$schemaVersion;
  if (version === undefined) {
    throw new CliError(
      `The registry returned ${what} without a schema version.`,
      { hint: 'It may be an old or misconfigured registry.' }
    );
  }
  if (version > SUPPORTED_SCHEMA_VERSION) {
    throw new CliError(
      `This registry speaks schema v${version}, but your CLI only understands v${SUPPORTED_SCHEMA_VERSION}.`,
      { hint: 'Upgrade with: npm install -g bna-ui@latest' }
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
    throw new CliError(`Could not reach the registry at ${url}`, {
      hint: 'Check your connection, or pass --registry <url>.',
      cause: error,
    });
  }

  if (response.status === 304 && cached) {
    return cached.data;
  }

  if (response.status === 404) {
    throw new RegistryNotFoundError(what);
  }

  if (!response.ok) {
    if (cached) {
      logger.warn(
        `Registry returned ${response.status} — using cached ${what}.`
      );
      return cached.data;
    }
    throw new CliError(
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
    if (error instanceof RegistryNotFoundError) return null;
    throw error;
  }
}

/**
 * Everything about one component, for an agent rather than for `add`.
 *
 * Same fetch path, cache and schema gate as the install payload — this is a
 * different view of the same registry, not a second client.
 */
export async function fetchAiBundle(
  registryUrl: string,
  name: string
): Promise<AiBundle | null> {
  try {
    return await fetchJson<AiBundle>(
      `${registryUrl}/ai/${encodeURIComponent(name)}.json`,
      path.join(cacheDir(registryUrl), 'ai', `${name}.json`),
      `component "${name}"`
    );
  } catch (error) {
    if (error instanceof RegistryNotFoundError) return null;
    throw error;
  }
}

export interface AiBundle {
  $schemaVersion: number;
  name: string;
  type: string;
  description: string;
  docs?: string;
  markdown?: string;
  registry: string;
  install: { cli: string; npm: string[] };
  framework: Record<string, unknown>;
  dependencies: string[];
  registryDependencies: string[];
  meta?: Record<string, unknown>;
  files: RegistryFile[];
  examples: Array<{
    name: string;
    description: string;
    files: RegistryFile[];
  }>;
}

export async function clearRegistryCache(registryUrl: string): Promise<void> {
  await remove(cacheDir(registryUrl));
}
