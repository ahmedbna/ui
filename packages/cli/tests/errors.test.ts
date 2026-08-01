import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CliError,
  RegistryNotFoundError,
  cancelled,
  reportFatal,
  softFail,
  toCliError,
} from '../src/utils/errors.js';

describe('CliError', () => {
  it('defaults to exit code 1 and carries its hint', () => {
    const error = new CliError('Something broke', { hint: 'Try this instead' });
    expect(error.exitCode).toBe(1);
    expect(error.hint).toBe('Try this instead');
  });

  it('preserves the underlying cause', () => {
    const cause = new Error('ENOENT');
    expect(new CliError('wrapped', { cause }).cause).toBe(cause);
  });
});

describe('cancelled', () => {
  it('exits 0 — declining a prompt is not a failure', () => {
    expect(cancelled().exitCode).toBe(0);
  });
});

describe('toCliError', () => {
  it('passes a CliError through untouched', () => {
    const original = new CliError('keep me', { hint: 'and my hint' });
    expect(toCliError(original)).toBe(original);
  });

  it('maps a Ctrl-C prompt abort to a clean cancellation', () => {
    // inquirer signals Ctrl-C with a named error rather than a signal, so
    // without this it surfaced as `✗ An error occurred: ExitPromptError` + exit 1.
    const exitPrompt = new Error('User force closed the prompt');
    exitPrompt.name = 'ExitPromptError';

    const result = toCliError(exitPrompt);
    expect(result.exitCode).toBe(0);
    expect(result.message).not.toContain('ExitPromptError');
  });

  it('also handles AbortPromptError', () => {
    const abort = new Error('aborted');
    abort.name = 'AbortPromptError';
    expect(toCliError(abort).exitCode).toBe(0);
  });

  it('keeps a plain Error message and stashes it as the cause', () => {
    const plain = new Error('disk full');
    const result = toCliError(plain);
    expect(result.message).toBe('disk full');
    expect(result.cause).toBe(plain);
  });

  it('stringifies a non-Error throw', () => {
    expect(toCliError('just a string').message).toBe('just a string');
  });
});

describe('RegistryNotFoundError', () => {
  it('is a CliError, so the top-level handler can print it', () => {
    const error = new RegistryNotFoundError('component "nope"');
    expect(error).toBeInstanceOf(CliError);
    expect(error.what).toBe('component "nope"');
  });
});

describe('reportFatal', () => {
  let out: string[];
  let err: string[];

  beforeEach(() => {
    out = [];
    err = [];
    vi.spyOn(console, 'log').mockImplementation(
      (...a) => void out.push(a.join(' '))
    );
    vi.spyOn(console, 'error').mockImplementation(
      (...a) => void err.push(a.join(' '))
    );
    process.exitCode = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    process.exitCode = undefined;
  });

  it('sets process.exitCode rather than killing the process', () => {
    // process.exit() here would truncate buffered stdout when output is piped.
    reportFatal(new CliError('boom'));
    expect(process.exitCode).toBe(1);
  });

  it('prints the message and the hint', () => {
    reportFatal(new CliError('boom', { hint: 'do the thing' }));
    expect(err.join('\n')).toContain('boom');
    expect(out.join('\n')).toContain('do the thing');
  });

  it('never prints a raw stack by default', () => {
    const cause = new Error('inner');
    reportFatal(new CliError('outer', { cause }));
    expect(out.join('\n')).not.toContain('at ');
    expect(out.join('\n')).toContain('--verbose');
  });

  it('prints the stack under --verbose', () => {
    vi.stubEnv('DEBUG', '1');
    reportFatal(new CliError('outer', { cause: new Error('inner') }));
    expect(out.join('\n')).toContain('Error: inner');
  });

  it('does not offer --verbose when there is no underlying cause', () => {
    // The common case: a message plus a hint has nothing more to reveal.
    reportFatal(new CliError('no package.json here', { hint: 'run init' }));
    expect(out.join('\n')).not.toContain('--verbose');
  });

  it('reports a cancellation as info at exit 0', () => {
    reportFatal(cancelled('Nothing was written.'));
    expect(process.exitCode).toBe(0);
    expect(err).toHaveLength(0);
    expect(out.join('\n')).toContain('Nothing was written.');
  });
});

describe('softFail', () => {
  it('warns without throwing, so an optional step cannot fail the command', () => {
    const warn = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(() =>
      softFail('convex init failed', { hint: 'run npx convex dev' })
    ).not.toThrow();
    expect(warn.mock.calls.flat().join(' ')).toContain('convex init failed');
    warn.mockRestore();
  });
});
