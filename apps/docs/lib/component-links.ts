/**
 * Links out of a registry entry: its documentation page and its source on GitHub.
 *
 * Doc URLs are derived from where a file lands in the consumer's project rather
 * than from the entry name, because that target path is the only field that says
 * which section an entry belongs to — `components/charts/line-chart.tsx` is a
 * chart, `components/ui/button.tsx` is a component, and neither name says so.
 *
 * Demos have no page of their own, and an entry whose doc slug has drifted from
 * its registry name has no page either, so every derived URL is checked against
 * the page tree before it is returned.
 */
import 'server-only';
import { REGISTRY } from '@bna-ui/registry';
import { siteConfig } from '@/lib/config';
import { source } from '@/lib/source';

const SECTIONS: Array<[prefix: string, section: string]> = [
  ['components/charts/', 'charts'],
  ['components/ui/', 'components'],
  ['hooks/', 'hooks'],
  ['theme/', 'theme'],
];

/** `/docs/components/button`, or undefined when the entry has no page. */
export function docUrlForEntry(name: string): string | undefined {
  const target = REGISTRY[name]?.files[0]?.target;
  if (!target) return undefined;

  const match = SECTIONS.find(([prefix]) => target.startsWith(prefix));
  if (!match) return undefined;

  const slugs = [match[1], name];
  return source.getPage(slugs) ? `/docs/${slugs.join('/')}` : undefined;
}

/** The entry's source file in this repository. */
export function githubUrlForEntry(name: string): string | undefined {
  const path = REGISTRY[name]?.files[0]?.path;
  if (!path) return undefined;
  return `${siteConfig.links.github}/blob/main/packages/registry/${path}`;
}
