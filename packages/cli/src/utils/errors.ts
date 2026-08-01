/**
 * One error vocabulary for the whole CLI.
 *
 * Before this, four patterns coexisted: `logger.error(...)` then
 * `process.exit(1)`; log-then-rethrow, which printed the same message twice;
 * `logger.error('An error occurred:', error)`, which dumped a raw `Error`
 * object and its stack at the user; and silent swallowing. Commands now throw
 * and `reportFatal` is the only place that prints a failure or sets an exit
 * code.
 */
import { logger } from './logger.js';
import { theme } from './theme.js';

export interface CliErrorOptions {
  /** One actionable line: a command to run, a flag to pass, a file to fix. */
  hint?: string;
  /** Defaults to 1. Use 0 for a user-initiated cancellation. */
  exitCode?: number;
  /** The underlying failure. Shown only under `--verbose`/`DEBUG`. */
  cause?: unknown;
}

/**
 * A failure that is the user's to act on, carrying the fix alongside it.
 *
 * Anything that reaches the user as a bare stack trace is a bug in this module's
 * coverage, not a reason to add another `console.error`.
 */
export class CliError extends Error {
  readonly hint: string | undefined;
  readonly exitCode: number;

  constructor(message: string, options: CliErrorOptions = {}) {
    super(
      message,
      options.cause !== undefined ? { cause: options.cause } : undefined
    );
    this.name = 'CliError';
    this.hint = options.hint;
    this.exitCode = options.exitCode ?? 1;
  }
}

/** Raised when the registry has no such entry. */
export class RegistryNotFoundError extends CliError {
  constructor(readonly what: string) {
    super(`Not found in the registry: ${what}`);
    this.name = 'RegistryNotFoundError';
  }
}

/**
 * A clean stop the user asked for. Exits 0 — declining a prompt is not a
 * failure, and scripts should not see it as one.
 */
export function cancelled(message = 'Cancelled.'): CliError {
  return new CliError(message, { exitCode: 0 });
}

/**
 * True when the user pressed Ctrl-C at a prompt.
 *
 * inquirer signals this with a named error rather than a signal, so without
 * this check Ctrl-C during the project-name prompt printed
 * `✗ An error occurred: ExitPromptError…` and exited 1.
 */
function isPromptCancellation(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'ExitPromptError' || error.name === 'AbortPromptError')
  );
}

/** Normalise anything throwable into something printable. */
export function toCliError(error: unknown): CliError {
  if (error instanceof CliError) return error;

  if (isPromptCancellation(error)) {
    // 130 is the conventional "terminated by SIGINT" code, but this path is a
    // deliberate user action, so it stays a clean exit for scripts.
    return cancelled('Cancelled.');
  }

  if (error instanceof Error) {
    return new CliError(error.message, { cause: error });
  }

  return new CliError(String(error), { cause: error });
}

/**
 * Print a failure and set the exit code. The only place that does either.
 *
 * Sets `process.exitCode` rather than calling `process.exit()`, which would
 * truncate buffered stdout when output is piped.
 */
export function reportFatal(error: unknown): void {
  const cliError = toCliError(error);

  if (cliError.exitCode === 0) {
    logger.info(cliError.message);
    process.exitCode = 0;
    return;
  }

  logger.error(cliError.message);
  if (cliError.hint) {
    logger.plain(theme.dim(`  ${cliError.hint}`));
  }

  // Only offer `--verbose` when there is actually an underlying failure behind
  // the message. A `CliError` built from a message and a hint has nothing more
  // to show, and inviting the user to re-run for a stack that does not exist is
  // just noise on the most common errors.
  const cause = cliError.cause;
  if (cause !== undefined) {
    const verbose =
      Boolean(process.env.DEBUG) || process.argv.includes('--verbose');
    logger.plain('');
    logger.plain(
      theme.dim(
        verbose
          ? cause instanceof Error
            ? (cause.stack ?? cause.message)
            : String(cause)
          : '  Run again with --verbose for details.'
      )
    );
  }

  process.exitCode = cliError.exitCode;
}

/**
 * Report a step that failed without failing the command.
 *
 * This names an existing and deliberate policy rather than introducing one:
 * external tooling (`convex dev`, `supabase link`) and cache writes must
 * degrade, because a scaffolded project is still useful when the optional
 * backend wiring did not complete. The user gets the manual command instead.
 */
export function softFail(
  message: string,
  options: { hint?: string; cause?: unknown } = {}
): void {
  logger.warn(message);
  if (options.hint) {
    logger.plain(theme.dim(`  ${options.hint}`));
  }
  if (options.cause !== undefined) {
    logger.debug(String(options.cause));
  }
}
