/**
 * `bna-ui info <component>` — the component bundle, on stdout.
 *
 * The escape hatch for agents that cannot speak MCP but can run a command: one
 * subprocess returns the same description, props, source and examples the MCP
 * server serves. `--json` makes it machine-readable; the default is the shape a
 * person would want to read.
 */
import { CliError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import { fetchAiBundle, resolveRegistryUrl } from '../utils/registry-client.js';
import { theme } from '../utils/theme.js';

export async function infoCommand(
  name: string,
  options: { json?: boolean; registry?: string } = {}
) {
  const registryUrl = resolveRegistryUrl(options.registry);
  const bundle = await fetchAiBundle(registryUrl, name);

  if (!bundle) {
    throw new CliError(`No component named "${name}".`, {
      hint: `Run \`bna-ui search ${name}\`, or browse them all: ${registryUrl}/ai/index.json`,
    });
  }

  if (options.json) {
    // Straight to stdout, unadorned — this is what gets piped.
    process.stdout.write(JSON.stringify(bundle, null, 2) + '\n');
    return;
  }

  /** Field labels recede so the values they introduce carry the line. */
  const field = (label: string, value: string) =>
    `  ${theme.dim(label.padEnd(10))}  ${value}`;

  const lines: string[] = [
    '',
    `  ${theme.badge(bundle.name)} ${bundle.description}`,
    '',
    field('Install', theme.code(bundle.install.cli)),
  ];

  if (bundle.docs) lines.push(field('Docs', bundle.docs));
  if (bundle.markdown) lines.push(field('Markdown', bundle.markdown));

  if (bundle.install.npm.length) {
    lines.push(field('npm', bundle.install.npm.join(', ')));
  }
  if (bundle.registryDependencies.length) {
    lines.push(field('Also adds', bundle.registryDependencies.join(', ')));
  }

  const meta = bundle.meta as
    | {
        usage?: { import?: string };
        types?: Array<{ name: string; props: unknown[] }>;
      }
    | undefined;

  if (meta?.usage?.import) {
    lines.push('', `  ${theme.code(meta.usage.import)}`);
  }
  if (meta?.types?.length) {
    lines.push(
      '',
      `  ${theme.heading('Props')}`,
      ...meta.types.map(
        (type) => `    ${type.name} ${theme.dim(`(${type.props.length})`)}`
      )
    );
  }
  if (bundle.examples.length) {
    lines.push(
      '',
      field('Examples', bundle.examples.map((e) => e.name).join(', '))
    );
  }

  lines.push(
    '',
    field('Full JSON', theme.code(`bna-ui info ${bundle.name} --json`)),
    ''
  );
  // Emitted as a block rather than through `logger.info`, which would prefix
  // only the first line with `ℹ` and leave the rest hanging under it.
  for (const line of lines) logger.plain(line);
}
