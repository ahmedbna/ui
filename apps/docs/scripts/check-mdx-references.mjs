/**
 * Fails the build on an MDX block that points at something the registry does
 * not have.
 *
 * `<ComponentSource name='colors-theme' />` renders `null` when the entry does
 * not exist — a silently blank code block that looks like a styling bug, not a
 * broken reference. Two of those survived in the docs until this check existed.
 *
 * Runs as part of `pnpm build` in this app, after @bna-ui/registry has built.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const INDEX = path.join(
  path.dirname(require.resolve('@bna-ui/registry/package.json')),
  'dist',
  'generated',
  'r',
  'index.json'
);
const CONTENT = path.join(import.meta.dirname, '..', 'content');

/** Every `<ComponentSource …/>` and `<ComponentPreview …/>` in a document. */
const BLOCK = /<(ComponentSource|ComponentPreview)\b[^>]*?\/>/gs;
const attr = (block, key) =>
  new RegExp(`${key}=['"]([^'"]+)['"]`).exec(block)?.[1];

async function mdxFiles(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await mdxFiles(full)));
    else if (entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

async function main() {
  let index;
  try {
    index = JSON.parse(await fs.readFile(INDEX, 'utf8'));
  } catch {
    console.error(
      `✖ registry index not found at ${INDEX}\n` +
        `  Run \`pnpm --filter @bna-ui/registry build\` first.`
    );
    process.exit(1);
  }

  const entries = new Map(index.items.map((item) => [item.name, item]));
  const errors = [];
  const files = await mdxFiles(CONTENT);

  for (const file of files) {
    const source = await fs.readFile(file, 'utf8');
    const rel = path.relative(path.join(import.meta.dirname, '..'), file);

    for (const [block, tag] of source.matchAll(BLOCK)) {
      const name = attr(block, 'name');
      // `<ComponentSource src='…' />` reads straight off disk — nothing to check.
      if (!name) continue;

      const entry = entries.get(name);
      if (!entry) {
        errors.push(`${rel}: <${tag} name='${name}'> — no such registry entry`);
        continue;
      }

      const targets = entry.files.map((f) => f.target);
      for (const key of ['file', 'title']) {
        const value = attr(block, key);
        if (value && !targets.includes(value)) {
          errors.push(
            `${rel}: <${tag} name='${name}' ${key}='${value}'> — ` +
              `not a file of "${name}" (${targets.join(', ')})`
          );
        }
      }
    }
  }

  if (errors.length) {
    console.error(`\n✖ broken registry references (${errors.length}):\n`);
    for (const e of errors) console.error(`  • ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log(`✔ registry references: ${files.length} MDX files, all resolve`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
