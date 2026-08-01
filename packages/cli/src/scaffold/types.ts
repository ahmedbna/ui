/**
 * The vocabulary of a scaffold.
 *
 * `init`, `convex` and `supabase` used to be three ~400-line files that shared
 * roughly 330 lines verbatim: the name prompt, the `.` handling, the empty
 * directory check, the package-manager ladder, `updatePackageJson`,
 * `updateAppJson`, and the success block. They differ in only four ways, and
 * those four are exactly the fields of `ScaffoldConfig` below.
 */
import type {
  PackageManager,
  PackageManagerFlags,
} from '../utils/package-manager.js';
import type { TemplateName } from './templates.js';

/** Flags shared by every scaffold command. */
export interface ScaffoldOptions extends PackageManagerFlags {
  skipInstall?: boolean;
}

/**
 * Commander turns `--no-auth` into `options.auth === false`, and leaves it
 * `undefined` when the flag is absent. Named once so two commands cannot drift.
 */
export function authRequested(options: { auth?: boolean }): boolean {
  return options.auth !== false;
}

/** Fully resolved before any hook runs. */
export interface ScaffoldContext<O extends ScaffoldOptions = ScaffoldOptions> {
  /** Sanitized and npm-valid. Also the expo name, slug and scheme. */
  projectName: string;
  projectPath: string;
  /** Scaffolded into the cwd via `.` — suppresses the `cd` line. */
  inPlace: boolean;
  packageManager: PackageManager;
  options: O;
}

/** Runs after the template is copied, inside the spinner, before install. */
export type ScaffoldPatch<O extends ScaffoldOptions = ScaffoldOptions> = (
  ctx: ScaffoldContext<O>
) => Promise<void> | void;

/**
 * The optional interactive / external-tool phase, after install.
 *
 * Singular rather than an array: `connectSupabase` returns credentials that the
 * next-steps renderer reads, and a heterogeneous list of result types cannot be
 * typed without a state bag. One step per command covers all three today.
 */
export interface ScaffoldStep<O extends ScaffoldOptions, R = void> {
  /** Debug label only. */
  name: string;
  /** Skipped when this returns false — `--skip-convex`, `--skip-supabase`. */
  when?: (ctx: ScaffoldContext<O>) => boolean;
  run: (ctx: ScaffoldContext<O>) => Promise<R>;
}

/**
 * What to tell the user once the project exists.
 *
 * Declarative so the shared framing — the headline, `cd`, the install line, the
 * four `Available commands` entries — lives in `next-steps.ts` rather than
 * being re-typed per command.
 */
export interface NextSteps {
  /** Replaces the `Successfully created <name>!` line. */
  headline: string;
  /** Extra `Next steps` entries, after `cd`/install and before `<pm> start`. */
  steps?: string[];
  /** Printed after the shared `Available commands` block. */
  sections?: Array<{ title: string; lines: string[] }>;
  /** Trailing prose: the Resend key note, the redirect allow-list. */
  notes?: Array<{ title?: string; lines: string[] }>;
  signOff: string;
}

export type NextStepsRenderer<O extends ScaffoldOptions, R> = (
  ctx: ScaffoldContext<O>,
  result: R | undefined
) => NextSteps;

export interface ScaffoldConfig<
  O extends ScaffoldOptions = ScaffoldOptions,
  R = void,
> {
  /** Prompt default when no name argument was given. */
  defaultProjectName: string;
  /** Printed under the banner. */
  title: (options: O) => string;
  /** Which `dist/templates/<name>` to copy. */
  template: (options: O) => TemplateName;
  /** Spinner text. Defaults to `Creating your BNA project...`. */
  creatingMessage?: string;
  /** `setPackageName` and `setAppIdentity` always run first. */
  patches?: ScaffoldPatch<O>[];
  backend?: ScaffoldStep<O, R>;
  nextSteps: NextStepsRenderer<O, R>;
}
