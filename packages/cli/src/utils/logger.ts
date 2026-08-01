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

  warn: (message: string, ...args: unknown[]) => {
    console.log(theme.warn(theme.glyph.warning), message, ...args);
  },

  error: (message: string, ...args: unknown[]) => {
    console.error(theme.danger(theme.glyph.error), message, ...args);
  },

  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG) {
      console.log(theme.dim(theme.glyph.debug), message, ...args);
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
