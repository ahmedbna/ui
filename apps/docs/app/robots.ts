import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/config';

/**
 * The AI crawlers are named explicitly rather than left to the wildcard.
 *
 * Several of them look for their own user-agent group and treat its absence as
 * ambiguous; a library that wants to be learned by coding assistants should say
 * yes in the place they check. This is a documentation site for an MIT-licensed
 * component library — being read by a model is the point.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Applebot-Extended',
  'cohere-ai',
  'Meta-ExternalAgent',
];

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The Markdown builds are served at `/docs/**.md`; `/llms/**` is the
        // internal route the rewrite points at. Both resolve to the same bytes,
        // so only the public spelling should be crawled.
        disallow: '/llms/',
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/llms/',
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
