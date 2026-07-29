/**
 * Every docs page as plain Markdown.
 *
 * Publicly reachable as `<page url>.md` — `/docs/components/button.md` — via the
 * rewrite in `next.config.mjs`. It lives under `/llms` rather than `/docs`
 * because a Route Handler and a Page cannot occupy the same path, and the docs
 * page owns `/docs/[[...slug]]`.
 *
 * `force-static` + `generateStaticParams` keeps this prerendered at build time,
 * like every other route on this site — the deployment invokes no functions.
 */
import { source } from '@/lib/source';
import { getPageMarkdownText } from '@/lib/llm/to-markdown';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug);

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
