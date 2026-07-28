/**
 * Thin adapter over `@bna-ui/registry`.
 *
 * This used to read component source off disk and rewrite it with ts-morph in a
 * temp file on every request. That transform now happens once, in the registry
 * build (`packages/registry/scripts/build.ts`), so both the docs site and the
 * CLI serve byte-identical source. All that is left here is a lookup.
 */
import 'server-only';
import { getPayload } from '@bna-ui/registry/server';

export { REGISTRY, getComponent, listComponents } from '@bna-ui/registry';
export type { ComponentRegistry, RegistryPayload } from '@bna-ui/registry';

/** An entry's own source: the file(s) it declares, not what it depends on. */
export { getEntryFiles, getSource } from '@bna-ui/registry/server';

/**
 * Full payload for an entry: metadata plus the source of every file it needs.
 *
 * `files` is the dependency closure in dependency order, so it is not indexable
 * by position — `files[0]` is a leaf dependency (`hooks/useColorScheme.ts` for
 * most entries), never the entry itself. Use `getSource` to render source.
 */
export const getRegistryItem = getPayload;

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};

/** Builds a nested tree from the flat `target` paths in a payload. */
export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
): FileTree[] {
  const root: FileTree[] = [];

  for (const file of files) {
    const filePath = file.target ?? file.path;
    const parts = filePath.split('/');
    let currentLevel = root;

    parts.forEach((part, i) => {
      const isFile = i === parts.length - 1;
      const existing = currentLevel.find((node) => node.name === part);

      if (existing) {
        if (isFile) existing.path = filePath;
        else currentLevel = existing.children!;
        return;
      }

      const node: FileTree = isFile
        ? { name: part, path: filePath }
        : { name: part, children: [] };
      currentLevel.push(node);
      if (!isFile) currentLevel = node.children!;
    });
  }

  return root;
}
