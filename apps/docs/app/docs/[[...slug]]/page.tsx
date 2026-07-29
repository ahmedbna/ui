import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/mdx-components';
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/config';
import {
  getPageMarkdownText,
  registryNameForPage,
} from '@/lib/llm/to-markdown';
import { DocsTableOfContents } from '@/components/docs-toc';
import { DocsCopyPage } from '@/components/docs-copy-page';
import { DocsPageLinks } from '@/components/docs-page-links';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const revalidate = false;
export const dynamicParams = false;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!doc.title || !doc.description) {
    notFound();
  }

  const url = `${siteConfig.url}${page.url}`;

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: url,
      // The standard signal that a machine-readable form of this page exists.
      // An agent that follows it gets the component's full source instead of a
      // React shell wrapped around CDN screen recordings.
      types: { 'text/markdown': `${url}.md` },
    },
  };
}

/**
 * `SoftwareSourceCode` for the pages that document one.
 *
 * Says the two things a general-purpose model gets wrong about this library
 * unprompted: the runtime is React Native, not the browser, and the code is
 * installed by copying rather than by adding a dependency.
 */
function structuredData(page: {
  url: string;
  data: { title?: string; description?: string };
  slugs: string[];
}) {
  const name = registryNameForPage(page.slugs);
  if (!name) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: page.data.title,
    description: page.data.description,
    url: `${siteConfig.url}${page.url}`,
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React Native',
    codeRepository: siteConfig.links.github,
    license: 'https://opensource.org/licenses/MIT',
    isPartOf: { '@type': 'SoftwareApplication', name: siteConfig.name },
    installUrl: `${siteConfig.url}/r/${name}.json`,
    potentialAction: {
      '@type': 'ConsumeAction',
      target: `${siteConfig.url}/r/ai/${name}.json`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MDX = doc.body;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  const links = doc.links;

  // Rendered at build time — this page is `force-static`, so the Markdown is
  // baked into the HTML and "Copy Page" needs no request.
  const markdown = await getPageMarkdownText(page);
  const actions = {
    markdown,
    url: `${siteConfig.url}${page.url}`,
    name: registryNameForPage(page.slugs),
  };
  const jsonLd = structuredData(page);

  return (
    <div
      data-slot='docs'
      className='flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full'
    >
      {jsonLd && (
        <script
          type='application/ld+json'
          // Serialised from a literal built above — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='h-(--top-spacing) shrink-0' />
        <div className='mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-start justify-between'>
                <h1 className='scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl'>
                  {doc.title}
                </h1>
                <div className='flex items-center gap-2 pt-1.5'>
                  <DocsCopyPage {...actions} />
                  {neighbours.previous && (
                    <Button
                      variant='secondary'
                      size='icon'
                      className='extend-touch-target size-8 shadow-none md:size-7'
                      asChild
                    >
                      <Link href={neighbours.previous.url}>
                        <IconArrowLeft />
                        <span className='sr-only'>Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant='secondary'
                      size='icon'
                      className='extend-touch-target size-8 shadow-none md:size-7'
                      asChild
                    >
                      <Link href={neighbours.next.url}>
                        <span className='sr-only'>Next</span>
                        <IconArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {doc.description && (
                <p className='text-muted-foreground text-base'>
                  {doc.description}
                </p>
              )}
            </div>
            {links ? (
              <div className='flex items-center space-x-2 pt-4'>
                {links?.doc && (
                  <Badge asChild variant='secondary'>
                    <Link href={links.doc} target='_blank' rel='noreferrer'>
                      Docs <IconArrowUpRight />
                    </Link>
                  </Badge>
                )}
                {links?.api && (
                  <Badge asChild variant='secondary'>
                    <Link href={links.api} target='_blank' rel='noreferrer'>
                      API Reference <IconArrowUpRight />
                    </Link>
                  </Badge>
                )}
              </div>
            ) : null}
          </div>
          <div className='w-full flex-1 *:data-[slot=alert]:first:mt-0'>
            <MDX components={mdxComponents} />
          </div>
        </div>
        <div className='mx-auto flex h-16 w-full max-w-2xl items-center gap-2 px-4 md:px-0'>
          {neighbours.previous && (
            <Button
              variant='secondary'
              size='sm'
              asChild
              className='shadow-none'
            >
              <Link href={neighbours.previous.url}>
                <IconArrowLeft /> {neighbours.previous.name}
              </Link>
            </Button>
          )}
          {neighbours.next && (
            <Button
              variant='secondary'
              size='sm'
              className='ml-auto shadow-none'
              asChild
            >
              <Link href={neighbours.next.url}>
                {neighbours.next.name} <IconArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className='sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex'>
        <div className='h-(--top-spacing) shrink-0' />
        <div className='no-scrollbar overflow-y-auto'>
          {doc.toc?.length ? (
            <>
              <div className='px-8'>
                <DocsTableOfContents toc={doc.toc} />
              </div>
              <Separator className='my-4 w-auto! mx-8' />
            </>
          ) : null}
          <DocsPageLinks {...actions} />
          <div className='h-12' />
        </div>
      </div>
    </div>
  );
}
