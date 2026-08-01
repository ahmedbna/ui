/**
 * Interactive prompts, themed once.
 *
 * `@inquirer/prompts` replaced the legacy `inquirer` package: it is the same
 * author's modular rewrite, roughly half the dependency tree, and — the reason
 * it was chosen over the alternatives — it exposes a `theme` option, so the
 * cursor, the prefix and the selected-item highlight can be brand coloured
 * instead of whatever the library ships.
 *
 * Every prompt in the CLI goes through here so that theme is applied in one
 * place rather than being passed at each of the seven call sites.
 */
import {
  checkbox as baseCheckbox,
  confirm as baseConfirm,
  input as baseInput,
  search as baseSearch,
  select as baseSelect,
} from '@inquirer/prompts';
import { theme } from './theme.js';

/**
 * Brand styling for the interactive chrome.
 *
 * The cursor and the highlight are the two places a short run of brand colour
 * reads well: they sit against the terminal background for only a few
 * characters at a time, and they always have unstyled text beside them for
 * contrast. Message text and answers stay in the terminal's own colours.
 */
const brandTheme = {
  prefix: {
    idle: theme.brand(theme.glyph.bullet),
    done: theme.ok(theme.glyph.success),
  },
  spinner: {
    interval: 80,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(theme.brand),
  },
  style: {
    answer: theme.brand,
    highlight: theme.brand,
    help: theme.dim,
    description: theme.dim,
    disabledChoice: theme.dim,
  },
  icon: {
    cursor: theme.supportsUnicode ? '❯' : '>',
  },
} as const;

type Options<T> = Omit<T, 'theme'>;

export function input(options: Options<Parameters<typeof baseInput>[0]>) {
  return baseInput({ ...options, theme: brandTheme });
}

export function confirm(options: Options<Parameters<typeof baseConfirm>[0]>) {
  return baseConfirm({ ...options, theme: brandTheme });
}

export function select<Value>(
  options: Options<Parameters<typeof baseSelect<Value>>[0]>
) {
  return baseSelect<Value>({ ...options, theme: brandTheme });
}

export function checkbox<Value>(
  options: Options<Parameters<typeof baseCheckbox<Value>>[0]>
) {
  return baseCheckbox<Value>({ ...options, theme: brandTheme });
}

export function search<Value>(
  options: Options<Parameters<typeof baseSearch<Value>>[0]>
) {
  return baseSearch<Value>({ ...options, theme: brandTheme });
}
