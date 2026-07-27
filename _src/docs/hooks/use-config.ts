import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Config = {
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
  installationType: 'cli' | 'manual';
};

const configAtom = atomWithStorage<Config>(
  'config',
  {
    packageManager: 'pnpm',
    installationType: 'cli',
  },
  undefined,
  {
    getOnInit: true, // Prevent hydration issues
  }
);

export function useConfig() {
  return useAtom(configAtom);
}
