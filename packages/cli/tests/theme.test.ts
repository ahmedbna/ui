import chalk from 'chalk';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BRAND_HEX,
  bannerLines,
  createSpinner,
  theme,
} from '../src/utils/theme.js';

/**
 * The brand colour has to survive four terminal capability tiers and a
 * non-UTF-8 locale. chalk does the colour downsampling, but nothing verifies it
 * stays wired up, and #FAD40B silently rendering as default-white on a 16-colour
 * terminal is exactly the kind of regression nobody notices locally.
 *
 * Note `FORCE_COLOR` is deliberately not used to drive these: `supports-color`
 * treats it as a floor, not a ceiling, so `FORCE_COLOR=1` still resolves to
 * level 3 in any terminal that advertises `COLORTERM=truecolor`.
 */
describe('brand colour degradation', () => {
  const original = chalk.level;
  afterEach(() => {
    chalk.level = original;
  });

  it('emits exact #FAD40B at truecolor', () => {
    chalk.level = 3;
    // 0xFA, 0xD4, 0x0B
    expect(theme.brand('x')).toContain('\u001b[38;2;250;212;11m');
    expect(BRAND_HEX).toBe('#FAD40B');
  });

  it('downsamples to the nearest xterm-256 colour at level 2', () => {
    chalk.level = 2;
    expect(theme.brand('x')).toContain('\u001b[38;5;220m');
  });

  it('downsamples to a 16-colour yellow at level 1', () => {
    chalk.level = 1;
    expect(theme.brand('x')).toContain('\u001b[93m');
  });

  it('emits no escape sequences at all when colour is off', () => {
    chalk.level = 0;
    expect(theme.brand('x')).toBe('x');
    expect(bannerLines().join('\n')).not.toContain('\u001b');
  });

  it('renders the banner fresh, so level changes after import still apply', () => {
    chalk.level = 3;
    expect(bannerLines().join('')).toContain('\u001b[38;2;250;212;11m');
    chalk.level = 0;
    expect(bannerLines().join('')).not.toContain('\u001b');
  });
});

describe('badge', () => {
  const original = chalk.level;
  afterEach(() => {
    chalk.level = original;
  });

  it('is black on a brand background when colour is available', () => {
    chalk.level = 3;
    const badge = theme.badge();
    expect(badge).toContain('\u001b[48;2;250;212;11m'); // brand background
    expect(badge).toContain('\u001b[30m'); // black foreground
    expect(badge).toContain(' BNA ');
  });

  it('falls back to brackets when a background fill would be invisible', () => {
    chalk.level = 0;
    expect(theme.badge()).toBe('[BNA]');
    expect(theme.badge('MCP')).toBe('[MCP]');
  });
});

describe('spinner', () => {
  const original = chalk.level;
  afterEach(() => {
    chalk.level = original;
  });

  it('pre-colours its own frames, since ora cannot express a hex', () => {
    chalk.level = 3;
    const spinner = createSpinner('working');
    const frames = (spinner.spinner as { frames: string[] }).frames;
    expect(frames[0]).toContain('\u001b[38;2;250;212;11m');
  });

  it('leaves ora colour unset so it does not repaint the frames', () => {
    // ora does `frame = chalk[this.color](frame)` when `color` is truthy, which
    // would overwrite the brand hex with a named ANSI colour.
    expect(createSpinner('working').color).toBeUndefined();
  });
});

describe('unicode fallback', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  async function loadWith(env: Record<string, string | undefined>) {
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) vi.stubEnv(key, '');
      else vi.stubEnv(key, value);
    }
    return import('../src/utils/theme.js');
  }

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses ASCII glyphs and a plain wordmark under a non-UTF-8 locale', async () => {
    const mod = await loadWith({ LC_ALL: 'C', LANG: 'C', LC_CTYPE: 'C' });
    expect(mod.theme.supportsUnicode).toBe(false);
    expect(mod.theme.glyph.success).toBe('+');
    expect(mod.theme.glyph.error).toBe('x');
    expect(mod.theme.glyph.warning).toBe('!');
    // Box-drawing art is noise without box-drawing support.
    expect(mod.bannerLines().join('')).not.toContain('█');
  });

  it('uses unicode glyphs under a UTF-8 locale', async () => {
    const mod = await loadWith({
      LC_ALL: 'en_US.UTF-8',
      LANG: 'en_US.UTF-8',
      LC_CTYPE: '',
    });
    expect(mod.theme.supportsUnicode).toBe(true);
    expect(mod.theme.glyph.success).toBe('✓');
  });
});
