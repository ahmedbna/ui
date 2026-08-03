'use client';

/**
 * "Copy Page" plus the AI handoff menu, in the docs page header.
 *
 * The primary action copies the page's Markdown build — fetched from `<url>.md`
 * on click, rather than shipped in the payload — so pasting into any chat window
 * carries the component source with it. The chevron opens the same target list
 * rendered by `DocsPageLinks`; both read `AI_TARGETS`, so a new target appears
 * in both places at once.
 */
import * as React from 'react';
import { IconCheck, IconChevronDown, IconCopy } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { AI_TARGETS, type PromptContext } from '@/components/ai-targets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export function DocsCopyPage({
  mdUrl,
  ...ctx
}: PromptContext & { mdUrl: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const fetchMarkdown = React.useCallback(
    () => fetch(mdUrl).then((res) => res.text()),
    [mdUrl]
  );

  const trigger = (
    <Button
      variant='secondary'
      size='icon'
      className='peer -ml-0.5 size-8 shadow-none md:size-7'
      aria-label='More actions'
    >
      <IconChevronDown className='rotate-180 sm:rotate-0' />
    </Button>
  );

  return (
    <Popover>
      <div className='bg-secondary group/buttons relative flex rounded-lg *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10'>
        <PopoverAnchor />
        <Button
          variant='secondary'
          size='sm'
          className='h-8 shadow-none md:h-7 md:text-[0.8rem]'
          onClick={() => copyToClipboard(fetchMarkdown)}
        >
          {isCopied ? <IconCheck /> : <IconCopy />}
          Copy Page
        </Button>

        {/* Desktop: a dropdown. Mobile: the same list in a popover, because a
            dropdown anchored to a header button opens off-screen on narrow
            viewports. */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='hidden sm:flex'>
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='rounded-lg shadow-none'>
            {AI_TARGETS.map((target) => (
              <DropdownMenuItem key={target.id} asChild>
                <TargetLink target={target} ctx={ctx} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator
          orientation='vertical'
          className='bg-foreground/5! absolute top-1 right-8 z-0 h-6! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!'
        />

        <PopoverTrigger asChild className='flex sm:hidden'>
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='bg-background/70 dark:bg-background/60 w-56 rounded-lg p-1 shadow-none backdrop-blur-sm'
        >
          {AI_TARGETS.map((target) => (
            <Button
              key={target.id}
              variant='ghost'
              size='lg'
              asChild
              className='w-full justify-start text-base font-normal *:[svg]:text-muted-foreground'
            >
              <TargetLink target={target} ctx={ctx} />
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
}

function TargetLink({
  target,
  ctx,
  className,
}: {
  target: (typeof AI_TARGETS)[number];
  ctx: PromptContext;
  className?: string;
}) {
  const Icon = target.icon;
  return (
    <a
      href={target.href(ctx)}
      target='_blank'
      rel='noopener noreferrer'
      className={cn('flex items-center gap-2', className)}
    >
      <Icon className='size-4' />
      <span className='flex-1'>{target.label}</span>
      {target.note && (
        <span className='text-muted-foreground text-[0.7rem]'>
          {target.note}
        </span>
      )}
    </a>
  );
}
