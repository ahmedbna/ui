/**
 * Every docs page as plain Markdown.
 *
 * Publicly reachable as `<page url>.md` — `/docs/components/button.md` — via the
 * rewrite in `vercel.json`. It lives under `/llms` rather than `/docs` because a
 * Route Handler and a Page cannot occupy the same path, and the docs page owns
 * `/docs/[[...slug]]`.
 *
 * `force-static` + `generateStaticParams` keeps this prerendered at build time,
 * like every other route on this site — the deployment invokes no functions.
 *
 * The params carry a literal `.md` on the last segment, which is load-bearing
 * under `output: 'export'`. Export writes a handler's response to its route path
 * verbatim, so a bare `/llms` index would want to be the file `out/llms` while
 * its children want the directory `out/llms/` — one name, two kinds. Suffixing
 * every entry sidesteps that (`out/llms/index.md`, `out/llms/components/button.md`)
 * and, as a bonus, gets the right `Content-Type` from the extension: a static
 * file is served by extension, not by the headers this handler sets, so without
 * it `.md` requests would come back as `application/octet-stream`.
 */
import { source } from '@/lib/source';
import { getPageMarkdownText } from '@/lib/llm/to-markdown';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

/** The stand-in for the empty slug — `out/llms/index.md` is the docs root. */
const INDEX_SEGMENT = 'index';

export function generateStaticParams() {
  return source.generateParams().map(({ slug = [] }) => {
    const segments = slug.length > 0 ? slug : [INDEX_SEGMENT];
    return {
      slug: [...segments.slice(0, -1), `${segments.at(-1)}.md`],
    };
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params;

  // Undo what `generateStaticParams` added before asking the source for a page.
  const segments = [...slug.slice(0, -1), slug.at(-1)?.replace(/\.md$/, '')];
  const pageSlug =
    segments.length === 1 && segments[0] === INDEX_SEGMENT ? [] : segments;

  const page = source.getPage(pageSlug as string[]);

  if (!page) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(await getPageMarkdownText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
