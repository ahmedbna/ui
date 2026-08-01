/**
 * Fails the build when the machine-readable docs are wrong.
 *
 * These artifacts have no visual output, so nothing about the site looking fine
 * says they are correct. An MDX component nobody wrote a handler for silently
 * drops its subtree; a renamed registry entry silently empties a code block. The
 * only thing that notices is a model reading `.md` a week later.
 *
 * Runs after `next build`, over the prerendered bodies in `.next/server/app`,
 * so it checks exactly what gets deployed rather than re-deriving it.
 *
 * Sibling of `check-mdx-references.mjs`, same shape: collect everything, print
 * it all, exit 1.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.join(import.meta.dirname, '..');
const APP = path.join(ROOT, '.next', 'server', 'app');
const CONTENT = path.join(ROOT, 'content', 'docs');

const INDEX = path.join(
  path.dirname(require.resolve('@bna-ui/registry/package.json')),
  'dist',
  'generated',
  'r',
  'index.json'
);

/** A page this small never got past its own header block. */
const MIN_BYTES = 400;

async function walk(dir, predicate) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, predicate)));
    else if (predicate(entry.name)) out.push(full);
  }
  return out;
}

/**
 * JSX left in the output — an MDX component with no handler.
 *
 * Component source is full of JSX, so only lines outside fenced code blocks
 * count. Capitalised tags only: a bare `<div>` in prose is HTML a Markdown
 * reader renders fine, an unresolved `<ComponentPreview>` is a hole.
 */
function leakedJsx(markdown) {
  const found = new Set();
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^\s*<\/?([A-Z][A-Za-z0-9]*)/.exec(line);
    if (match) found.add(match[1]);
  }

  return [...found];
}

async function main() {
  const errors = [];

  let index;
  try {
    index = JSON.parse(await fs.readFile(INDEX, 'utf8'));
  } catch {
    console.error(`✖ registry index not found at ${INDEX}`);
    process.exit(1);
  }
  const entries = new Map(index.items.map((item) => [item.name, item]));

  // --- every page produced a Markdown build -------------------------------
  const pages = await walk(CONTENT, (name) => name.endsWith('.mdx'));
  const bodies = [
    ...(await walk(path.join(APP, 'llms'), (name) => name.endsWith('.body'))),
    path.join(APP, 'llms.body'),
  ];

  if (bodies.length !== pages.length) {
    errors.push(
      `${pages.length} MDX pages but ${bodies.length} Markdown builds — ` +
        `the .md route and the docs route disagree about what exists`
    );
  }

  // --- each build is complete and clean -----------------------------------
  for (const file of bodies) {
    const rel = path.relative(APP, file);
    let markdown;
    try {
      markdown = await fs.readFile(file, 'utf8');
    } catch {
      errors.push(`${rel}: missing`);
      continue;
    }

    if (markdown.length < MIN_BYTES) {
      errors.push(
        `${rel}: only ${markdown.length} bytes — body did not render`
      );
    }

    const leaked = leakedJsx(markdown);
    if (leaked.length) {
      errors.push(
        `${rel}: unhandled MDX component${leaked.length > 1 ? 's' : ''} ` +
          `<${leaked.join('>, <')}> — add a handler in lib/llm/jsx-handlers.ts`
      );
    }
  }

  // --- a component page carries its component's source --------------------
  // The whole point of the Markdown build: `<ComponentPreview>` and
  // `<ComponentSource>` expand to real code rather than to nothing.
  for (const section of ['components', 'charts', 'hooks', 'theme']) {
    const dir = path.join(APP, 'llms', section);
    let files;
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }

    for (const file of files.filter((name) => name.endsWith('.body'))) {
      const name = file.replace(/\.body$/, '');
      const entry = entries.get(name);
      if (!entry) continue;

      const markdown = await fs.readFile(path.join(dir, file), 'utf8');
      for (const { target } of entry.files) {
        if (!markdown.includes(`// ${target}`)) {
          errors.push(
            `llms/${section}/${file}: does not contain the source of ` +
              `${target} — its <ComponentSource> did not resolve`
          );
        }
      }
    }
  }

  // Documentation URLs, as the docs route serves them.
  const pageUrls = new Set(
    pages.map((file) => {
      const rel = path
        .relative(CONTENT, file)
        .replace(/\.mdx$/, '')
        .split(path.sep)
        .filter((part) => !/^\(.*\)$/.test(part))
        .join('/')
        .replace(/(^|\/)index$/, '');
      return `/docs${rel ? `/${rel}` : ''}`;
    })
  );
  const known = (url) =>
    pageUrls.has(new URL(url, 'https://x').pathname.replace(/\.md$/, ''));

  // --- AI bundles are complete --------------------------------------------
  // These are what an agent fetches instead of scraping the docs, so a bundle
  // that lost its source or its examples is a silent regression.
  const aiDir = path.join(ROOT, 'public', 'r', 'ai');
  let bundles = [];
  try {
    bundles = (await fs.readdir(aiDir)).filter(
      (name) => name.endsWith('.json') && name !== 'index.json'
    );
  } catch {
    errors.push(
      'public/r/ai is missing — the registry did not emit AI bundles'
    );
  }

  for (const file of bundles) {
    const bundle = JSON.parse(
      await fs.readFile(path.join(aiDir, file), 'utf8')
    );
    const where = `r/ai/${file}`;

    if (!bundle.files?.length || bundle.files.some((f) => !f.content)) {
      errors.push(`${where}: no source`);
    }
    if (!bundle.description) errors.push(`${where}: no description`);
    if (!bundle.install?.cli) errors.push(`${where}: no install command`);
    if (bundle.docs && !known(bundle.docs)) {
      errors.push(`${where}: docs URL ${bundle.docs} is not a page`);
    }
  }

  // --- llms.txt points at pages that exist --------------------------------
  const llms = await fs.readFile(path.join(APP, 'llms.txt.body'), 'utf8');
  const urls = [...llms.matchAll(/\]\((https?:\/\/[^)]*\/docs[^)]*)\)/g)].map(
    (match) => match[1]
  );

  for (const url of new Set(urls)) {
    if (!known(url)) {
      errors.push(`llms.txt: links to ${url}, which is not a page`);
    }
  }

  if (errors.length) {
    console.error(`\n✖ AI documentation artifacts (${errors.length}):\n`);
    for (const error of errors) console.error(`  • ${error}`);
    console.error('');
    process.exit(1);
  }

  console.log(
    `✔ ai artifacts: ${bodies.length} Markdown pages, llms.txt, llms-full.txt`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
