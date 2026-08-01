/**
 * `bna-ui mcp` — the registry as an MCP server.
 *
 * Without this, an assistant asked to "add a BNA UI button" has two options:
 * recall the library from training data, or fetch and parse a documentation
 * site. The first produces web React with `<div className>`, because that is
 * what every UI library it has read looks like. The second is slow and lossy.
 *
 * These tools let it ask instead. Everything goes through the same
 * `registry-client` the `add` command uses, so the URL resolution, the
 * `~/.cache/bna-ui` ETag cache and the schema-version gate are shared — an
 * agent and a human hitting the same registry see byte-identical data, and an
 * agent working offline gets the same warm cache.
 *
 * Nothing here writes to disk. Installing is `add`'s job, and an agent that
 * wants it can run the `install` command this returns.
 */
import { createRequire } from 'module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  fetchAiBundle,
  fetchRegistryIndex,
  resolveRegistryUrl,
  type RegistryIndexItem,
} from '../utils/registry-client.js';

const require = createRequire(import.meta.url);
const { version } = require('../../package.json') as { version: string };

/** Entry types a consumer installs; the rest are demos of these. */
const INSTALLABLE = new Set(['registry:ui', 'registry:hook', 'registry:theme']);

/**
 * Prepended to every component response.
 *
 * Repetition is deliberate. A model that reads this once at the top of a long
 * session has usually stopped attending to it by the time it writes the JSX;
 * restating it alongside the component it is about to use is what actually
 * prevents `<div className="flex">`.
 */
const CONSTRAINT = `BNA UI is a React Native / Expo component library. It is NOT a web library:
components render through react-native, not the DOM. No HTML elements, no
Tailwind classes, no Radix primitives. Style with StyleSheet objects and the
style prop, never className. Source is copied into the project and imported
through @/components/ui/*, @/components/charts/*, @/hooks/* and @/theme/*.
Colours come from the useColor hook; sizing tokens (HEIGHT, FONT_SIZE,
BORDER_RADIUS, CORNERS) from @/theme/globals.`;

function text(value: string) {
  return { content: [{ type: 'text' as const, text: value }] };
}

function json(value: unknown, preamble?: string) {
  const body = JSON.stringify(value, null, 2);
  return text(preamble ? `${preamble}\n\n${body}` : body);
}

/** Name, type and description — enough to choose, without the source. */
function summarise(item: RegistryIndexItem) {
  return {
    name: item.name,
    type: item.type,
    description: item.description,
    install: `npx bna-ui add ${item.name}`,
  };
}

export async function mcpCommand(options: { registry?: string } = {}) {
  const registryUrl = resolveRegistryUrl(options.registry);

  const server = new McpServer({ name: 'bna-ui', version });

  server.registerTool(
    'list_components',
    {
      title: 'List BNA UI components',
      description:
        'Every installable BNA UI component, chart, hook and theme file, with ' +
        'its description. Use this to find out what exists before asking for ' +
        'details. React Native / Expo only.',
      inputSchema: {
        type: z
          .enum(['all', 'component', 'chart', 'hook', 'theme'])
          .optional()
          .describe('Narrow the list. Defaults to all.'),
      },
    },
    async ({ type = 'all' }) => {
      const index = await fetchRegistryIndex(registryUrl);
      const items = index.items
        .filter((item) => INSTALLABLE.has(item.type))
        .filter((item) => {
          if (type === 'all') return true;
          if (type === 'hook') return item.type === 'registry:hook';
          if (type === 'theme') return item.type === 'registry:theme';
          // Charts and components are both `registry:ui`; only the target path
          // distinguishes them.
          const target = item.files[0]?.target ?? '';
          const isChart = target.startsWith('components/charts/');
          return type === 'chart' ? isChart : !isChart;
        })
        .map(summarise);

      return json({ count: items.length, items }, CONSTRAINT);
    }
  );

  server.registerTool(
    'search_components',
    {
      title: 'Search BNA UI components',
      description:
        'Find BNA UI components by name or description. Prefer this over ' +
        'guessing a component name.',
      inputSchema: {
        query: z
          .string()
          .describe('Search term, e.g. "date picker" or "chart".'),
      },
    },
    async ({ query }) => {
      const index = await fetchRegistryIndex(registryUrl);
      const needle = query.toLowerCase();

      // Exact name first, then name matches, then description matches — the
      // same ranking `resolve.ts` uses on the site.
      const matches = index.items
        .filter((item) => INSTALLABLE.has(item.type))
        .filter(
          (item) =>
            item.name.toLowerCase().includes(needle) ||
            item.description.toLowerCase().includes(needle)
        )
        .sort((a, b) => {
          const rank = (item: RegistryIndexItem) =>
            item.name.toLowerCase() === needle
              ? 0
              : item.name.toLowerCase().includes(needle)
                ? 1
                : 2;
          return rank(a) - rank(b) || a.name.localeCompare(b.name);
        })
        .map(summarise);

      if (!matches.length) {
        return text(
          `No BNA UI component matches "${query}". Call list_components to see ` +
            `everything available.`
        );
      }
      return json({ count: matches.length, items: matches }, CONSTRAINT);
    }
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get a BNA UI component',
      description:
        'Everything about one component: description, props, variants, usage ' +
        'snippet, accessibility notes, dependencies, full source, and every ' +
        'example. Read this before writing code that uses the component.',
      inputSchema: {
        name: z
          .string()
          .describe('Component name, e.g. "button" or "area-chart".'),
        includeExamples: z
          .boolean()
          .optional()
          .describe('Include the source of every example. Defaults to true.'),
      },
    },
    async ({ name, includeExamples = true }) => {
      const bundle = await fetchAiBundle(registryUrl, name);
      if (!bundle) {
        return text(
          `No BNA UI component named "${name}". Call search_components to find ` +
            `the right name.`
        );
      }
      return json(
        includeExamples ? bundle : { ...bundle, examples: undefined },
        CONSTRAINT
      );
    }
  );

  server.registerTool(
    'get_component_source',
    {
      title: 'Get BNA UI component source',
      description:
        "Just the component's own source files, without its metadata or " +
        'examples. Use when you already know the API and only need the code.',
      inputSchema: {
        name: z.string().describe('Component name, e.g. "button".'),
      },
    },
    async ({ name }) => {
      const bundle = await fetchAiBundle(registryUrl, name);
      if (!bundle) return text(`No BNA UI component named "${name}".`);

      const files = bundle.files
        .map((file) => `// ${file.target}\n${file.content}`)
        .join('\n\n');

      return text(
        `${CONSTRAINT}\n\nInstall with: ${bundle.install.cli}\n\n${files}`
      );
    }
  );

  server.registerTool(
    'get_install_plan',
    {
      title: 'Plan a BNA UI installation',
      description:
        'The exact command to install one or more components, plus the npm ' +
        'packages and the files that will be written. Run the command yourself ' +
        'or show it to the user — this tool never writes to disk.',
      inputSchema: {
        names: z.array(z.string()).describe('Component names to install.'),
      },
    },
    async ({ names }) => {
      const bundles = await Promise.all(
        names.map(
          async (name) =>
            [name, await fetchAiBundle(registryUrl, name)] as const
        )
      );

      const missing = bundles.filter(([, b]) => !b).map(([name]) => name);
      const found = bundles.flatMap(([, b]) => (b ? [b] : []));

      if (!found.length) {
        return text(`None of these are BNA UI components: ${names.join(', ')}`);
      }

      return json(
        {
          command: `npx bna-ui add ${found.map((b) => b.name).join(' ')}`,
          npmDependencies: [
            ...new Set(found.flatMap((b) => b.install.npm)),
          ].sort(),
          filesWritten: [
            ...new Set(found.flatMap((b) => b.files.map((f) => f.target))),
          ].sort(),
          alsoInstalled: [
            ...new Set(found.flatMap((b) => b.registryDependencies)),
          ].sort(),
          ...(missing.length ? { notFound: missing } : {}),
        },
        CONSTRAINT
      );
    }
  );

  server.registerTool(
    'get_docs',
    {
      title: 'Read a BNA UI documentation page',
      description:
        'A documentation page as Markdown, with all component and example ' +
        'source expanded inline. Use for guides — installation, theming, ' +
        'Convex setup — rather than for a single component.',
      inputSchema: {
        path: z
          .string()
          .describe(
            'Documentation path, e.g. "installation/expo", "theming", or ' +
              '"components/button". Omit the leading /docs.'
          ),
      },
    },
    async ({ path: docPath }) => {
      // Derived from the registry URL so a `--registry http://localhost:3000/r`
      // dev session reads that server's docs too.
      const site = registryUrl.replace(/\/r$/, '');
      const clean = docPath.replace(/^\/?(docs\/)?/, '').replace(/\.md$/, '');
      const url = `${site}/docs/${clean}.md`;

      const response = await fetch(url);
      if (!response.ok) {
        return text(
          `No documentation page at ${url} (HTTP ${response.status}). ` +
            `See ${site}/llms.txt for the full list of pages.`
        );
      }
      return text(await response.text());
    }
  );

  await server.connect(new StdioServerTransport());
}
