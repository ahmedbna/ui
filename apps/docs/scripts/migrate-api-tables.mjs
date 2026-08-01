/**
 * One-shot migration: hand-written API tables → `packages/registry/meta/`.
 *
 * Seventy-seven MDX pages carry their component's props as a Markdown pipe
 * table. That is the only place those props are written down, so nothing
 * validates them, nothing can query them, and a model reading the page gets
 * prose where it wanted data. This lifts them into typed definitions and points
 * the pages at `<ApiReference>` instead.
 *
 * Committed for reproducibility, then effectively dead — run once, review the
 * diff, and afterwards edit `meta/` directly.
 *
 * Conservative by construction. It migrates only the three sections that are
 * uniformly structured across the corpus, and only when a given page's section
 * matches that structure exactly:
 *
 *   ## API Reference   always — every page is `### TypeName` + table or list
 *   ## Usage           only when it is exactly two code fences
 *   ## Accessibility   only when it is exactly one paragraph and one list
 *
 * Anything irregular is left in the MDX untouched and reported. The other
 * eighty-odd prose sections are never touched at all: they render fine and
 * already reach a model through the Markdown build.
 *
 * The rewrite splices byte ranges taken from mdast positions rather than
 * re-serialising the document, so every untouched byte stays exactly as it was.
 *
 *   node scripts/migrate-api-tables.mjs           # report only
 *   node scripts/migrate-api-tables.mjs --write   # apply
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const require = createRequire(import.meta.url);
const DOCS = path.join(import.meta.dirname, '..');
const CONTENT = path.join(DOCS, 'content', 'docs');
const REGISTRY = path.join(DOCS, '..', '..', 'packages', 'registry');
const META = path.join(REGISTRY, 'meta');

const INDEX = path.join(
  path.dirname(require.resolve('@bna-ui/registry/package.json')),
  'dist',
  'generated',
  'r',
  'index.json'
);

const WRITE = process.argv.includes('--write');
const SECTIONS = ['components', 'charts', 'hooks', 'theme'];

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkStringify, { bullet: '-', emphasis: '_', strong: '*' });

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

// ---------------------------------------------------------------------------
// mdast helpers
// ---------------------------------------------------------------------------

/** Markdown source of a node's children — keeps inline code and links intact. */
function inline(node) {
  if (!node?.children?.length) return '';
  return processor
    .stringify({ type: 'paragraph', children: node.children })
    .trim();
}

function plain(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  if (Array.isArray(node.children)) return node.children.map(plain).join('');
  return '';
}

/**
 * A table cell, read from the AST rather than from stringified Markdown.
 *
 * Three shapes appear in this corpus and each needs different handling:
 *
 *   `boolean`                          one code span  → the bare value
 *   `SwitchProps` (from React Native)  code + prose   → keep the Markdown
 *   theme color                        prose only     → the plain text
 *
 * Going through `remark-stringify` for all three was the bug that produced
 * `"\\-"` defaults: a lone `-` is escaped, because in Markdown it could start a
 * list. Prose-only cells therefore never round-trip through the serialiser.
 */
function cellText(cell) {
  if (!cell) return '';
  const kids = (cell.children ?? []).filter(
    (node) => !(node.type === 'text' && !node.value.trim())
  );
  if (kids.length === 1 && kids[0].type === 'inlineCode') return kids[0].value;
  if (kids.some((node) => node.type === 'inlineCode')) return inline(cell);
  return plain(cell).trim();
}

/**
 * A cell that keeps its own formatting.
 *
 * Defaults are mostly code spans (`false`, `'default'`) but some are prose
 * ("theme color", "Search icon"). Storing the Markdown as authored lets both
 * renderers emit it verbatim, so a prose default does not acquire backticks it
 * never had.
 */
function cellMarkdown(cell) {
  if (!cell) return '';
  const bare = plain(cell).trim();
  if (!bare || bare === '-') return '';

  const kids = (cell.children ?? []).filter(
    (node) => !(node.type === 'text' && !node.value.trim())
  );
  // Prose-only: return it as text, never through the escaping serialiser.
  if (!kids.some((node) => node.type === 'inlineCode')) return bare;
  // Otherwise keep the backticks exactly where the author put them.
  return inline(cell);
}

/**
 * Top-level `##` sections, as `{ heading, nodes, start, end }` byte ranges.
 * `end` is the offset where the next `##` begins, so a splice replaces the
 * whole section including its trailing blank line.
 */
function sections(tree, source) {
  const out = [];
  let current = null;

  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth === 2) {
      if (current) current.end = node.position.start.offset;
      current = {
        title: plain(node).trim(),
        nodes: [],
        start: node.position.start.offset,
        bodyStart: node.position.end.offset,
        end: source.length,
      };
      out.push(current);
      continue;
    }
    if (current) current.nodes.push(node);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

/** Maps a table's header row onto the fields we want, by header text. */
function columns(header) {
  const map = {};
  header.children.forEach((cell, i) => {
    const label = plain(cell).trim().toLowerCase();
    if (label === 'prop' || label === 'property' || label === 'name') {
      map.name = i;
    } else if (label === 'type') map.type = i;
    else if (label === 'default') map.default = i;
    else if (label === 'required') map.required = i;
    else if (label === 'description') map.description = i;
    else map.unknown = (map.unknown ?? []).concat(label);
  });
  return map;
}

function propsFromTable(table, problems, where) {
  const [header, ...rows] = table.children;
  const cols = columns(header);

  if (cols.name === undefined || cols.type === undefined) {
    problems.push(`${where}: table has no Prop/Type columns — left in place`);
    return null;
  }
  // A column we cannot model would be silently dropped by the rewrite.
  if (cols.unknown) {
    problems.push(
      `${where}: table has an unmodelled "${cols.unknown.join('", "')}" column — left in place`
    );
    return null;
  }

  const props = [];
  for (const row of rows) {
    const at = (i) => (i === undefined ? undefined : row.children[i]);
    const name = cellText(at(cols.name));
    if (!name) continue;

    const def = cellMarkdown(at(cols.default));
    const required = cellText(at(cols.required)).toLowerCase();

    props.push({
      name,
      type: cellText(at(cols.type)),
      ...(def ? { default: def } : {}),
      ...(cols.required !== undefined
        ? { required: required === 'yes' || required === 'true' }
        : {}),
      // Descriptions keep their Markdown: several carry inline code.
      description: inline(at(cols.description)),
    });
  }
  return props;
}

/** `- \`'default'\` - Primary button with solid background` */
function variantsFromList(list) {
  const out = [];
  for (const item of list.children) {
    const text = inline(item.children[0]).trim();
    const match = /^`?'?([\w-]+)'?`?\s*[-–—:]\s*(.*)$/s.exec(text);
    if (match) {
      out.push({ value: match[1], description: match[2].trim() });
    } else {
      const bare = /^`?'?([\w-]+)'?`?$/.exec(text);
      if (bare) out.push({ value: bare[1] });
      else return null;
    }
  }
  return out.length ? out : null;
}

function extractApiReference(section, problems, where) {
  const types = [];
  const variants = [];
  let current = null;
  // Any single unrecognised block disqualifies the whole section: the rewrite
  // replaces the section wholesale, so migrating it partially would delete
  // whatever was not understood.
  let unmigrated = false;

  const flush = () => {
    if (!current) return;
    if (current.props?.length) {
      types.push({
        name: current.name,
        ...(current.description ? { description: current.description } : {}),
        props: current.props,
      });
    } else if (current.variants) {
      variants.push({
        name: current.name,
        ...(current.description ? { description: current.description } : {}),
        values: current.variants,
      });
    } else {
      problems.push(
        `${where}: "### ${current.name}" has neither a table nor a value list — left in place`
      );
      unmigrated = true;
    }
    current = null;
  };

  for (const node of section.nodes) {
    if (node.type === 'heading' && node.depth === 3) {
      flush();
      current = { name: plain(node).trim() };
      continue;
    }
    if (!current) {
      // Prose between `## API Reference` and the first `###` — always absent
      // in this corpus, so anything here means the page is shaped differently.
      if (plain(node).trim()) {
        problems.push(
          `${where}: content before the first "###" — left in place`
        );
        unmigrated = true;
      }
      continue;
    }
    if (node.type === 'table') {
      const props = propsFromTable(
        node,
        problems,
        `${where} ### ${current.name}`
      );
      if (props) current.props = props;
      else unmigrated = true;
      continue;
    }
    if (node.type === 'list') {
      const values = variantsFromList(node);
      if (values) current.variants = values;
      else {
        problems.push(
          `${where}: "### ${current.name}" list is not a value enumeration — left in place`
        );
        unmigrated = true;
      }
      continue;
    }
    if (node.type === 'paragraph') {
      current.description = [current.description, inline(node).trim()]
        .filter(Boolean)
        .join(' ');
      continue;
    }
    problems.push(
      `${where}: "### ${current.name}" contains a ${node.type} — left in place`
    );
    unmigrated = true;
  }
  flush();

  if (unmigrated) return null;
  if (!types.length && !variants.length) return null;

  return {
    ...(types.length ? { types } : {}),
    ...(variants.length ? { variants } : {}),
  };
}

/**
 * `## Usage` — only when the section is exactly an import fence and an example.
 *
 * The node count is checked, not just the fence count: several pages structure
 * Usage as `### Basic Setup` / `### With Expo Router` around two fences, and
 * matching on fences alone would let the rewrite delete those headings.
 */
function extractUsage(section) {
  const nodes = section.nodes;
  if (nodes.length !== 2) return null;
  if (nodes[0].type !== 'code' || nodes[1].type !== 'code') return null;
  if (!/^\s*import\b/.test(nodes[0].value)) return null;
  return { import: nodes[0].value.trim(), snippet: nodes[1].value.trim() };
}

/** `## Accessibility` — only when it is exactly a lead paragraph and a list. */
function extractAccessibility(section) {
  const nodes = section.nodes;
  if (nodes.length !== 2) return null;
  if (nodes[0].type !== 'paragraph' || nodes[1].type !== 'list') return null;

  return {
    summary: inline(nodes[0]).trim(),
    items: nodes[1].children.map((item) => inline(item.children[0]).trim()),
  };
}

// ---------------------------------------------------------------------------
// Emission
// ---------------------------------------------------------------------------

function toModule(meta, depth) {
  const identifier =
    meta.name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()) + 'Meta';
  // `meta/button.ts` is one level down, `meta/charts/line-chart.ts` two.
  const schema = `${'../'.repeat(depth)}schema.js`;

  return [
    '// Documentation metadata. Rendered by <ApiReference> on the docs page and',
    '// served as structured data at /r/ai/<name>.json.',
    `import type { ComponentMeta } from '${schema}';`,
    '',
    `export const ${identifier}: ComponentMeta = ${JSON.stringify(meta, null, 2)};`,
    '',
  ].join('\n');
}

/** Applies byte-range replacements right-to-left so earlier offsets hold. */
function splice(source, edits) {
  let out = source;
  for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
    out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
  }
  return out;
}

// ---------------------------------------------------------------------------

async function main() {
  const index = JSON.parse(await fs.readFile(INDEX, 'utf8'));
  const entries = new Set(index.items.map((item) => item.name));

  const problems = [];
  const written = [];
  const stats = { pages: 0, api: 0, usage: 0, a11y: 0 };
  const apiSkipped = [];

  for (const dir of SECTIONS) {
    const base = path.join(CONTENT, dir);
    let files;
    try {
      files = await fs.readdir(base);
    } catch {
      continue;
    }

    for (const file of files.sort()) {
      if (!file.endsWith('.mdx') || file === 'index.mdx') continue;

      const name = file.replace(/\.mdx$/, '');
      const where = `${dir}/${file}`;

      if (!entries.has(name)) {
        problems.push(`${where}: no registry entry named "${name}" — skipped`);
        continue;
      }

      const full = path.join(base, file);
      const source = await fs.readFile(full, 'utf8');
      const offset = FRONTMATTER.exec(source)?.[0].length ?? 0;
      const body = source.slice(offset);
      const tree = processor.parse(body);

      stats.pages += 1;
      const meta = { name };
      const edits = [];

      for (const section of sections(tree, body)) {
        if (section.title === 'API Reference') {
          const api = extractApiReference(section, problems, where);
          if (!api) {
            apiSkipped.push(where);
            continue;
          }
          stats.api += 1;
          Object.assign(meta, api);
          edits.push({
            start: offset + section.bodyStart,
            end: offset + section.end,
            text: `\n\n<ApiReference name='${name}' />\n\n`,
          });
        } else if (section.title === 'Usage') {
          const usage = extractUsage(section);
          if (!usage) continue;
          stats.usage += 1;
          meta.usage = usage;
          edits.push({
            start: offset + section.bodyStart,
            end: offset + section.end,
            text: `\n\n<Usage name='${name}' />\n\n`,
          });
        } else if (section.title === 'Accessibility') {
          const a11y = extractAccessibility(section);
          if (!a11y) continue;
          stats.a11y += 1;
          meta.accessibility = a11y;
          edits.push({
            start: offset + section.bodyStart,
            end: offset + section.end,
            text: `\n\n<Accessibility name='${name}' />\n\n`,
          });
        }
      }

      if (Object.keys(meta).length === 1) {
        problems.push(`${where}: nothing migrated`);
        continue;
      }

      const nested = dir === 'components' ? '' : dir;
      const target = path.join(META, nested, `${name}.ts`);
      written.push(path.relative(REGISTRY, target));

      if (WRITE) {
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, toModule(meta, nested ? 2 : 1));
        await fs.writeFile(full, splice(source, edits));
      }
    }
  }

  const verb = WRITE ? 'wrote' : 'would write';
  console.log(`${verb} ${written.length} meta files from ${stats.pages} pages`);
  console.log(`  API Reference  ${stats.api}/${stats.pages}`);
  console.log(`  Usage          ${stats.usage}/${stats.pages}`);
  console.log(`  Accessibility  ${stats.a11y}/${stats.pages}`);

  if (apiSkipped.length) {
    console.log(
      `\nAPI Reference left as hand-written MDX on ${apiSkipped.length} pages ` +
        `(method/event tables, inline type literals, nested headings):`
    );
    for (const page of apiSkipped) console.log(`  • ${page}`);
  }
  if (process.argv.includes('--verbose')) {
    console.log(`\n${problems.length} reasons:`);
    for (const problem of problems) console.log(`  • ${problem}`);
  }
  if (!WRITE) console.log('\nRe-run with --write to apply.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
