/**
 * Generates `public/AGENTS.md`, served at https://ui.ahmedbna.com/AGENTS.md.
 *
 * The file an agent is pointed at — by a rules file, a system prompt, or by
 * being dropped into a repo — when it needs to know what this library is before
 * writing code against it. Generated rather than hand-written so the component
 * list cannot drift from the registry.
 *
 * Runs before `next build`, beside the other pre-build scripts.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.join(import.meta.dirname, '..');
const SITE = 'https://ui.ahmedbna.com';

const INDEX = path.join(
  path.dirname(require.resolve('@bna-ui/registry/package.json')),
  'dist',
  'generated',
  'r',
  'index.json'
);

const INSTALLABLE = new Set(['registry:ui', 'registry:hook', 'registry:theme']);

function group(items) {
  const buckets = { Components: [], Charts: [], Hooks: [], Theme: [] };

  for (const item of items) {
    if (!INSTALLABLE.has(item.type)) continue;
    const target = item.files[0]?.target ?? '';

    if (item.type === 'registry:hook') buckets.Hooks.push(item);
    else if (item.type === 'registry:theme') buckets.Theme.push(item);
    else if (target.startsWith('components/charts/')) buckets.Charts.push(item);
    else buckets.Components.push(item);
  }

  return buckets;
}

async function main() {
  const index = JSON.parse(await fs.readFile(INDEX, 'utf8'));
  const buckets = group(index.items);
  const total = Object.values(buckets).reduce((n, b) => n + b.length, 0);

  const sections = Object.entries(buckets)
    .filter(([, items]) => items.length)
    .map(([title, items]) =>
      [
        `### ${title}`,
        '',
        ...items
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => `- \`${item.name}\` — ${item.description}`),
      ].join('\n')
    );

  const content = `# BNA UI — notes for AI agents

BNA UI is a component library for **React Native and Expo**, distributed as
source code rather than as a package.

## Read this first

**This is not a web library.** Components render through \`react-native\`, not the
DOM. If you are about to write \`<div className="...">\`, stop — that is the most
common mistake made with this library, because every other component library you
have read is for the web.

- No HTML elements. Use \`View\`, \`Text\`, \`Pressable\` and the components below.
- No Tailwind, no \`className\`. Style with \`StyleSheet\` objects and the \`style\` prop.
- No Radix, no \`@radix-ui/*\`. The primitives here are React Native's.

## Installing a component

\`\`\`bash
npx bna-ui add button
\`\`\`

This copies the component's source into the project along with everything it
imports, and prints the npm packages to install. Components are *owned* by the
project after that — edit them freely.

To scaffold a new app: \`npx bna-ui init my-app\`, or one of
\`npx bna-ui convex|supabase|firebase my-app\` for a backend with authentication
already wired up. Add \`--no-auth\` for the backend without sign-in.

## Import contract

Component source imports its dependencies through these exact aliases. They are
part of the contract — a component moved elsewhere will not resolve.

| Alias | Holds |
| --- | --- |
| \`@/components/ui/*\` | Components |
| \`@/components/charts/*\` | Charts |
| \`@/hooks/*\` | Hooks |
| \`@/theme/*\` | Colours and sizing tokens |

## Theming

- Colours come from the \`useColor\` hook, which reads the active light/dark
  theme. **Never hardcode a hex value.**
- Sizing tokens — \`HEIGHT\`, \`FONT_SIZE\`, \`BORDER_RADIUS\`, \`CORNERS\` — come from
  \`@/theme/globals\`.

\`\`\`tsx
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';

const primary = useColor('primary');
\`\`\`

## Machine-readable documentation

Nothing here needs an API key, and everything sends \`Access-Control-Allow-Origin: *\`.

| What | Where |
| --- | --- |
| Index of everything | ${SITE}/llms.txt |
| Whole corpus, one file | ${SITE}/llms-full.txt |
| Any page as Markdown | append \`.md\` to its URL |
| One component, in full | ${SITE}/r/ai/&lt;name&gt;.json |
| Component index | ${SITE}/r/ai/index.json |
| Install payload (what the CLI fetches) | ${SITE}/r/&lt;name&gt;.json |

A component bundle carries the description, props, variants, usage snippet,
accessibility notes, dependencies, full source and every example — one request,
no scraping.

### MCP

\`\`\`bash
claude mcp add bna-ui -- npx -y bna-ui mcp
\`\`\`

Tools: \`list_components\`, \`search_components\`, \`get_component\`,
\`get_component_source\`, \`get_install_plan\`, \`get_docs\`.

Without MCP, \`npx bna-ui info <component> --json\` prints the same bundle.

## The ${total} installable entries

${sections.join('\n\n')}

---

Generated from the registry at ${index.generatedAt}. Source:
https://github.com/ahmedbna/ui
`;

  const target = path.join(ROOT, 'public', 'AGENTS.md');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content);

  console.log(
    `✔ AGENTS.md: ${total} entries → public/AGENTS.md ` +
      `(${(content.length / 1024).toFixed(1)} KB)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
