/**
 * https://ui.ahmedbna.com/llms-full.txt — every docs page inlined as Markdown.
 *
 * Large by design: it carries the source of every component and every demo, so
 * a model that ingests this file needs nothing else. Consumers that want one
 * component should fetch that page's `.md` instead.
 */
import { buildLlmsFullTxt } from '@/lib/llm/llms-txt';

export const revalidate = false;
export const dynamic = 'force-static';

export async function GET() {
  return new Response(await buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
