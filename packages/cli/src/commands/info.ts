/**
 * `bna-ui info <component>` — the component bundle, on stdout.
 *
 * The escape hatch for agents that cannot speak MCP but can run a command: one
 * subprocess returns the same description, props, source and examples the MCP
 * server serves. `--json` makes it machine-readable; the default is the shape a
 * person would want to read.
 */
import { logger } from '../utils/logger.js';
import { fetchAiBundle, resolveRegistryUrl } from '../utils/registry-client.js';

export async function infoCommand(
  name: string,
  options: { json?: boolean; registry?: string } = {}
) {
  const registryUrl = resolveRegistryUrl(options.registry);
  const bundle = await fetchAiBundle(registryUrl, name);

  if (!bundle) {
    logger.error(`No component named "${name}".`);
    logger.info(`  Browse them all: ${registryUrl}/ai/index.json`);
    process.exit(1);
  }

  if (options.json) {
    // Straight to stdout, unadorned — this is what gets piped.
    process.stdout.write(JSON.stringify(bundle, null, 2) + '\n');
    return;
  }

  const lines: string[] = [
    '',
    `  ${bundle.name} — ${bundle.description}`,
    '',
    `  Install     ${bundle.install.cli}`,
  ];

  if (bundle.docs) lines.push(`  Docs        ${bundle.docs}`);
  if (bundle.markdown) lines.push(`  Markdown    ${bundle.markdown}`);

  if (bundle.install.npm.length) {
    lines.push(`  npm         ${bundle.install.npm.join(', ')}`);
  }
  if (bundle.registryDependencies.length) {
    lines.push(`  Also adds   ${bundle.registryDependencies.join(', ')}`);
  }

  const meta = bundle.meta as
    | {
        usage?: { import?: string };
        types?: Array<{ name: string; props: unknown[] }>;
      }
    | undefined;

  if (meta?.usage?.import) {
    lines.push('', `  ${meta.usage.import}`);
  }
  if (meta?.types?.length) {
    lines.push(
      '',
      '  Props',
      ...meta.types.map((type) => `    ${type.name} (${type.props.length})`)
    );
  }
  if (bundle.examples.length) {
    lines.push(
      '',
      `  Examples    ${bundle.examples.map((e) => e.name).join(', ')}`
    );
  }

  lines.push('', `  Full JSON   bna-ui info ${bundle.name} --json`, '');
  logger.info(lines.join('\n'));
}
