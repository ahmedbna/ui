import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearRegistryCache,
  fetchRegistryItem,
  resolveRegistryUrl,
  SUPPORTED_SCHEMA_VERSION,
} from '../src/utils/registry-client.js';

const TEST_URL = 'http://registry.test/r';

const payload = (over: Record<string, unknown> = {}) => ({
  $schemaVersion: SUPPORTED_SCHEMA_VERSION,
  name: 'button',
  type: 'registry:ui',
  description: 'A button',
  dependencies: ['expo-haptics'],
  registryDependencies: ['text'],
  files: [
    {
      type: 'registry:ui',
      path: 'src/components/ui/button.tsx',
      target: 'components/ui/button.tsx',
      content: 'export const Button = () => null;',
    },
  ],
  ...over,
});

function mockFetch(
  body: unknown,
  init: { status?: number; etag?: string } = {}
) {
  const headers = new Map<string, string>();
  if (init.etag) headers.set('etag', init.etag);
  return vi.fn().mockResolvedValue({
    ok: (init.status ?? 200) < 400,
    status: init.status ?? 200,
    statusText: 'OK',
    headers: { get: (k: string) => headers.get(k.toLowerCase()) ?? null },
    json: async () => body,
  });
}

describe('resolveRegistryUrl', () => {
  const original = process.env.BNA_UI_REGISTRY;
  afterEach(() => {
    if (original === undefined) delete process.env.BNA_UI_REGISTRY;
    else process.env.BNA_UI_REGISTRY = original;
  });

  it('defaults to the public registry', () => {
    delete process.env.BNA_UI_REGISTRY;
    expect(resolveRegistryUrl()).toBe('https://ui.ahmedbna.com/r');
  });

  it('honours BNA_UI_REGISTRY', () => {
    process.env.BNA_UI_REGISTRY = 'http://env.test/r';
    expect(resolveRegistryUrl()).toBe('http://env.test/r');
  });

  it('lets the flag win over the env var', () => {
    process.env.BNA_UI_REGISTRY = 'http://env.test/r';
    expect(resolveRegistryUrl('http://flag.test/r')).toBe('http://flag.test/r');
  });

  it('strips trailing slashes so URL joins stay clean', () => {
    expect(resolveRegistryUrl('http://a.test/r///')).toBe('http://a.test/r');
  });
});

describe('fetchRegistryItem', () => {
  beforeEach(async () => {
    await clearRegistryCache(TEST_URL);
    vi.restoreAllMocks();
  });
  afterEach(async () => {
    await clearRegistryCache(TEST_URL);
  });

  it('returns a valid payload', async () => {
    vi.stubGlobal('fetch', mockFetch(payload()));
    const item = await fetchRegistryItem(TEST_URL, 'button');
    expect(item?.name).toBe('button');
    expect(item?.files[0].target).toBe('components/ui/button.tsx');
  });

  it('returns null for an unknown component rather than throwing', async () => {
    vi.stubGlobal('fetch', mockFetch(null, { status: 404 }));
    expect(await fetchRegistryItem(TEST_URL, 'nope')).toBeNull();
  });

  it('refuses a payload from a newer registry', async () => {
    vi.stubGlobal('fetch', mockFetch(payload({ $schemaVersion: 99 })));
    await expect(fetchRegistryItem(TEST_URL, 'button')).rejects.toThrow(
      /schema v99.*only understands v1/s
    );
  });

  it('refuses a payload with no schema version', async () => {
    const { $schemaVersion: _omitted, ...noVersion } = payload();
    vi.stubGlobal('fetch', mockFetch(noVersion));
    await expect(fetchRegistryItem(TEST_URL, 'button')).rejects.toThrow(
      /without a schema version/
    );
  });

  it('falls back to cache when the network is down', async () => {
    vi.stubGlobal('fetch', mockFetch(payload(), { etag: '"v1"' }));
    await fetchRegistryItem(TEST_URL, 'button');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('getaddrinfo ENOTFOUND'))
    );
    const cached = await fetchRegistryItem(TEST_URL, 'button');
    expect(cached?.name).toBe('button');
  });

  it('errors clearly when offline with a cold cache', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
    await expect(fetchRegistryItem(TEST_URL, 'button')).rejects.toThrow(
      /Could not reach the registry/
    );
  });

  it('sends If-None-Match and accepts a 304', async () => {
    vi.stubGlobal('fetch', mockFetch(payload(), { etag: '"abc"' }));
    await fetchRegistryItem(TEST_URL, 'button');

    const conditional = mockFetch(null, { status: 304 });
    vi.stubGlobal('fetch', conditional);
    const item = await fetchRegistryItem(TEST_URL, 'button');

    expect(item?.name).toBe('button');
    expect(conditional.mock.calls[0][1]).toMatchObject({
      headers: { 'If-None-Match': '"abc"' },
    });
  });

  it('namespaces the cache per registry so a dev registry cannot poison prod', async () => {
    vi.stubGlobal('fetch', mockFetch(payload({ description: 'from A' })));
    await fetchRegistryItem('http://a.test/r', 'button');

    vi.stubGlobal('fetch', mockFetch(payload({ description: 'from B' })));
    await fetchRegistryItem('http://b.test/r', 'button');

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const a = await fetchRegistryItem('http://a.test/r', 'button');
    const b = await fetchRegistryItem('http://b.test/r', 'button');

    expect(a?.description).toBe('from A');
    expect(b?.description).toBe('from B');

    await clearRegistryCache('http://a.test/r');
    await clearRegistryCache('http://b.test/r');
  });

  it('does not fail when the cache directory is unwritable', async () => {
    // Retargeted from fs-extra's `ensureDir` onto the native `mkdir` the
    // filesystem helpers now use.
    const spy = vi.spyOn(fs, 'mkdir').mockRejectedValue(new Error('EACCES'));
    vi.stubGlobal('fetch', mockFetch(payload()));

    const item = await fetchRegistryItem(TEST_URL, 'button');
    expect(item?.name).toBe('button');
    spy.mockRestore();
  });
});

describe('cache location', () => {
  it('lives under the user cache dir, not the project', async () => {
    vi.stubGlobal('fetch', mockFetch(payload()));
    await fetchRegistryItem(TEST_URL, 'button');

    const base = path.join(os.homedir(), '.cache', 'bna-ui');
    await expect(fs.access(base)).resolves.toBeUndefined();
    await clearRegistryCache(TEST_URL);
  });
});
