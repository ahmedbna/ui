/**
 * Builds the BNA UI Claude Skill.
 *
 * A skill is a directory Claude loads on demand: a `SKILL.md` with front-matter
 * describing when it applies, plus reference files it reads only when it needs
 * them. That progressive disclosure is the point — the trigger description costs
 * a few tokens in every conversation, and the eleven-thousand-word component
 * catalogue costs nothing until a conversation is actually about this library.
 *
 * Generated from the registry rather than written by hand, so the catalogue
 * cannot drift, and zipped into the docs site's `public/` for download.
 *
 * Output: dist/bna-ui/{SKILL.md,references/*.md} and dist/bna-ui.zip
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { promisify } from 'node:util';

const run = promisify(execFile);
const require = createRequire(import.meta.url);
const ROOT = path.join(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SKILL = path.join(DIST, 'bna-ui');
const SITE = 'https://ui.ahmedbna.com';

const REGISTRY_ROOT = path.dirname(
  require.resolve('@bna-ui/registry/package.json')
);
const INDEX = path.join(REGISTRY_ROOT, 'dist', 'generated', 'r', 'index.json');
const AI_DIR = path.join(REGISTRY_ROOT, 'dist', 'generated', 'r', 'ai');

const INSTALLABLE = new Set(['registry:ui', 'registry:hook', 'registry:theme']);

function bucket(item) {
  if (item.type === 'registry:hook') return 'hooks';
  if (item.type === 'registry:theme') return 'theme';
  return (item.files[0]?.target ?? '').startsWith('components/charts/')
    ? 'charts'
    : 'components';
}

/**
 * The file Claude reads first. Kept short on purpose: everything below the fold
 * lives in `references/`, which is only read when a task needs it.
 */
function skillMd(counts) {
  return `---
name: bna-ui
description: >-
  Build React Native and Expo interfaces with BNA UI — ${counts.components}
  components, ${counts.charts} charts, hooks and a theme system, installed as
  source with \`npx bna-ui add\`. Use when working in a React Native or Expo
  project that has BNA UI, when adding UI to one, or when the user mentions
  bna-ui, @/components/ui, or useColor. Not for web React.
---

# BNA UI

A component library for **React Native and Expo**, distributed as source code.

## The one thing to get right

This is **not a web library**. Components render through \`react-native\`, not the
DOM. Before writing any JSX here:

- No HTML elements and no \`className\`. Use \`View\`, \`Text\`, \`Pressable\`, and the
  components listed in \`references/catalogue.md\`.
- Style with \`StyleSheet\` objects and the \`style\` prop.
- No Tailwind, no Radix.

Every other component library in your training data is for the web. This one is
not, and defaulting to \`<div className="flex">\` is the failure mode to watch for.

## Adding a component

\`\`\`bash
npx bna-ui add button
\`\`\`

Copies the component's source into the project along with everything it imports,
and prints the npm packages to install. The project owns the code afterwards —
edit it freely.

Scaffold a new app with \`npx bna-ui init my-app\`, or \`npx bna-ui convex my-app\`
for one with a Convex backend and auth.

## Imports and theming

Component source resolves its dependencies through these aliases. They are part
of the contract:

\`\`\`
@/components/ui/*      components
@/components/charts/*  charts
@/hooks/*              hooks
@/theme/*              colours and sizing tokens
\`\`\`

Colours come from the \`useColor\` hook, which reads the active light/dark theme —
**never hardcode a hex value**. Sizing tokens (\`HEIGHT\`, \`FONT_SIZE\`,
\`BORDER_RADIUS\`, \`CORNERS\`) come from \`@/theme/globals\`.

\`\`\`tsx
import { Button } from '@/components/ui/button';
import { useColor } from '@/hooks/useColor';

const primary = useColor('primary');
\`\`\`

## Finding the API of a component

Do not guess props. Get them:

\`\`\`bash
npx bna-ui info button --json
\`\`\`

Returns the description, props, variants, usage snippet, accessibility notes,
dependencies, full source and every example. The same data is at
\`${SITE}/r/ai/<name>.json\`, and any documentation page is available as Markdown
by appending \`.md\` to its URL.

## References

- \`references/catalogue.md\` — every component, chart, hook and theme file with
  its description. Read this to find the right component.
- \`references/conventions.md\` — theming, layout, platform notes and the mistakes
  that come up most.
- \`references/endpoints.md\` — the machine-readable endpoints and the MCP server.
`;
}

function catalogueMd(groups) {
  const titles = {
    components: 'Components',
    charts: 'Charts',
    hooks: 'Hooks',
    theme: 'Theme',
  };

  const sections = Object.entries(groups).map(([key, items]) =>
    [
      `## ${titles[key]}`,
      '',
      ...items.map((item) => `- \`${item.name}\` — ${item.description}`),
    ].join('\n')
  );

  return `# Catalogue

Install any of these with \`npx bna-ui add <name>\`. For props and source, run
\`npx bna-ui info <name> --json\`.

${sections.join('\n\n')}
`;
}

function conventionsMd(example) {
  return `# Conventions

## Theming

\`useColor\` returns a colour from the active theme. The token names come from
\`@/theme/colors\` — \`primary\`, \`secondary\`, \`background\`, \`foreground\`, \`muted\`,
\`border\`, \`destructive\`, and the rest of the semantic set.

\`\`\`tsx
import { useColor } from '@/hooks/useColor';

function Panel() {
  const background = useColor('card');
  const border = useColor('border');
  return <View style={{ backgroundColor: background, borderColor: border }} />;
}
\`\`\`

Sizing tokens live in \`@/theme/globals\`:

\`\`\`tsx
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
\`\`\`

## Dark mode

\`useColorScheme\` reports the active scheme and \`useModeToggle\` switches it.
Components read the theme themselves, so a component tree does not need to thread
the scheme through props.

## Composition

Components are plain React Native components with a \`style\` prop. Compose them
rather than reaching for a variant that does not exist — and when a variant does
exist, it is enumerated in the component's \`meta.variants\`.

## Common mistakes

- Writing \`<div>\`, \`<span>\`, \`<button>\`, or any \`className\`. There is no DOM.
- Hardcoding colours instead of calling \`useColor\`.
- Importing from a relative path instead of \`@/components/ui/…\`. The alias is
  what the copied source itself uses.
- Assuming a prop exists. Run \`npx bna-ui info <name> --json\` first.
- Reaching for a web package (\`framer-motion\`, \`@radix-ui/*\`, \`tailwindcss\`).
  Animation here is \`react-native-reanimated\`.

## A complete example

\`\`\`tsx
${example}
\`\`\`
`;
}

function endpointsMd() {
  return `# Machine-readable endpoints

No API key. Every endpoint sends \`Access-Control-Allow-Origin: *\`.

| What | Where |
| --- | --- |
| Index of everything | ${SITE}/llms.txt |
| Whole corpus in one file | ${SITE}/llms-full.txt |
| Any page as Markdown | append \`.md\` to its URL |
| One component, in full | ${SITE}/r/ai/&lt;name&gt;.json |
| Component index | ${SITE}/r/ai/index.json |
| Install payload | ${SITE}/r/&lt;name&gt;.json |

A component bundle carries description, props, variants, usage, accessibility
notes, dependencies, source and every example — one request, no scraping.

## MCP

\`\`\`bash
claude mcp add bna-ui -- npx -y bna-ui mcp
\`\`\`

Tools: \`list_components\`, \`search_components\`, \`get_component\`,
\`get_component_source\`, \`get_install_plan\`, \`get_docs\`.

Prefer these over fetching URLs when they are available: they share the CLI's
cache, so repeat calls are free and they work offline.
`;
}

async function main() {
  const index = JSON.parse(await fs.readFile(INDEX, 'utf8'));

  const groups = { components: [], charts: [], hooks: [], theme: [] };
  for (const item of index.items) {
    if (INSTALLABLE.has(item.type)) groups[bucket(item)].push(item);
  }
  for (const items of Object.values(groups)) {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  // A real demo, so the example in the skill cannot describe an API that does
  // not exist.
  const button = JSON.parse(
    await fs.readFile(path.join(AI_DIR, 'button.json'), 'utf8')
  );
  const demo =
    button.examples.find((e) => e.name === 'button-variants') ??
    button.examples[0];
  const example = demo?.files[0]?.content.trim() ?? '';

  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(path.join(SKILL, 'references'), { recursive: true });

  const counts = {
    components: groups.components.length,
    charts: groups.charts.length,
  };

  await fs.writeFile(path.join(SKILL, 'SKILL.md'), skillMd(counts));
  await fs.writeFile(
    path.join(SKILL, 'references', 'catalogue.md'),
    catalogueMd(groups)
  );
  await fs.writeFile(
    path.join(SKILL, 'references', 'conventions.md'),
    conventionsMd(example)
  );
  await fs.writeFile(
    path.join(SKILL, 'references', 'endpoints.md'),
    endpointsMd()
  );

  // `zip` ships with macOS and every CI image this repo runs on; a JS zip
  // library would be a dependency for one call.
  await run('zip', ['-qr', 'bna-ui.zip', 'bna-ui'], { cwd: DIST });

  const { size } = await fs.stat(path.join(DIST, 'bna-ui.zip'));
  const total = Object.values(groups).reduce((n, g) => n + g.length, 0);
  console.log(
    `✔ skill: ${total} entries → dist/bna-ui/ + bna-ui.zip (${(size / 1024).toFixed(1)} KB)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
