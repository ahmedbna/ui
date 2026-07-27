import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { GitHubLink } from '@/components/github-link';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { ModeSwitcher } from '@/components/mode-switcher';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { source } from '@/lib/source';
import EmailButton from './email-button';
import { Icons } from './icons';

export function SiteHeader() {
  const pageTree = source.pageTree;

  return (
    <header className='bg-background sticky top-0 z-50 w-full'>
      <div className='container-wrapper 3xl:fixed:px-0 px-6'>
        <div className='3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4'>
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className='flex lg:hidden'
          />
          <Button asChild variant='ghost' className='px-2'>
            <Link href='/'>
              <h1 className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-xl font-black text-transparent dark:from-white dark:to-slate-900/10'>
                BNA
              </h1>
              <span className='sr-only'>{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className='hidden lg:flex' />
          <div className='ml-auto flex items-center gap-2 md:flex-1 md:justify-end'>
            <Button
              asChild
              size='sm'
              className='h-8 bg-[#FAD40B] text-black shadow-none font-semibold'
            >
              <Link
                href={'https://ai.ahmedbna.com'}
                target='_blank'
                rel='noreferrer'
                className='text-black transition-colors duration-200 font-semibold'
              >
                <img src='/bricks.png' alt='AI' className='h-4 w-4' />
                BNA AI
              </Link>
            </Button>
            {/* <EmailButton /> */}
            <Separator orientation='vertical' />
            <Button
              asChild
              size='sm'
              variant='ghost'
              className='h-8 shadow-none'
            >
              <Link
                href={siteConfig.links.linkedin}
                target='_blank'
                rel='noreferrer'
                className='text-muted-foreground transition-colors duration-200'
              >
                <Icons.linkedin />
              </Link>
            </Button>
            <Button
              asChild
              size='sm'
              variant='ghost'
              className='h-8 shadow-none'
            >
              <Link
                href={siteConfig.links.x}
                target='_blank'
                rel='noreferrer'
                className='text-muted-foreground transition-colors duration-200'
              >
                <Icons.x />
              </Link>
            </Button>
            <GitHubLink />
            <Separator orientation='vertical' />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
