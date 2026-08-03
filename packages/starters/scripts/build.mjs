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

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  await fs.cp(src, dest, { recursive: true });
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

  await fs.cp(path.join(ROOT, overlay), out, { recursive: true, force: true });

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
    console.log(
      `✔ starter "${name}": ${written} files from ${entries} registry entries`
    );
  }

  for (const [name, config] of Object.entries(overlays)) {
    const { files, entries } = await buildOverlay(name, config, registry);
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
