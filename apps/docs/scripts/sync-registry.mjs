/**
 * Publishes the generated registry payloads as static files under `public/r/`,
 * and the Claude Skill under `public/skills/`.
 *
 * The payloads are what `bna-ui add <name>` fetches at runtime. Serving them as
 * static assets (rather than a route handler) keeps them on the CDN with no
 * function invocations, and makes `/r/button.json` cacheable and independently
 * inspectable.
 *
 * Runs as part of `pnpm build` in this app, after its dependencies have built.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// Resolve through the package so this keeps working regardless of where pnpm
// links the workspace dependency.
const PAYLOAD_DIR = path.join(
  path.dirname(require.resolve('@bna-ui/registry/package.json')),
  'dist',
  'generated',
  'r'
);
const DEST = path.join(import.meta.dirname, '..', 'public', 'r');

async function main() {
  try {
    await fs.access(PAYLOAD_DIR);
  } catch {
    console.error(
      `✖ registry payloads not found at ${PAYLOAD_DIR}\n` +
        `  Run \`pnpm --filter @bna-ui/registry build\` first.`
    );
    process.exit(1);
  }

  await fs.rm(DEST, { recursive: true, force: true });
  await fs.mkdir(DEST, { recursive: true });
  await fs.cp(PAYLOAD_DIR, DEST, { recursive: true });

  const files = await fs.readdir(DEST);
  let bytes = 0;
  for (const f of files) {
    bytes += (await fs.stat(path.join(DEST, f))).size;
  }

  console.log(
    `✔ registry endpoint: ${files.length} files → public/r/ ` +
      `(${(bytes / 1024 / 1024).toFixed(2)} MB)`
  );

  await syncSkill();
}

/** The downloadable Claude Skill, built by `@bna-ui/skill`. */
async function syncSkill() {
  const zip = path.join(
    path.dirname(require.resolve('@bna-ui/skill/package.json')),
    'dist',
    'bna-ui.zip'
  );

  try {
    await fs.access(zip);
  } catch {
    console.error(
      `✖ skill bundle not found at ${zip}\n` +
        `  Run \`pnpm --filter @bna-ui/skill build\` first.`
    );
    process.exit(1);
  }

  const dest = path.join(import.meta.dirname, '..', 'public', 'skills');
  await fs.mkdir(dest, { recursive: true });
  await fs.copyFile(zip, path.join(dest, 'bna-ui.zip'));

  const { size } = await fs.stat(zip);
  console.log(
    `✔ skill: public/skills/bna-ui.zip (${(size / 1024).toFixed(1)} KB)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
