/**
 * Turns the MDX components the docs are authored with into plain Markdown.
 *
 * The docs are unreadable to anything that does not execute React: a component
 * page's entire "Examples" section is `<ComponentPreview name='button-variants'/>`
 * tags that resolve, at render time, to CDN screen recordings. The demo source —
 * the one thing a model actually needs — appears nowhere in the document.
 *
 * So this does not strip JSX, it *expands* it. `<ComponentPreview>` and
 * `<ComponentSource>` become fenced code blocks holding the real source pulled
 * from the registry; layout wrappers unwrap; tab strips flatten into headings.
 *
 * Anything unrecognised unwraps to its children and reports a warning rather
 * than being dropped: losing prose silently is worse than an unstyled paragraph,
 * and `scripts/check-ai-artifacts.mjs` fails the build on a leaked tag anyway.
 */
import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { REGISTRY } from '@bna-ui/registry';
import { source } from '@/lib/source';
import { cachedSource } from '@/lib/llm/cache';

/**
 * Parse-only, for turning registry metadata strings back into inline mdast.
 * Local rather than shared with `to-markdown.ts`, which imports this module.
 */
const processor = unified().use(remarkParse).use(remarkGfm);

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

export type TransformContext = {
  /** Records a problem without aborting; surfaced by the build checker. */
  warn: (message: string) => void;
};

/** Node types whose children are block content we should walk into. */
const CONTAINERS = new Set(['root', 'blockquote', 'listItem', 'list']);

// ---------------------------------------------------------------------------
// mdast helpers
// ---------------------------------------------------------------------------

function attr(node: JsxElement, name: string): string | undefined {
  for (const a of node.attributes) {
    if (a.type === 'mdxJsxAttribute' && a.name === name) {
      if (typeof a.value === 'string') return a.value;
      // `name={'button'}` — an expression wrapping a plain literal.
      if (a.value && typeof a.value === 'object' && 'value' in a.value) {
        return String(a.value.value).replace(/^['"`]|['"`]$/g, '');
      }
    }
  }
  return undefined;
}

/** Flattens a subtree to its visible text, for labels and headings. */
function toText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const n = node as { type?: string; value?: string; children?: unknown[] };
  if (n.type === 'text' || n.type === 'inlineCode') return n.value ?? '';
  if (Array.isArray(n.children)) return n.children.map(toText).join('');
  return '';
}

function paragraph(children: RootContent[]): RootContent {
  return { type: 'paragraph', children } as RootContent;
}

/**
 * Promotes JSX-only paragraphs to flow level.
 *
 * MDX decides between a flow element and an inline one by blank lines, so
 * children written without them — which is how `<TabsList>` and `<Steps>` are
 * authored throughout the docs — arrive as `mdxJsxTextElement`s wrapped in a
 * paragraph:
 *
 *     <TabsList>                     mdxJsxFlowElement <TabsList>
 *       <TabsTrigger value="cli">      paragraph
 *       <TabsTrigger value="manual">     mdxJsxTextElement <TabsTrigger>
 *     </TabsList>                        mdxJsxTextElement <TabsTrigger>
 *
 * Handlers that inspect their own children would otherwise have to know which
 * spelling the author happened to use. Unwrapping the paragraph first makes the
 * two forms identical; mixed prose like `see the <Link>docs</Link>` is left
 * alone, since there the paragraph is meaningful.
 */
function liftJsxParagraphs(nodes: RootContent[]): RootContent[] {
  const out: RootContent[] = [];

  for (const node of nodes) {
    if (node.type !== 'paragraph') {
      out.push(node);
      continue;
    }

    const children = node.children as RootContent[];
    const jsx = children.filter((child) => child.type === 'mdxJsxTextElement');
    const rest = children.filter(
      (child) => child.type !== 'mdxJsxTextElement' && toText(child).trim()
    );

    if (jsx.length && !rest.length) out.push(...jsx);
    else out.push(node);
  }

  return out;
}

function text(value: string): RootContent {
  return { type: 'text', value } as RootContent;
}

function strong(value: string): RootContent {
  return { type: 'strong', children: [text(value)] } as RootContent;
}

function heading(depth: 1 | 2 | 3 | 4 | 5 | 6, value: string): RootContent {
  return { type: 'heading', depth, children: [text(value)] } as RootContent;
}

function code(value: string, lang = 'tsx'): RootContent {
  return { type: 'code', lang, meta: null, value } as RootContent;
}

function link(url: string, label: string): RootContent {
  return { type: 'link', url, children: [text(label)] } as RootContent;
}

function mono(value: string): string {
  return `\`${value}\``;
}

/**
 * A type or default, as inline Markdown.
 *
 * Almost every one is a bare type that belongs in a code span. A few are
 * annotated — "`SwitchProps` (from React Native)" — and arrive already carrying
 * their own backticks, so wrapping those again would nest code spans.
 */
function codeSpan(value: string): string {
  return value.includes('`') ? value : mono(value);
}

/** A paragraph whose text is inline Markdown rather than literal characters. */
function inlineParagraph(value: string): RootContent {
  return {
    type: 'paragraph',
    children: (
      processor.parse(value).children[0] as { children?: RootContent[] }
    )?.children ?? [text(value)],
  } as RootContent;
}

/**
 * A GFM table from plain strings.
 *
 * Cells are parsed as inline Markdown rather than inserted as text, because the
 * descriptions migrated out of the old tables still contain inline code, and a
 * type like `` `ViewStyle | ViewStyle[]` `` needs its pipe escaped — which
 * `remark-stringify` only does for content it knows is inside a table cell.
 */
function table(headers: string[], rows: string[][]): RootContent {
  const cell = (value: string): RootContent =>
    ({
      type: 'tableCell',
      children: (
        processor.parse(value).children[0] as { children?: RootContent[] }
      )?.children ?? [text(value)],
    }) as RootContent;

  const row = (values: string[]): RootContent =>
    ({ type: 'tableRow', children: values.map(cell) }) as RootContent;

  return {
    type: 'table',
    align: headers.map(() => null),
    children: [row(headers), ...rows.map(row)],
  } as RootContent;
}

function bullets(items: string[]): RootContent {
  return {
    type: 'list',
    ordered: false,
    spread: false,
    children: items.map((item) => ({
      type: 'listItem',
      spread: false,
      children: [
        {
          type: 'paragraph',
          children: (
            processor.parse(item).children[0] as { children?: RootContent[] }
          )?.children ?? [text(item)],
        },
      ],
    })),
  } as RootContent;
}

function langFor(file: string | undefined): string {
  const ext = file?.split('.').pop();
  if (!ext) return 'tsx';
  if (ext === 'ts' || ext === 'tsx' || ext === 'js' || ext === 'jsx')
    return ext;
  if (ext === 'json' || ext === 'css') return ext;
  return 'tsx';
}

/**
 * A code block carrying the file it belongs to.
 *
 * The path goes inside the fence as a comment rather than in fence metadata:
 * `title=` is a rehype-pretty-code convention that a plain Markdown reader shows
 * as noise, whereas a leading comment survives a straight copy-paste into the
 * file it names.
 */
function sourceBlock(target: string | undefined, body: string): RootContent {
  const lang = langFor(target);
  const header = target ? `// ${target}\n` : '';
  return code(header + body.trimEnd(), lang);
}

// ---------------------------------------------------------------------------
// Per-component handlers
// ---------------------------------------------------------------------------

type Handler = (
  node: JsxElement,
  ctx: TransformContext,
  walk: (nodes: RootContent[]) => Promise<RootContent[]>
) => Promise<RootContent[]>;

/** `<ComponentPreview name='button-variants' description='…' />` */
const componentPreview: Handler = async (node, ctx) => {
  const name = attr(node, 'name');
  if (!name) {
    ctx.warn('<ComponentPreview> without a name');
    return [];
  }

  const entry = REGISTRY[name];
  if (!entry) {
    ctx.warn(`<ComponentPreview name='${name}'> — no such registry entry`);
    return [];
  }

  const body = await cachedSource(name);
  if (!body) {
    ctx.warn(`<ComponentPreview name='${name}'> — no source in payload`);
    return [];
  }

  const out: RootContent[] = [];
  const description = attr(node, 'description');
  if (description) {
    out.push(paragraph([strong('Example:'), text(` ${description}`)]));
  }
  out.push(sourceBlock(entry.files[0]?.target, body));
  return out;
};

/** `<ComponentSource name='button' title='components/ui/button.tsx' />` */
const componentSource: Handler = async (node, ctx) => {
  const name = attr(node, 'name');
  const src = attr(node, 'src');
  const file = attr(node, 'file');
  const title = attr(node, 'title');

  if (src) {
    try {
      // Same off-disk read `component-source.tsx` does for `src=`. The path is
      // built at runtime, which Turbopack cannot trace, hence the pragma.
      const full = path.join(/* turbopackIgnore: true */ process.cwd(), src);
      return [sourceBlock(title ?? src, await fs.readFile(full, 'utf-8'))];
    } catch {
      ctx.warn(`<ComponentSource src='${src}'> — unreadable`);
      return [];
    }
  }

  if (!name) {
    ctx.warn('<ComponentSource> without a name or src');
    return [];
  }

  const body = await cachedSource(name, file);
  if (!body) {
    ctx.warn(`<ComponentSource name='${name}'> — no source in payload`);
    return [];
  }

  const target = title ?? file ?? REGISTRY[name]?.files[0]?.target;
  return [sourceBlock(target, body)];
};

/**
 * `<CodeTabs>` / `<Tabs>` — flatten each tab into a labelled subsection.
 *
 * The label comes from the matching `<TabsTrigger>` rather than the `value`
 * attribute, so "cli" renders as "CLI" the way the page shows it.
 */
const tabs: Handler = async (node, ctx, walk) => {
  const labels = new Map<string, string>();
  const collect = (children: RootContent[]) => {
    for (const child of children) {
      const el = child as JsxElement;
      if (
        (el.type === 'mdxJsxFlowElement' || el.type === 'mdxJsxTextElement') &&
        el.name === 'TabsTrigger'
      ) {
        const value = attr(el, 'value');
        if (value) labels.set(value, toText(el).trim());
        continue;
      }
      if ('children' in el && Array.isArray(el.children)) {
        collect(el.children as RootContent[]);
      }
    }
  };
  collect(node.children as RootContent[]);

  const out: RootContent[] = [];
  for (const child of liftJsxParagraphs(node.children as RootContent[])) {
    const el = child as JsxElement;
    const isJsx =
      el.type === 'mdxJsxFlowElement' || el.type === 'mdxJsxTextElement';

    if (isJsx && el.name === 'TabsList') continue;

    if (isJsx && el.name === 'TabsContent') {
      const value = attr(el, 'value') ?? '';
      const label = labels.get(value) || value.toUpperCase();
      if (label) out.push(heading(3, label));
      out.push(...(await walk(el.children as RootContent[])));
      continue;
    }

    out.push(...(await walk([child])));
  }
  return out;
};

/**
 * `<Steps>` — number the `<Step>` labels.
 *
 * `<Step>` is a *sibling* of the content it introduces, not its parent, so this
 * cannot become a real ordered list without restructuring the whole block. A
 * bolded "1." keeps the numbering and leaves the following fence at the same
 * level, which is what a reader (human or model) needs.
 */
const steps: Handler = async (node, ctx, walk) => {
  const out: RootContent[] = [];
  let n = 0;
  for (const child of liftJsxParagraphs(node.children as RootContent[])) {
    const el = child as JsxElement;
    if (
      (el.type === 'mdxJsxFlowElement' || el.type === 'mdxJsxTextElement') &&
      el.name === 'Step'
    ) {
      n += 1;
      out.push(paragraph([strong(`${n}.`), text(` ${toText(el).trim()}`)]));
      continue;
    }
    out.push(...(await walk([child])));
  }
  return out;
};

const blockquoteOf: Handler = async (node, ctx, walk) => [
  {
    type: 'blockquote',
    children: await walk(node.children as RootContent[]),
  } as RootContent,
];

/** `<ComponentsList/>`, `<ChartsList/>`, `<HooksList/>`, `<ThemeList/>`, `<ProvidersList/>` */
function pageTreeList(id: string): Handler {
  return async (_node, ctx) => {
    const folder = source.pageTree.children.find(
      (child) => '$id' in child && child.$id === id
    );
    if (!folder || folder.type !== 'folder') {
      ctx.warn(`page tree has no folder "${id}"`);
      return [];
    }

    const items = folder.children
      .filter((child) => child.type === 'page')
      .map((page) => {
        const name = String(page.name);
        const entry = REGISTRY[name];
        const children: RootContent[] = [link(page.url, name)];
        if (entry?.description) {
          children.push(text(` — ${entry.description}`));
        }
        return {
          type: 'listItem',
          spread: false,
          children: [paragraph(children)],
        };
      });

    return [
      {
        type: 'list',
        ordered: false,
        spread: false,
        children: items,
      } as RootContent,
    ];
  };
}

/** `<Image src alt />` and `<ImagePreview src />` */
const image: Handler = async (node) => {
  const src = attr(node, 'src');
  if (!src) return [];
  return [
    paragraph([
      { type: 'image', url: src, alt: attr(node, 'alt') ?? '' } as RootContent,
    ]),
  ];
};

/**
 * `<LinkedCard href>` — the icon-and-blurb grid on the installation pages.
 *
 * The card body is an icon followed by a title div and a description div, so
 * flattening the whole subtree to text would run them together
 * ("ExpoThe components, theming…"). Each block child is read separately: the
 * first non-empty one is the link label, the rest become the blurb.
 */
const linkedCard: Handler = async (node, ctx, walk) => {
  const href = attr(node, 'href');
  const parts = (node.children as RootContent[])
    .map((child) => toText(child).replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const [label, ...blurb] = parts;
  if (!href || !label) return walk(node.children as RootContent[]);

  const children: RootContent[] = [link(href, label)];
  if (blurb.length) children.push(text(` — ${blurb.join(' ')}`));
  return [paragraph(children)];
};

const linkEl: Handler = async (node, ctx, walk) => {
  const href = attr(node, 'href');
  const label = toText(node).trim();
  if (href && label) return [link(href, label)];
  return walk(node.children as RootContent[]);
};

/**
 * `<ApiReference name='button' />` — the prop tables, from registry metadata.
 *
 * Emits the same GFM tables the pages carried before the metadata migration, so
 * a reader of the Markdown cannot tell which pages were migrated and which still
 * hand-write their tables.
 */
const apiReference: Handler = async (node, ctx) => {
  const name = attr(node, 'name');
  const meta = name ? REGISTRY[name]?.meta : undefined;

  if (!meta) {
    ctx.warn(`<ApiReference name='${name}'> — no meta for that entry`);
    return [];
  }

  const out: RootContent[] = [];

  for (const type of meta.types ?? []) {
    out.push(heading(3, type.name));
    if (type.description) out.push(inlineParagraph(type.description));

    // Only emit the columns this table actually uses, so a type documented
    // without defaults does not gain a column of dashes.
    const hasDefault = type.props.some((prop) => prop.default);
    const hasRequired = type.props.some((prop) => prop.required !== undefined);

    const headers = ['Prop', 'Type'];
    if (hasRequired) headers.push('Required');
    if (hasDefault) headers.push('Default');
    headers.push('Description');

    out.push(
      table(
        headers,
        type.props.map((prop) => {
          const row = [mono(prop.name), codeSpan(prop.type)];
          if (hasRequired) row.push(prop.required ? 'Yes' : 'No');
          // Defaults are stored as authored Markdown — `false` keeps its code
          // span, "theme color" stays prose — so emit them verbatim.
          if (hasDefault) row.push(prop.default || '-');
          row.push(prop.description);
          return row;
        })
      )
    );
  }

  for (const group of meta.variants ?? []) {
    out.push(heading(3, group.name));
    if (group.description) out.push(inlineParagraph(group.description));
    out.push(
      bullets(
        group.values.map((variant) =>
          variant.description
            ? `\`'${variant.value}'\` - ${variant.description}`
            : `\`'${variant.value}'\``
        )
      )
    );
  }

  return out;
};

/** `<Usage name='button' />` — the import line and a minimal example. */
const usage: Handler = async (node, ctx) => {
  const name = attr(node, 'name');
  const meta = name ? REGISTRY[name]?.meta?.usage : undefined;

  if (!meta) {
    ctx.warn(`<Usage name='${name}'> — no usage in meta`);
    return [];
  }
  return [code(meta.import), code(meta.snippet)];
};

/** `<Accessibility name='button' />` */
const accessibility: Handler = async (node, ctx) => {
  const name = attr(node, 'name');
  const meta = name ? REGISTRY[name]?.meta?.accessibility : undefined;

  if (!meta) {
    ctx.warn(`<Accessibility name='${name}'> — no accessibility notes in meta`);
    return [];
  }

  const out: RootContent[] = [];
  if (meta.summary) out.push(paragraph([text(meta.summary)]));
  out.push(bullets(meta.items));
  return out;
};

/** Unwrap: keep the children, drop the wrapper. */
const unwrap: Handler = async (node, ctx, walk) =>
  walk(node.children as RootContent[]);

/** Drop entirely — decoration with no textual meaning. */
const drop: Handler = async () => [];

const strongLabel: Handler = async (node) => {
  const label = toText(node).trim();
  return label ? [paragraph([strong(label)])] : [];
};

const HANDLERS: Record<string, Handler> = {
  ComponentPreview: componentPreview,
  ComponentSource: componentSource,
  ApiReference: apiReference,
  Usage: usage,
  Accessibility: accessibility,

  CodeTabs: tabs,
  Tabs: tabs,
  Tab: unwrap,
  TabsList: drop,
  TabsTrigger: drop,
  TabsContent: unwrap,

  Steps: steps,
  Step: strongLabel,

  Callout: blockquoteOf,
  Alert: blockquoteOf,
  AlertTitle: strongLabel,
  AlertDescription: unwrap,

  Accordion: unwrap,
  AccordionItem: unwrap,
  AccordionTrigger: strongLabel,
  AccordionContent: unwrap,

  ExamplesGrid: unwrap,
  AspectRatio: unwrap,
  CodeCollapsibleWrapper: unwrap,
  Button: unwrap,

  ComponentsList: pageTreeList('components'),
  ChartsList: pageTreeList('charts'),
  HooksList: pageTreeList('hooks'),
  ThemeList: pageTreeList('theme'),
  ProvidersList: pageTreeList('providers'),

  Image: image,
  ImagePreview: image,
  LinkedCard: linkedCard,
  Link: linkEl,

  // Plain HTML that appears in MDX as JSX.
  div: unwrap,
  span: unwrap,
  p: unwrap,
  svg: drop,
  path: drop,
  br: drop,
};

// ---------------------------------------------------------------------------
// Walk
// ---------------------------------------------------------------------------

export async function transformTree(
  tree: Root,
  ctx: TransformContext
): Promise<void> {
  tree.children = await transformNodes(tree.children, ctx);
}

async function transformNodes(
  nodes: RootContent[],
  ctx: TransformContext
): Promise<RootContent[]> {
  const walk = (next: RootContent[]) => transformNodes(next, ctx);
  const out: RootContent[] = [];

  for (const node of liftJsxParagraphs(nodes)) {
    // `import`/`export` statements and `{/* comments */}` carry nothing.
    if (
      node.type === 'mdxjsEsm' ||
      node.type === 'mdxFlowExpression' ||
      node.type === 'mdxTextExpression'
    ) {
      continue;
    }

    if (
      node.type === 'mdxJsxFlowElement' ||
      node.type === 'mdxJsxTextElement'
    ) {
      const el = node as JsxElement;
      // A fragment (`<>…</>`) has a null name.
      const name = el.name ?? '';
      const handler = HANDLERS[name];

      if (handler) {
        out.push(...(await handler(el, ctx, walk)));
        continue;
      }

      if (name) ctx.warn(`unhandled <${name}> — unwrapped to its children`);
      out.push(...(await walk((el.children ?? []) as RootContent[])));
      continue;
    }

    if (CONTAINERS.has(node.type) && 'children' in node) {
      out.push({
        ...node,
        children: await walk(node.children as RootContent[]),
      } as RootContent);
      continue;
    }

    // Paragraphs and headings can hold inline JSX (`<Link>`, `<Icon/>`).
    if ('children' in node && Array.isArray(node.children)) {
      const children = await walk(node.children as RootContent[]);
      // An unwrapped block element can surface inside a paragraph; hoist it so
      // a code fence never ends up nested in one.
      if (node.type === 'paragraph' && children.some(isBlock)) {
        out.push(...hoist(children));
        continue;
      }
      out.push({ ...node, children } as RootContent);
      continue;
    }

    out.push(node);
  }

  return out;
}

const BLOCK_TYPES = new Set([
  'code',
  'heading',
  'list',
  'blockquote',
  'paragraph',
  'table',
  'thematicBreak',
]);

function isBlock(node: RootContent): boolean {
  return BLOCK_TYPES.has(node.type);
}

/** Splits a mixed run of inline and block nodes into a flat block sequence. */
function hoist(children: RootContent[]): RootContent[] {
  const out: RootContent[] = [];
  let inline: RootContent[] = [];

  const flush = () => {
    if (inline.some((node) => toText(node).trim())) out.push(paragraph(inline));
    inline = [];
  };

  for (const child of children) {
    if (isBlock(child)) {
      flush();
      out.push(child);
    } else {
      inline.push(child);
    }
  }
  flush();
  return out;
}
