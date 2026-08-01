/**
 * Running someone else's CLI on the user's behalf.
 *
 * `convex` and `supabase` each had four hand-written copies of the same shape:
 * announce the step, shell out with inherited stdio, print a tick, and on
 * failure print a cross plus the command to run by hand. The numbering was
 * maintained by literal `'1. '` / `'2. '` prefixes in the strings.
 *
 * Nothing here throws. A scaffolded project is useful even when the optional
 * backend wiring did not complete — the user gets the manual command instead.
 * That was the existing policy; this just names it.
 */
import { execSync } from 'child_process';
import { softFail } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import { theme } from '../utils/theme.js';

export interface ExternalStep {
  /** Imperative, e.g. `Setting up your Convex backend`. */
  title: string;
  /** Context printed before the command runs. */
  detail?: string[];
  /** A warning shown before running — browser windows, interactive prompts. */
  heads_up?: string;
  command: string;
  /**
   * The command to suggest on failure. Defaults to `command`; differs when the
   * real invocation has flags the user should not retype.
   */
  retry?: string;
  /** When this fails, abandon the rest of the sequence. */
  required?: boolean;
}

export interface ExternalContext {
  cwd: string;
  /** Prefix each title with its position, as the originals did by hand. */
  numbered?: boolean;
}

/** Runs one step. Returns false when it failed. */
export function runExternal(
  step: ExternalStep,
  cwd: string,
  label?: string
): boolean {
  logger.info(label ? `${label} ${step.title}` : step.title);
  for (const line of step.detail ?? []) {
    logger.plain(theme.dim(`  ${line}`));
  }
  if (step.heads_up) logger.warn(step.heads_up);

  try {
    // Inherited stdio: these are interactive, and swallowing their output would
    // leave the user staring at a spinner while a login prompt waits offscreen.
    execSync(step.command, { cwd, stdio: 'inherit' });
    logger.success(`${step.title} — done`);
    logger.newline();
    return true;
  } catch (error) {
    softFail(`${step.title} — failed`, {
      hint: `Run it yourself later:  ${step.retry ?? step.command}`,
      cause: error,
    });
    logger.newline();
    return false;
  }
}

/**
 * Runs steps in order, stopping early if a `required` one fails.
 *
 * Returns whether every step ran successfully.
 */
export function runExternalSequence(
  steps: ExternalStep[],
  { cwd, numbered = true }: ExternalContext
): boolean {
  let allOk = true;

  for (const [index, step] of steps.entries()) {
    const label = numbered && steps.length > 1 ? `${index + 1}.` : undefined;
    const ok = runExternal(step, cwd, label);
    if (!ok) {
      allOk = false;
      // The remaining steps talk to a backend that was never provisioned.
      if (step.required) break;
    }
  }

  return allOk;
}
