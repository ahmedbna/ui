import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { runScaffold } from '../src/scaffold/index.js';
import { patchSupabaseConfigText } from '../src/scaffold/patches.js';
import type { ScaffoldConfig, ScaffoldOptions } from '../src/scaffold/types.js';
import { authRequested } from '../src/scaffold/types.js';

/**
 * Drives the real pipeline against a fixture template in a temp directory.
 *
 * Passing a name argument with `--skip-install` is a zero-prompt, zero-network,
 * zero-subprocess path, which is the same path CI's e2e job takes — but this
 * asserts on the resulting files rather than on a shell `test -f`.
 */

let workdir: string;
let templates: string;
let cwd: string;

const baseConfig: ScaffoldConfig<ScaffoldOptions> = {
  defaultProjectName: 'bna-app',
  title: () => 'Test scaffold',
  template: () => 'start',
  nextSteps: (ctx) => ({
    headline: `Created ${ctx.projectName}`,
    signOff: 'done',
  }),
};

beforeEach(async () => {
  cwd = process.cwd();
  workdir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-scaffold-'));

  // A minimal stand-in for a real starter: package.json, app.json, the dot-less
  // files npm refuses to publish, a nested file to prove the tree is copied
  // whole, and the two shapes the skip list has to tell apart — a real
  // `node_modules/`, and paths that merely *contain* a skipped word.
  templates = path.join(workdir, 'templates');
  const start = path.join(templates, 'start');
  await fs.mkdir(path.join(start, 'app', '(tabs)'), { recursive: true });
  await fs.mkdir(path.join(start, 'components'), { recursive: true });
  await fs.mkdir(path.join(start, 'node_modules', 'left-pad'), {
    recursive: true,
  });
  await fs.mkdir(path.join(start, 'github', 'workflows'), { recursive: true });
  await fs.writeFile(
    path.join(start, 'package.json'),
    JSON.stringify({ name: 'bna', version: '1.0.0' }, null, 2)
  );
  await fs.writeFile(
    path.join(start, 'app.json'),
    JSON.stringify(
      { expo: { name: 'bna', slug: 'bna', scheme: 'bna' } },
      null,
      2
    )
  );
  // Ordinary dotfiles npm publishes untouched: they must arrive as-is, at the
  // root and nested. `.DS_Store` is the one dotfile that must not.
  await fs.mkdir(path.join(start, '.vscode'), { recursive: true });
  await fs.writeFile(path.join(start, '.vscode', 'settings.json'), '{}\n');
  await fs.writeFile(path.join(start, '.watchmanconfig'), '{}\n');
  await fs.writeFile(path.join(start, '.DS_Store'), 'finder junk\n');
  await fs.writeFile(
    path.join(start, 'app', '.DS_Store'),
    'nested finder junk\n'
  );

  await fs.writeFile(path.join(start, 'gitignore'), 'node_modules\n');
  await fs.writeFile(path.join(start, 'npmrc'), 'node-linker=hoisted\n');
  await fs.writeFile(path.join(start, 'npmignore'), '*.log\n');
  await fs.writeFile(
    path.join(start, '.yarnrc.yml'),
    'nodeLinker: node-modules\n'
  );
  await fs.writeFile(
    path.join(start, 'pnpm-workspace.yaml'),
    'nodeLinker: hoisted\n'
  );
  await fs.writeFile(path.join(start, 'env.example'), 'API_URL=\n');
  await fs.writeFile(
    path.join(start, 'github', 'workflows', 'ci.yml'),
    'name: CI\n'
  );
  await fs.writeFile(
    path.join(start, 'app', '_layout.tsx'),
    'export default null;\n'
  );
  await fs.writeFile(
    path.join(start, 'app', '(tabs)', 'dashboard.tsx'),
    'export default null;\n'
  );
  await fs.writeFile(
    path.join(start, 'components', 'rebuild.tsx'),
    'export default null;\n'
  );
  await fs.writeFile(
    path.join(start, 'node_modules', 'left-pad', 'index.js'),
    'module.exports = null;\n'
  );

  vi.stubEnv('BNA_UI_TEMPLATES', templates);
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  process.chdir(workdir);
});

afterEach(async () => {
  process.chdir(cwd);
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  await fs.rm(workdir, { recursive: true, force: true });
});

const readJson = async (p: string) => JSON.parse(await fs.readFile(p, 'utf8'));

describe('runScaffold', () => {
  it('creates the project and stamps its identity', async () => {
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });

    const projectPath = path.join(workdir, 'my-app');
    expect(
      await readJson(path.join(projectPath, 'package.json'))
    ).toMatchObject({
      name: 'my-app',
    });
    expect((await readJson(path.join(projectPath, 'app.json'))).expo).toEqual({
      name: 'my-app',
      slug: 'my-app',
      // The deep link OAuth returns to; the success message tells users to
      // allow-list exactly this.
      scheme: 'my-app',
    });
  });

  it('restores dot-less files npm refuses to publish', async () => {
    // npm deletes .gitignore, .npmrc and .npmignore from a tarball, so starters
    // ship them dot-less. Every scaffolded project having no .gitignore was a
    // real shipped bug — these three must arrive dotted, and the dot-less
    // original must not be left lying beside them.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    const projectPath = path.join(workdir, 'my-app');

    for (const [dotless, dotted] of [
      ['gitignore', '.gitignore'],
      ['npmrc', '.npmrc'],
      ['npmignore', '.npmignore'],
    ]) {
      await expect(
        fs.access(path.join(projectPath, dotted))
      ).resolves.toBeUndefined();
      await expect(
        fs.access(path.join(projectPath, dotless))
      ).rejects.toThrow();
    }

    expect(
      await fs.readFile(path.join(projectPath, '.gitignore'), 'utf8')
    ).toContain('node_modules');
  });

  it('copies ordinary dotfiles, at the root and nested', async () => {
    // Only the names in SKIP_SEGMENTS are dropped. A starter is free to ship
    // `.vscode/` or `.watchmanconfig`, and npm publishes both untouched — it
    // strips only .gitignore, .npmrc, .npmignore and .DS_Store.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    const projectPath = path.join(workdir, 'my-app');

    expect(
      await fs.readFile(path.join(projectPath, '.watchmanconfig'), 'utf8')
    ).toBe('{}\n');
    expect(
      await fs.readFile(
        path.join(projectPath, '.vscode', 'settings.json'),
        'utf8'
      )
    ).toBe('{}\n');
  });

  it('never copies .DS_Store', async () => {
    // The CLI is run straight from a checkout by CI and by the registry testing
    // flow, where npm's tarball stripping is not there to save us.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    const projectPath = path.join(workdir, 'my-app');

    await expect(
      fs.access(path.join(projectPath, '.DS_Store'))
    ).rejects.toThrow();
    await expect(
      fs.access(path.join(projectPath, 'app', '.DS_Store'))
    ).rejects.toThrow();
  });

  it('gives yarn 2+ a node_modules install, not Plug n Play', async () => {
    // Yarn 2+ defaults to PnP: a .pnp.cjs resolver and no node_modules at all.
    // Metro reads node_modules off disk and has no PnP resolver, so a PnP
    // project cannot bundle.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    expect(
      await fs.readFile(path.join(workdir, 'my-app', '.yarnrc.yml'), 'utf8')
    ).toContain('nodeLinker: node-modules');
  });

  it('carries pnpm onto the hoisted linker', async () => {
    // Expo needs a flat node_modules; pnpm's default isolated layout leaves
    // `expo start` unable to resolve metro-runtime's empty module. Both files
    // ship because pnpm 11 reads only the YAML and pnpm 10.15 only the .npmrc,
    // and the .npmrc has to survive the dot-less rename to be read at all.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    const projectPath = path.join(workdir, 'my-app');

    expect(
      await fs.readFile(path.join(projectPath, '.npmrc'), 'utf8')
    ).toContain('node-linker=hoisted');
    expect(
      await fs.readFile(path.join(projectPath, 'pnpm-workspace.yaml'), 'utf8')
    ).toContain('nodeLinker: hoisted');
  });

  it('copies nested files', async () => {
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    await expect(
      fs.access(path.join(workdir, 'my-app', 'app', '_layout.tsx'))
    ).resolves.toBeUndefined();
  });

  it('renames a dot-less directory, not just dot-less files', async () => {
    // Only `gitignore` was covered, and it is a file. `github` -> `.github` is
    // a directory rename, and the only command that exercises it in CI is
    // `bna-ui supabase`.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });

    const projectPath = path.join(workdir, 'my-app');
    expect(
      await fs.readFile(
        path.join(projectPath, '.github', 'workflows', 'ci.yml'),
        'utf8'
      )
    ).toContain('name: CI');
    expect(
      await fs.readFile(path.join(projectPath, '.env.example'), 'utf8')
    ).toContain('API_URL=');
    await expect(fs.access(path.join(projectPath, 'github'))).rejects.toThrow();
    await expect(
      fs.access(path.join(projectPath, 'env.example'))
    ).rejects.toThrow();
  });

  it('drops build artefacts and VCS internals', async () => {
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });
    await expect(
      fs.access(path.join(workdir, 'my-app', 'node_modules'))
    ).rejects.toThrow();
  });

  it('keeps paths that merely contain a skipped word', async () => {
    // The skip list is matched per path segment. Matched as a substring — as it
    // was once — `components/rebuild.tsx` hits `build` and `app/(tabs)/` is
    // fine, but any future `.../dist-tags/` style path would vanish silently.
    await runScaffold(baseConfig, 'my-app', { skipInstall: true });

    const projectPath = path.join(workdir, 'my-app');
    await expect(
      fs.access(path.join(projectPath, 'components', 'rebuild.tsx'))
    ).resolves.toBeUndefined();
    await expect(
      fs.access(path.join(projectPath, 'app', '(tabs)', 'dashboard.tsx'))
    ).resolves.toBeUndefined();
  });

  it('sanitizes an unruly project name', async () => {
    await runScaffold(baseConfig, 'My Cool App', { skipInstall: true });
    expect(
      await readJson(path.join(workdir, 'my-cool-app', 'package.json'))
    ).toMatchObject({
      name: 'my-cool-app',
    });
  });

  it('refuses to overwrite an existing directory', async () => {
    await fs.mkdir(path.join(workdir, 'taken'));
    await expect(
      runScaffold(baseConfig, 'taken', { skipInstall: true })
    ).rejects.toThrow(/already exists/i);
  });

  it('runs patches after the copy and after identity is stamped', async () => {
    const seen: Array<{ name: string; scheme: string }> = [];
    await runScaffold(
      {
        ...baseConfig,
        patches: [
          async (ctx) => {
            const app = await readJson(path.join(ctx.projectPath, 'app.json'));
            seen.push({ name: ctx.projectName, scheme: app.expo.scheme });
          },
        ],
      },
      'patched',
      { skipInstall: true }
    );
    // If patches ran before setAppIdentity this would still read 'bna'.
    expect(seen).toEqual([{ name: 'patched', scheme: 'patched' }]);
  });

  it('skips the backend step when `when` returns false', async () => {
    const run = vi.fn().mockResolvedValue(undefined);
    await runScaffold(
      { ...baseConfig, backend: { name: 'test', when: () => false, run } },
      'my-app',
      { skipInstall: true }
    );
    expect(run).not.toHaveBeenCalled();
  });

  it('feeds the backend result to the next-steps renderer', async () => {
    const nextSteps = vi.fn().mockReturnValue({ headline: 'x', signOff: 'y' });
    await runScaffold(
      {
        ...baseConfig,
        backend: { name: 'test', run: async () => ({ token: 'abc' }) },
        nextSteps,
      },
      'my-app',
      { skipInstall: true }
    );
    expect(nextSteps.mock.calls[0]?.[1]).toEqual({ token: 'abc' });
  });

  it('selects the template from the options', async () => {
    await fs.cp(
      path.join(templates, 'start'),
      path.join(templates, 'start-convex'),
      {
        recursive: true,
      }
    );
    await fs.writeFile(
      path.join(templates, 'start-convex', 'MARKER'),
      'convex\n'
    );

    await runScaffold(
      { ...baseConfig, template: () => 'start-convex' },
      'my-app',
      { skipInstall: true }
    );
    await expect(
      fs.access(path.join(workdir, 'my-app', 'MARKER'))
    ).resolves.toBeUndefined();
  });
});

describe('authRequested', () => {
  it('reads commander’s --no-auth negation', () => {
    expect(authRequested({})).toBe(true);
    expect(authRequested({ auth: true })).toBe(true);
    expect(authRequested({ auth: false })).toBe(false);
  });
});

describe('patchSupabaseConfigText', () => {
  it('rewrites the project id and every deep-link scheme', () => {
    const before = [
      'project_id = "bna"',
      '',
      '[auth]',
      'site_url = "bna://"',
      'additional_redirect_urls = ["bna://reset-password"]',
    ].join('\n');

    const after = patchSupabaseConfigText(before, 'my-app');
    expect(after).toContain('project_id = "my-app"');
    expect(after).toContain('site_url = "my-app://"');
    expect(after).toContain('"my-app://reset-password"');
    expect(after).not.toContain('bna');
  });

  it('leaves unrelated content alone', () => {
    const untouched = 'api_port = 54321\n# bnanana is not a scheme\n';
    expect(patchSupabaseConfigText(untouched, 'my-app')).toBe(untouched);
  });
});

describe('project name handling', () => {
  it('rejects a name with no usable characters', async () => {
    await expect(
      runScaffold(baseConfig, '!!!', { skipInstall: true })
    ).rejects.toThrow(/no usable characters/i);
  });

  it('flattens a traversal attempt into a plain directory name', async () => {
    await runScaffold(baseConfig, '../../etc', { skipInstall: true });
    // Sanitizing collapses the separators, so the project lands under cwd.
    await expect(
      fs.access(path.join(workdir, 'etc', 'package.json'))
    ).resolves.toBeUndefined();
  });
});
