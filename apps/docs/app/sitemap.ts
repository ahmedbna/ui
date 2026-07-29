import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/config';
import { source } from '@/lib/source';

/**
 * Derived from the page tree, so a new MDX file is listed without anyone
 * remembering to add it.
 *
 * The `.md` builds are deliberately absent: they are the same content in a
 * second representation, and listing both invites a crawler to treat one as a
 * duplicate of the other. Agents find them through `llms.txt` and through the
 * `rel="alternate"` link on each page instead.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 0.9 : 0.7,
  }));

  return [
    { url: siteConfig.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/charts`, changeFrequency: 'weekly', priority: 0.8 },
    ...pages,
  ];
}
