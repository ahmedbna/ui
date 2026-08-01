/**
 * The CLI's visual identity, in one module.
 *
 * Nothing else in `src/` may import `chalk` or `ora` — an eslint
 * `no-restricted-imports` rule enforces that. Colour used to be chosen in
 * `logger.ts` *and*, invisibly, by eight bare `ora(...)` calls that inherited
 * ora's default cyan, so the brand was impossible to change in one place.
 *
 * ## Why the brand colour is not used for text
 *
 * #FAD40B measures roughly 1.4:1 against a white terminal background, far under
 * any legibility threshold, and a terminal never tells us which background it
 * is on. So the brand appears only as:
 *
 *   - large decorative ASCII art, where hue carries no information,
 *   - a `bgHex` chip with black text, which reads on light *and* dark,
 *   - short accent runs such as spinner frames.
 *
 * Headings use bold in the terminal's own foreground colour. This is the same
 * compromise Vite and Next make with their badges.
 */
import chalk from 'chalk';
import ora, { type Ora } from 'ora';

/** BNA brand yellow. The only colour literal in the CLI. */
export const BRAND_HEX = '#FAD40B';

export type Styler = (text: string) => string;

/**
 * True when the terminal can be trusted with box-drawing and symbol glyphs.
 *
 * chalk handles colour degradation on its own but knows nothing about glyph
 * coverage, and a Windows console without UTF-8 renders `✓` as mojibake, which
 * is worse than the ASCII it replaced.
 */
function detectUnicode(): boolean {
  if (process.platform !== 'win32') {
    const locale =
      process.env.LC_ALL ?? process.env.LC_CTYPE ?? process.env.LANG ?? '';
    // An unset locale on macOS/Linux still overwhelmingly means UTF-8.
    return locale === '' || /UTF-?8/i.test(locale);
  }

  return (
    Boolean(process.env.WT_SESSION) ||
    Boolean(process.env.ConEmuANSI) ||
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
  );
}

const unicode = detectUnicode();

const brand: Styler = (text) => chalk.hex(BRAND_HEX)(text);
const brandBold: Styler = (text) => chalk.hex(BRAND_HEX).bold(text);

/**
 * The wordmark chip: black on brand yellow.
 *
 * At colour level 0 the background is dropped entirely, which would leave the
 * label indistinguishable from surrounding text, so fall back to brackets.
 */
function badge(label = 'BNA'): string {
  if (chalk.level === 0) return `[${label}]`;
  return chalk.bgHex(BRAND_HEX).black.bold(` ${label} `);
}

export const theme = {
  brand,
  brandBold,
  badge,
  /** Section titles. Deliberately not brand-coloured — see the module comment. */
  heading: ((text) => chalk.bold(text)) as Styler,
  dim: ((text) => chalk.gray(text)) as Styler,
  /**
   * Commands and paths quoted inside prose. Bold rather than hued: cyan is the
   * colour this migration exists to remove, and every other hue in here already
   * carries a status meaning.
   */
  code: ((text) => chalk.bold(text)) as Styler,
  ok: ((text) => chalk.green(text)) as Styler,
  warn: ((text) => chalk.yellow(text)) as Styler,
  danger: ((text) => chalk.red(text)) as Styler,
  /**
   * Informational. Stays blue rather than becoming brand yellow: it sits
   * directly above `warn`'s yellow in most output, and two yellows adjacent
   * read as one.
   */
  note: ((text) => chalk.blue(text)) as Styler,

  glyph: {
    info: unicode ? 'ℹ' : 'i',
    success: unicode ? '✓' : '+',
    warning: unicode ? '⚠' : '!',
    error: unicode ? '✗' : 'x',
    debug: unicode ? '🐛' : '#',
    bullet: unicode ? '•' : '-',
  },

  /** chalk's resolved colour depth, 0-3. Exposed so callers branch, not guess. */
  get level(): 0 | 1 | 2 | 3 {
    return chalk.level;
  },

  get supportsUnicode(): boolean {
    return unicode;
  },
} as const;

/**
 * The BNA wordmark, rendered fresh on each call.
 *
 * Built as a function rather than a module constant so the ANSI escapes are not
 * baked in at import time — that matters for tests, which flip `chalk.level`
 * after the module graph has already loaded.
 */
export function bannerLines(): string[] {
  const art = [
    '██████╗ ███╗   ██╗ █████╗ ',
    '██╔══██╗████╗  ██║██╔══██╗',
    '██████╔╝██╔██╗ ██║███████║',
    '██╔══██╗██║╚██╗██║██╔══██║',
    '██████╔╝██║ ╚████║██║  ██║',
    '╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝',
  ];

  // The block art is drawn from box-drawing characters; without them it is
  // noise, so fall back to the plain wordmark.
  if (!unicode) return ['', brandBold('B N A'), ''];

  return [
    '',
    ...art.map(brand),
    '',
    theme.dim('Expo React Native CLI, UI Components Library'),
    '',
  ];
}

/**
 * Dots frames, pre-coloured with the brand hex.
 *
 * ora repaints every frame with `chalk[this.color](frame)` and its `color`
 * option accepts only the named ANSI colours, so a hex spinner is impossible
 * through that option. Passing `color: undefined` explicitly overrides ora's
 * own `'cyan'` default and leaves our escapes intact.
 *
 * The frames are inlined rather than imported from `cli-spinners`, which is
 * ora's transitive dependency and not one we declare.
 */
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const ASCII_FRAMES = ['-', '\\', '|', '/'];

export function createSpinner(text: string): Ora {
  return ora({
    text,
    color: undefined,
    spinner: unicode
      ? { interval: 80, frames: SPINNER_FRAMES.map(brand) }
      : { interval: 130, frames: ASCII_FRAMES.map(brand) },
  });
}

/**
 * Terminate a spinner with the same glyphs `logger` uses.
 *
 * `spinner.succeed()` reaches for `log-symbols`, whose `✔` is both a different
 * character and a different green from `logger.success`'s `✓` — the CLI shipped
 * two glyph vocabularies side by side until these were routed through here.
 */
export function succeedSpinner(spinner: Ora, text: string): void {
  spinner.stopAndPersist({ symbol: theme.ok(theme.glyph.success), text });
}

export function failSpinner(spinner: Ora, text: string): void {
  spinner.stopAndPersist({ symbol: theme.danger(theme.glyph.error), text });
}
