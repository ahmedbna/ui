/**
 * Renders a docs page as standalone Markdown for machine consumption.
 *
 * Served at `<page url>.md`, concatenated into `/llms-full.txt`, and embedded in
 * the page itself so "Copy Page" has something to copy. Every consumer goes
 * through here, so a page's Markdown is identical however it is reached.
 *
 * Each document is written to stand alone: it opens with a header naming the
 * library, its React-Native-not-web constraint, the install command and the
 * import contract. A model handed one of these files in isolation — which is the
 * normal case, since agents fetch a single URL — has no other way to learn that
 * `<Button>` here is not a `<button>`.
 */
import 'server-only';
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { REGISTRY } from '@bna-ui/registry';
import { siteConfig } from '@/lib/config';
import { source } from '@/lib/source';
import { cachedPayload } from '@/lib/llm/cache';
import { transformTree } from '@/lib/llm/jsx-handlers';

type DocsPage = NonNullable<ReturnType<typeof source.getPage>>;

/** Sections whose page slug is also a registry entry name. */
const REGISTRY_SECTIONS = new Set(['components', 'charts', 'hooks', 'theme']);

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkStringify, {
    bullet: '-',
    emphasis: '_',
    strong: '*',
    fences: true,
    rule: '-',
    listItemIndent: 'one',
  });

const rendered = new Map<string, Promise<PageMarkdown>>();

export type PageMarkdown = {
  /** The full document, header block included. */
  content: string;
  /** Names of MDX components the transform did not recognise. */
  warnings: string[];
};

/**
 * The registry entry a page documents, if it documents one.
 *
 * Doc slugs mirror registry names by convention (`/docs/components/button` ↔
 * `button`), so this is a lookup rather than a mapping table — a page whose slug
 * has drifted from its entry simply gets the shorter header.
 */
export function registryNameForPage(slugs: string[]): string | undefined {
  if (slugs.length !== 2) return undefined;
  const [section, name] = slugs;
  if (!REGISTRY_SECTIONS.has(section)) return undefined;
  return REGISTRY[name] ? name : undefined;
}

export function getPageMarkdown(page: DocsPage): Promise<PageMarkdown> {
  let hit = rendered.get(page.url);
  if (!hit) {
    hit = render(page);
    rendered.set(page.url, hit);
  }
  return hit;
}

/** Convenience for callers that only want the text. */
export async function getPageMarkdownText(page: DocsPage): Promise<string> {
  return (await getPageMarkdown(page)).content;
}

async function render(page: DocsPage): Promise<PageMarkdown> {
  const warnings: string[] = [];
  const raw = await page.data.getText('raw');

  const tree = processor.parse(raw.replace(FRONTMATTER, ''));
  await transformTree(tree, {
    warn: (message) => warnings.push(message),
  });

  const body = processor.stringify(tree).trim();
  const header = await buildHeader(page);

  // Reported once per page — `getPageMarkdown` memoises, so a page rendered for
  // its route, its `.md` and `llms-full.txt` warns once, not three times.
  for (const warning of new Set(warnings)) {
    console.warn(`[ai-docs] ${page.url}: ${warning}`);
  }

  return { content: `${header}\n\n${body}\n`, warnings };
}

const LIBRARY_BLURB = [
  '**BNA UI** — a React Native / Expo component library.',
  'These components render through `react-native`, not the DOM: there are no HTML',
  'elements, no Tailwind classes and no Radix primitives. Source is copied into your',
  'project and imported through `@/components/ui/*`, `@/components/charts/*`,',
  '`@/hooks/*` and `@/theme/*`. Colours come from the `useColor` hook rather than',
  'hardcoded hex; sizing tokens (`HEIGHT`, `FONT_SIZE`, `BORDER_RADIUS`, `CORNERS`)',
  'come from `@/theme/globals`.',
].join('\n');

async function buildHeader(page: DocsPage): Promise<string> {
  const url = `${siteConfig.url}${page.url}`;
  const lines = [`# ${page.data.title}`];

  if (page.data.description) lines.push('', `> ${page.data.description}`);
  lines.push('', LIBRARY_BLURB, '');

  const facts = [`- Docs: ${url}`, `- Markdown: ${url}.md`];
  const name = registryNameForPage(page.slugs);

  if (name) {
    const entry = REGISTRY[name];
    const payload = await cachedPayload(name);

    facts.push(
      `- Structured JSON (props, usage, source, examples): ` +
        `${siteConfig.url}/r/ai/${name}.json`
    );
    facts.push(
      `- Install payload (source plus every file it imports): ` +
        `${siteConfig.url}/r/${name}.json`
    );
    facts.push(`- Install: \`npx bna-ui add ${name}\``);

    // The payload's lists are the transitive closure — what `add` actually
    // installs — rather than what this entry declares for itself.
    const npm = payload?.dependencies ?? entry.dependencies ?? [];
    if (npm.length) {
      facts.push(`- npm dependencies: ${npm.map(mono).join(', ')}`);
    }

    const registryDeps = payload?.registryDependencies ?? [];
    if (registryDeps.length) {
      facts.push(
        `- Registry dependencies: ${registryDeps.map(mono).join(', ')}`
      );
    }

    if (entry.preview?.light) {
      facts.push(`- Preview recording: ${entry.preview.light}`);
    }
  }

  lines.push(...facts, '', '---');
  return lines.join('\n');
}

function mono(value: string): string {
  return `\`${value}\``;
}
