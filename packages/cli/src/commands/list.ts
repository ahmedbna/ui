/**
 * `bna-ui list` and `bna-ui search` — finding out what exists.
 *
 * Until these, the only way to discover a component name was to run `add` with
 * no arguments and scroll a checkbox of 80+ entries; `info` already required
 * knowing the name. Both read the same cached, ETag-revalidated index `add`
 * uses, so they work offline against a warm cache.
 */
import { readConfig } from '../utils/config.js';
import { CliError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import {
  fetchRegistryIndex,
  resolveRegistryUrl,
  type RegistryIndexItem,
} from '../utils/registry-client.js';
import { createSpinner, theme } from '../utils/theme.js';

interface ListOptions {
  type?: string;
  json?: boolean;
  registry?: string;
}

/**
 * Registry entry types, grouped for display.
 *
 * `registry:example` is excluded: the index carries ~394 demos alongside the
 * ~87 real entries, and they are not independently installable.
 */
const GROUPS: Array<{ flag: string; title: string; types: string[] }> = [
  { flag: 'ui', title: 'Components', types: ['registry:ui'] },
  { flag: 'chart', title: 'Charts', types: ['registry:ui'] },
  { flag: 'hook', title: 'Hooks', types: ['registry:hook'] },
  { flag: 'theme', title: 'Theme', types: ['registry:theme'] },
];

/** Charts share the `registry:ui` type and are told apart by name. */
const isChart = (item: RegistryIndexItem) => item.name.endsWith('-chart');

function groupOf(item: RegistryIndexItem): string | null {
  if (item.type === 'registry:hook') return 'hook';
  if (item.type === 'registry:theme') return 'theme';
  if (item.type === 'registry:ui') return isChart(item) ? 'chart' : 'ui';
  return null;
}

async function loadIndex(options: {
  registry?: string;
}): Promise<RegistryIndexItem[]> {
  const config = await readConfig(process.cwd());
  const registryUrl = resolveRegistryUrl(options.registry, config?.registry);

  const spinner = createSpinner('Loading the registry...').start();
  try {
    const index = await fetchRegistryIndex(registryUrl);
    spinner.stop();
    return index.items;
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

function printGroup(title: string, items: RegistryIndexItem[]): void {
  if (items.length === 0) return;

  logger.newline();
  logger.plain(`  ${theme.heading(title)} ${theme.dim(`(${items.length})`)}`);

  const width = Math.max(...items.map((item) => item.name.length));
  for (const item of items) {
    logger.plain(
      `    ${theme.code(item.name.padEnd(width))}  ${theme.dim(item.description)}`
    );
  }
}

export async function listCommand(options: ListOptions = {}): Promise<void> {
  const items = (await loadIndex(options)).filter((item) => groupOf(item));

  const wanted = options.type;
  if (wanted && !GROUPS.some((group) => group.flag === wanted)) {
    throw new CliError(`Unknown type: ${wanted}`, {
      hint: `Expected one of: ${GROUPS.map((g) => g.flag).join(', ')}`,
    });
  }

  const selected = wanted
    ? items.filter((item) => groupOf(item) === wanted)
    : items;

  if (options.json) {
    process.stdout.write(JSON.stringify(selected, null, 2) + '\n');
    return;
  }

  for (const group of GROUPS) {
    if (wanted && group.flag !== wanted) continue;
    printGroup(
      group.title,
      selected
        .filter((item) => groupOf(item) === group.flag)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  logger.newline();
  logger.info(
    `${selected.length} entries. Add one with ${theme.code('bna-ui add <name>')}, or read its API with ${theme.code('bna-ui info <name>')}.`
  );
}

export async function searchCommand(
  query: string,
  options: ListOptions = {}
): Promise<void> {
  const needle = query.toLowerCase();
  const matches = (await loadIndex(options))
    .filter((item) => groupOf(item))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle)
    )
    // Exact name first, then name matches, then description matches — the
    // ordering someone typing `chart` or `button` actually expects.
    .sort((a, b) => {
      const rank = (item: RegistryIndexItem) =>
        item.name.toLowerCase() === needle
          ? 0
          : item.name.toLowerCase().includes(needle)
            ? 1
            : 2;
      return rank(a) - rank(b) || a.name.localeCompare(b.name);
    });

  if (options.json) {
    process.stdout.write(JSON.stringify(matches, null, 2) + '\n');
    return;
  }

  if (matches.length === 0) {
    throw new CliError(`Nothing matches "${query}".`, {
      hint: `Run ${'`bna-ui list`'} to see everything available.`,
    });
  }

  printGroup(`Matching "${query}"`, matches);
  logger.newline();
  logger.info(`Add one with ${theme.code('bna-ui add <name>')}.`);
}
