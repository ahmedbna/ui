/**
 * Where a docs page's Markdown build lives.
 *
 * Its own module because both sides of the boundary need it: the server page
 * hands the URL to the copy buttons, and the client `AI_TARGETS` build prompts
 * out of it. It cannot live in `ai-targets.tsx` (that file is `'use client'`,
 * so the server cannot call into it) nor in `to-markdown.ts` (importing that
 * from a client component would drag the whole MDX pipeline into the bundle).
 */
export function markdownUrl(url: string): string {
  return `${url}.md`;
}
