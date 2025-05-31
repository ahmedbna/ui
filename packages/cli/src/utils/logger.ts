// packages/cli/src/utils/logger.ts
import chalk from 'chalk';
import ora, { Ora } from 'ora';

export class Logger {
  private spinner: Ora | null = null;

  info(message: string) {
    console.log(chalk.blue('ℹ'), message);
  }

  success(message: string) {
    console.log(chalk.green('✓'), message);
  }

  warn(message: string) {
    console.log(chalk.yellow('⚠'), message);
  }

  error(message: string) {
    console.log(chalk.red('✗'), message);
  }

  startSpinner(message: string) {
    this.spinner = ora(message).start();
  }

  updateSpinner(message: string) {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  succeedSpinner(message?: string) {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  failSpinner(message?: string) {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  stopSpinner() {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  log(message: string) {
    console.log(message);
  }

  break() {
    console.log('');
  }
}

export const logger = new Logger();
