/**
 * Materialises each starter scaffold into `dist/`.
 *
 * The components, hooks and theme files a starter ships are pulled from
 * @bna-ui/registry rather than checked in, so they cannot drift from what
 * `bna-ui add` installs. `start-convex` is built as `start` plus an overlay,
 * which removes the second full copy of the shared app shell.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { overlays, starters } from '../starters.config.mjs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

const REGISTRY_ROOT = path.dirname(
  require.resolve('@bna-ui/registry/package.json')
);

async function loadRegistry() {
  const { REGISTRY, resolveAllDependencies } = await import(
    path.join(REGISTRY_ROOT, 'dist', 'index.js')
  );
  return { REGISTRY, resolveAllDependencies };
}

/**
 * Finder droppings. Silently excluded rather than reported, because macOS
 * recreates one every time anyone so much as opens `packages/starters/` — a
 * build that failed on it would fail for reasons the maintainer did not cause
 * and cannot durably fix. A `.DS_Store` also records the *device's* view of a
 * folder, so it is never something to hand to a user.
 *
 * The CLI's own copy skips it too (SKIP_SEGMENTS in filesystem.ts), so this is
 * belt and braces: dropping it here keeps it out of the published tarball, and
 * the skip list keeps it out of scaffolds made from a local checkout.
 */
const NEVER_COPY = new Set(['.DS_Store']);

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  await fs.cp(src, dest, {
    recursive: true,
    filter: (from) => !NEVER_COPY.has(path.basename(from)),
  });
}

/**
 * Names npm deletes from a tarball, at any depth and without warning, that a
 * scaffold nonetheless needs.
 *
 * A starter carrying one of these publishes fine and then arrives at the user
 * missing the file — which is exactly how every scaffolded project once shipped
 * with no `.gitignore`. The CLI restores each from a dot-less name via
 * RENAME_ON_SCAFFOLD, so the fix is always "rename it", which is why this is a
 * hard failure and `.DS_Store` above is not.
 */
const STRIPPED_BY_NPM = new Set(['.gitignore', '.npmrc', '.npmignore']);

/** Every other dotfile survives npm and is copied verbatim — see filesystem.ts. */
async function assertPublishable(dir, name) {
  const offenders = [];

  const walk = async (current) => {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (STRIPPED_BY_NPM.has(entry.name)) {
        offenders.push(path.relative(dir, full));
      }
      if (entry.isDirectory()) await walk(full);
    }
  };
  await walk(dir);

  if (offenders.length) {
    throw new Error(
      `starter "${name}" ships ${offenders.length} file(s) npm strips from the ` +
        `tarball, so users would never receive them:\n` +
        offenders.map((f) => `    ${f}`).join('\n') +
        `\n  Store them dot-less (\`gitignore\`, \`npmrc\`, \`npmignore\`) — the ` +
        `CLI restores the leading dot on scaffold. Top-level only; see ` +
        `RENAME_ON_SCAFFOLD.`
    );
  }
}

/**
 * Writes the registry entries a scaffold asks for into `out`.
 *
 * Each entry is expanded to its full closure and written to the target path the
 * registry declares — the same targets `bna-ui add` uses. Shared with
 * `buildOverlay` so an overlay can pull components the base does not have,
 * rather than checking a second copy of them in.
 */
async function materialize(name, out, config, registry) {
  const { REGISTRY, resolveAllDependencies } = registry;

  const wanted = new Set();
  for (const entry of [
    ...(config.components ?? []),
    ...(config.hooks ?? []),
    ...(config.providers ?? []),
    ...(config.theme ?? []),
  ]) {
    if (!REGISTRY[entry]) {
      throw new Error(
        `starter "${name}" wants "${entry}", which is not in the registry`
      );
    }
    for (const dep of resolveAllDependencies(entry)) {
      wanted.add(dep);
      for (const h of REGISTRY[dep].hooks ?? []) wanted.add(h);
      for (const p of REGISTRY[dep].providers ?? []) wanted.add(p);
      for (const t of REGISTRY[dep].theme ?? []) wanted.add(t);
    }
  }

  let written = 0;
  for (const entry of wanted) {
    for (const file of REGISTRY[entry].files) {
      const source = await fs.readFile(
        path.join(REGISTRY_ROOT, file.path),
        'utf8'
      );
      const dest = path.join(out, file.target);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, source);
      written++;
    }
  }

  return { entries: wanted.size, written };
}

async function buildStarter(name, config, registry) {
  const out = path.join(DIST, name);

  await fs.rm(out, { recursive: true, force: true });
  await copyDir(path.join(ROOT, name), out);

  return materialize(name, out, config, registry);
}

async function buildOverlay(name, config, registry) {
  const { base, overlay } = config;
  const out = path.join(DIST, name);

  await fs.rm(out, { recursive: true, force: true });
  await copyDir(path.join(DIST, base), out);

  // Extra registry entries land before the overlay copy, so an overlay file can
  // still override one of them.
  const { entries } = await materialize(name, out, config, registry);

  await fs.cp(path.join(ROOT, overlay), out, {
    recursive: true,
    force: true,
    filter: (from) => !NEVER_COPY.has(path.basename(from)),
  });

  const count = async (dir) => {
    let n = 0;
    for (const e of await fs.readdir(dir, { withFileTypes: true })) {
      n += e.isDirectory() ? await count(path.join(dir, e.name)) : 1;
    }
    return n;
  };
  return { files: await count(out), entries };
}

async function main() {
  const registry = await loadRegistry();

  for (const [name, config] of Object.entries(starters)) {
    const { entries, written } = await buildStarter(name, config, registry);
    await assertPublishable(path.join(DIST, name), name);
    console.log(
      `✔ starter "${name}": ${written} files from ${entries} registry entries`
    );
  }

  for (const [name, config] of Object.entries(overlays)) {
    const { files, entries } = await buildOverlay(name, config, registry);
    await assertPublishable(path.join(DIST, name), name);
    console.log(
      `✔ starter "${name}": ${files} files (${config.base} + overlay` +
        `${entries ? ` + ${entries} registry entries` : ''})`
    );
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
