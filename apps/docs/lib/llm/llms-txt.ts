/**
 * The `llms.txt` index and its `llms-full.txt` companion.
 *
 * `llms.txt` is the llmstxt.org convention: a single Markdown file at the site
 * root that tells a model what this site is and where everything lives, so it
 * can fetch one page instead of crawling ninety-six. `llms-full.txt` is the
 * whole corpus inlined for anything that would rather ingest once.
 *
 * Both are built from the same page tree the sidebar uses, so a new doc page
 * appears in them without anyone remembering to add it.
 */
import 'server-only';
import type { Folder, Item } from 'fumadocs-core/page-tree';
import { siteConfig } from '@/lib/config';
import { source } from '@/lib/source';
import { getPageMarkdownText } from '@/lib/llm/to-markdown';

const INTRO = `> BNA UI is a collection of accessible, customisable components for React Native
> and Expo, distributed as source code rather than as a package. It is not a web
> library: components render through \`react-native\`, so there is no DOM, no
> Tailwind and no Radix. \`npx bna-ui add <component>\` copies a component and its
> dependency closure into your project, where you own and edit it. Built with
> TypeScript, Expo SDK 57 and React Native 0.86, with an iOS/Android/web theme
> system, 18 chart components, and Convex starters for backend and auth.`;

const CONVENTIONS = `## Conventions

- Components are copied into your project and imported through \`@/components/ui/*\`,
  \`@/components/charts/*\`, \`@/hooks/*\` and \`@/theme/*\`. These specifiers are part
  of the contract — component source imports its dependencies by those exact paths.
- Colours come from the \`useColor\` hook, which reads the active theme. Do not
  hardcode hex values.
- Sizing tokens (\`HEIGHT\`, \`FONT_SIZE\`, \`BORDER_RADIUS\`, \`CORNERS\`) come from
  \`@/theme/globals\`.
- Every component is a plain React Native component: style with \`StyleSheet\`
  objects and the \`style\` prop, never \`className\`.`;

/**
 * Machine-readable endpoints, described in the index itself.
 *
 * An agent that finds `llms.txt` should not have to guess that appending `.md`
 * to a docs URL works, so the convention is written down where it will be read.
 */
function endpoints(): string {
  const url = siteConfig.url;
  return `## Machine-readable endpoints

- [llms.txt](${url}/llms.txt): This file — the index.
- [llms-full.txt](${url}/llms-full.txt): Every documentation page inlined as Markdown.
- Any documentation page as Markdown: append \`.md\` to its URL, e.g.
  [${url}/docs/components/button.md](${url}/docs/components/button.md).
- [Component index](${url}/r/ai/index.json): Every installable component, with
  its description and the URL of its bundle.
- Component bundle: \`${url}/r/ai/<name>.json\` — description, props, variants,
  usage snippet, accessibility notes, dependencies, source and every example, in
  one request. Start here. e.g.
  [${url}/r/ai/button.json](${url}/r/ai/button.json).
- [Registry index](${url}/r/index.json): Every entry, including the examples, with
  its type, dependencies and file targets.
- Install payload: \`${url}/r/<name>.json\` — the component's source plus the full
  transitive closure of everything it imports, in dependency order and ready to
  write to disk. This is what the CLI fetches. e.g.
  [${url}/r/button.json](${url}/r/button.json).

All of these send \`Access-Control-Allow-Origin: *\`.`;
}

type Entry = { title: string; url: string; description?: string };

/** Root-level pages, plus one group per folder, in page-tree (meta.json) order. */
function sections(): Array<{ heading: string; entries: Entry[] }> {
  const out: Array<{ heading: string; entries: Entry[] }> = [];
  const overview: Entry[] = [];

  const toEntry = (node: Item): Entry | undefined => {
    const page = source.getPage(urlToSlugs(node.url));
    if (!page) return undefined;
    return {
      title: String(node.name),
      url: node.url,
      description: page.data.description,
    };
  };

  for (const child of source.pageTree.children) {
    if (child.type === 'page') {
      const entry = toEntry(child);
      if (entry) overview.push(entry);
      continue;
    }

    if (child.type !== 'folder') continue;

    const entries: Entry[] = [];
    // The folder's own index page leads its section.
    if (child.index) {
      const entry = toEntry(child.index);
      if (entry) entries.push(entry);
    }
    for (const page of child.children) {
      if (page.type !== 'page') continue;
      const entry = toEntry(page);
      if (entry) entries.push(entry);
    }

    if (entries.length) out.push({ heading: headingFor(child), entries });
  }

  if (overview.length) out.unshift({ heading: 'Overview', entries: overview });
  return out;
}

/**
 * The `(root)` route group takes its page-tree name from its index page, so the
 * section holding Introduction, About, CLI, shadcn and Theming would be headed
 * "Introduction" — which reads as if the four other pages were part of it.
 */
function headingFor(folder: Folder): string {
  const name = String(folder.name);
  return name === 'Introduction' ? 'Overview' : name;
}

/** `/docs/components/button` → `['components', 'button']` */
function urlToSlugs(url: string): string[] {
  return url
    .replace(/^\/docs\/?/, '')
    .split('/')
    .filter(Boolean);
}

export function buildLlmsTxt(): string {
  const parts = [`# ${siteConfig.name}`, '', INTRO, ''];

  for (const section of sections()) {
    parts.push(`## ${section.heading}`, '');
    for (const entry of section.entries) {
      const suffix = entry.description ? `: ${entry.description}` : '';
      parts.push(`- [${entry.title}](${siteConfig.url}${entry.url})${suffix}`);
    }
    parts.push('');
  }

  parts.push(CONVENTIONS, '', endpoints(), '');
  return parts.join('\n');
}

export async function buildLlmsFullTxt(): Promise<string> {
  const parts = [
    `# ${siteConfig.name} — complete documentation`,
    '',
    INTRO,
    '',
    `Every page from ${siteConfig.url}/docs, inlined. Each section below is also`,
    'available on its own by appending `.md` to its documentation URL.',
    '',
    CONVENTIONS,
    '',
  ];

  for (const section of sections()) {
    for (const entry of section.entries) {
      const page = source.getPage(urlToSlugs(entry.url));
      if (!page) continue;
      parts.push('<!-- ' + '-'.repeat(70) + ' -->', '');
      parts.push(await getPageMarkdownText(page));
      parts.push('');
    }
  }

  return parts.join('\n');
}
