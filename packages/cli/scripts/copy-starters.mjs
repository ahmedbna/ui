/**
 * Copies the `init` / `convex` scaffolds into `dist/templates/`.
 *
 * Components are fetched from the registry at runtime, but the starters stay
 * bundled: `init` is the first command a user runs, it must work before any
 * network trust is established, and most of its weight is binary assets that
 * would not benefit from being served as JSON.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const CLI_ROOT = path.resolve(import.meta.dirname, '..');
const STARTERS = path.resolve(CLI_ROOT, '..', 'starters', 'dist');
const DEST = path.join(CLI_ROOT, 'dist', 'templates');

async function dirSize(dir) {
  let total = 0;
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    total += entry.isDirectory()
      ? await dirSize(full)
      : (await fs.stat(full)).size;
  }
  return total;
}

async function main() {
  await fs.rm(DEST, { recursive: true, force: true });
  await fs.mkdir(DEST, { recursive: true });

  const names = ['start', 'start-convex', 'start-convex-auth'];

  for (const name of names) {
    const src = path.join(STARTERS, name);
    try {
      await fs.access(src);
    } catch {
      console.error(
        `✖ starter not found: ${src}\n` +
          `  Run \`pnpm --filter @bna-ui/starters build\` first.`
      );
      process.exit(1);
    }
    await fs.cp(src, path.join(DEST, name), { recursive: true });
  }

  const size = await dirSize(DEST);
  console.log(
    `✔ starters: ${names.join(', ')} → dist/templates/ ` +
      `(${(size / 1024 / 1024).toFixed(2)} MB)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
