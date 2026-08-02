/**
 * Diffs each `meta/<name>.ts`'s documented props against the props the
 * component's own source actually exports.
 *
 * Non-blocking by design (see AUDIT.md Phase 8): this always exits 0. It
 * prints a report so drift is visible in CI logs and can be triaged, without
 * turning every future prop rename into a red build. Flip to a hard failure
 * once a maintainer decides the signal-to-noise ratio earns it.
 *
 * Heuristic, not exhaustive:
 *  - "documented but not found" resolves the type's full member set,
 *    including inherited members (`extends`/intersections), so it only
 *    flags a prop meta.ts claims exists that genuinely doesn't, anywhere in
 *    the type.
 *  - "exported but undocumented" only looks at members declared directly on
 *    the matched interface/type-literal node — not inherited ones — because
 *    meta.ts files in this codebase document a component's own props, never
 *    the RN/Expo core props (style, onPress, ...) picked up via `extends
 *    ViewProps` or `...rest` spreads. Checking inherited members here would
 *    make the report mostly noise about props nobody documents anywhere.
 *  - Rest/spread markers some meta files use (e.g. `'...props'`) are
 *    ignored on both sides — they're not real member names.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { REGISTRY } from '../index.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TSCONFIG = path.join(ROOT, 'tsconfig.src.json');

const DOCUMENTED_TYPES = new Set([
  'registry:ui',
  'registry:hook',
  'registry:theme',
]);

const isRestMarker = (name: string) => name.startsWith('...');

function loadProgram(): ts.Program {
  const configFile = ts.readConfigFile(TSCONFIG, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n')
    );
  }
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(TSCONFIG)
  );
  return ts.createProgram(parsed.fileNames, parsed.options);
}

/** Finds an exported `interface`/`type` alias named `typeName` in `sourceFile`. */
function findTypeDeclaration(
  sourceFile: ts.SourceFile,
  typeName: string
): ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined {
  let found: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (found) return;
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.name.text === typeName
    ) {
      found = node;
    }
  });
  return found;
}

/** Member names declared directly on the node — no inherited/native props. */
function ownMemberNames(
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration
): Set<string> {
  const members = ts.isInterfaceDeclaration(node)
    ? node.members
    : ts.isTypeLiteralNode(node.type)
      ? node.type.members
      : undefined;
  const names = new Set<string>();
  for (const member of members ?? []) {
    if (
      ts.isPropertySignature(member) &&
      member.name &&
      ts.isIdentifier(member.name)
    ) {
      names.add(member.name.text);
    }
  }
  return names;
}

/** Full resolved member set — inherited props included. */
function resolvedMemberNames(
  checker: ts.TypeChecker,
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration
): Set<string> {
  const type = checker.getTypeAtLocation(node);
  return new Set(
    checker.getPropertiesOfType(type).map((symbol) => symbol.name)
  );
}

interface DriftEntry {
  component: string;
  typeName: string;
  documentedNotFound: string[];
  exportedUndocumented: string[];
}

function main() {
  const program = loadProgram();
  const checker = program.getTypeChecker();
  const drift: DriftEntry[] = [];
  const skipped: string[] = [];

  for (const [name, entry] of Object.entries(REGISTRY)) {
    if (!DOCUMENTED_TYPES.has(entry.type)) continue;
    const types = entry.meta?.types;
    if (!types?.length) continue;

    for (const typeDoc of types) {
      // meta.ts names a type block after the *component* ("Card"), whose
      // props interface is conventionally "CardProps" — a few files instead
      // export a bare "Props", and the odd meta entry (toast.ts's
      // "ToastData") names an interface directly. Try all three.
      const candidates = [typeDoc.name, `${typeDoc.name}Props`, 'Props'];
      let declaration:
        ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined;

      for (const file of entry.files) {
        const absPath = path.join(ROOT, file.path);
        const sf = program.getSourceFile(absPath);
        if (!sf) continue;
        for (const candidate of candidates) {
          const found = findTypeDeclaration(sf, candidate);
          if (found) {
            declaration = found;
            break;
          }
        }
        if (declaration) break;
      }

      if (!declaration) {
        skipped.push(
          `${name}: no "${candidates.join('" / "')}" type found in its files`
        );
        continue;
      }

      const documented = new Set(
        typeDoc.props.map((p) => p.name).filter((n) => !isRestMarker(n))
      );
      const resolved = resolvedMemberNames(checker, declaration);
      const own = ownMemberNames(declaration);

      const documentedNotFound = [...documented].filter(
        (n) => !resolved.has(n)
      );
      const exportedUndocumented = [...own].filter((n) => !documented.has(n));

      if (documentedNotFound.length || exportedUndocumented.length) {
        drift.push({
          component: name,
          typeName: typeDoc.name,
          documentedNotFound,
          exportedUndocumented,
        });
      }
    }
  }

  if (skipped.length) {
    console.log(
      `⚠ ${skipped.length} documented type(s) could not be matched to source:`
    );
    for (const line of skipped) console.log(`  - ${line}`);
    console.log('');
  }

  if (!drift.length) {
    console.log('✔ meta drift: no documented prop mismatches found');
    return;
  }

  console.log(`⚠ meta drift: ${drift.length} type(s) with prop mismatches\n`);
  for (const {
    component,
    typeName,
    documentedNotFound,
    exportedUndocumented,
  } of drift) {
    console.log(`${component} — ${typeName}`);
    for (const n of documentedNotFound) {
      console.log(`  - documented but not found in source: \`${n}\``);
    }
    for (const n of exportedUndocumented) {
      console.log(`  - exported but undocumented: \`${n}\``);
    }
  }
  console.log(
    `\nNon-blocking (see AUDIT.md Phase 8) — this does not fail the build.`
  );
}

main();
