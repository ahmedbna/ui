/**
 * https://ui.ahmedbna.com/llms.txt — the llmstxt.org index for this site.
 */
import { buildLlmsTxt } from '@/lib/llm/llms-txt';

export const revalidate = false;
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
