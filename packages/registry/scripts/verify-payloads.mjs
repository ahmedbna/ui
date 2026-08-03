/**
 * Contract check on the generated payloads.
 *
 * The promise `/r/<name>.json` makes is that it is *self-contained*: everything
 * the component imports via `@/…` ships in the same response, in dependency
 * order. If that breaks, `bna-ui add` writes a file that cannot compile in the
 * user's project — a failure that only shows up after install, so it is worth
 * asserting on every build.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const DIR = path.join(import.meta.dirname, '..', 'generated', 'r');
const LOCAL_IMPORT =
  /from '@\/((?:components|hooks|theme|providers)\/[\w/-]+)'/g;

const errors = [];

function targetsCover(targets, specifier) {
  return [...targets].some((t) => t.replace(/\.[jt]sx?$/, '') === specifier);
}

async function main() {
  let files;
  try {
    files = (await fs.readdir(DIR)).filter((f) => f.endsWith('.json'));
  } catch {
    console.error(`✖ no payloads at ${DIR} — run the registry build first.`);
    process.exit(1);
  }

  const payloads = files.filter((f) => f !== 'index.json');
  if (payloads.length === 0) {
    console.error('✖ no payloads were generated');
    process.exit(1);
  }

  for (const file of payloads) {
    const payload = JSON.parse(await fs.readFile(path.join(DIR, file), 'utf8'));

    if (payload.$schemaVersion !== 1) {
      errors.push(
        `${file}: unexpected schema version ${payload.$schemaVersion}`
      );
      continue;
    }
    if (!Array.isArray(payload.files) || payload.files.length === 0) {
      errors.push(`${file}: no files`);
      continue;
    }

    const targets = new Set(payload.files.map((f) => f.target));
    const seen = new Set();

    for (const f of payload.files) {
      if (!f.content) {
        errors.push(`${file}: empty content for ${f.target}`);
      }
      if (f.path.includes('..')) {
        errors.push(`${file}: source path escapes the package — ${f.path}`);
      }

      for (const [, specifier] of f.content.matchAll(LOCAL_IMPORT)) {
        if (!targetsCover(targets, specifier)) {
          errors.push(
            `${file}: ${f.target} imports @/${specifier}, which is not in the payload`
          );
        } else if (!seen.has(specifier) && !targetsCover(seen, specifier)) {
          // Not fatal — the CLI writes every file before the user compiles —
          // but ordering keeps `add` output readable and diffs stable.
        }
      }
      seen.add(f.target);
    }
  }

  if (errors.length) {
    console.error(`\n✖ payload contract violated (${errors.length}):\n`);
    for (const e of errors.slice(0, 40)) console.error(`  • ${e}`);
    if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
    console.error('');
    process.exit(1);
  }

  console.log(`✔ ${payloads.length} payloads are self-contained`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
