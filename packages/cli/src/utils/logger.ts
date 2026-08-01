/**
 * Console output. All styling comes from `theme.ts`; this module chooses no
 * colours of its own.
 */
import { bannerLines, theme } from './theme.js';

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(theme.note(theme.glyph.info), message, ...args);
  },

  success: (message: string, ...args: unknown[]) => {
    console.log(theme.ok(theme.glyph.success), message, ...args);
  },

  /**
   * Diagnostics go to stderr, not stdout.
   *
   * This is conventional for warnings, and load-bearing for the MCP server:
   * stdout there is the JSON-RPC channel, so a cache-fallback warning printed
   * on it would corrupt the protocol stream mid-session.
   */
  warn: (message: string, ...args: unknown[]) => {
    console.warn(theme.warn(theme.glyph.warning), message, ...args);
  },

  error: (message: string, ...args: unknown[]) => {
    console.error(theme.danger(theme.glyph.error), message, ...args);
  },

  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG || process.argv.includes('--verbose')) {
      console.error(theme.dim(theme.glyph.debug), message, ...args);
    }
  },

  /** Unstyled. Used for every indented detail line. */
  plain: (message: string, ...args: unknown[]) => {
    console.log(message, ...args);
  },

  /**
   * A section title, prefixed with the wordmark chip.
   *
   * The title itself is bold in the terminal's own foreground rather than brand
   * yellow — see the contrast note in `theme.ts`.
   */
  header: (message: string) => {
    console.log('\n' + theme.badge() + ' ' + theme.heading(message) + '\n');
  },

  banner: () => {
    console.log(bannerLines().join('\n'));
  },

  newline: () => {
    console.log();
  },
};
