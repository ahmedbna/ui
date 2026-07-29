'use client';

/**
 * The action cluster in the corner of a component code block.
 *
 * The copy button was already there; this adds the things an agent or a person
 * pulling a component into their own project actually reaches for — the file on
 * disk, the registry payload with the whole dependency closure, the install
 * command, the source on GitHub — plus the same AI handoff the page header
 * offers, scoped to this one component.
 */
import * as React from 'react';
import {
  IconBrandGithub,
  IconCheck,
  IconCopy,
  IconDots,
  IconDownload,
  IconTerminal2,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { AI_TARGETS } from '@/components/ai-targets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type ComponentActionsProps = {
  /** Registry entry name. Absent for `<ComponentSource src=…>` blocks. */
  name?: string;
  /** The source text shown in this block. */
  code: string;
  /** Where the file lands in a consumer project, e.g. `components/ui/button.tsx`. */
  target?: string;
  /** Documentation page for this entry, when it has one. */
  docUrl?: string;
  githubUrl?: string;
  /** Absolute site origin, for building AI prompts. */
  origin: string;
  className?: string;
};

export function ComponentActions({
  name,
  code,
  target,
  docUrl,
  githubUrl,
  origin,
  className,
}: ComponentActionsProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const filename = target?.split('/').pop() ?? `${name ?? 'component'}.tsx`;

  const download = React.useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [code, filename]);

  return (
    <div
      data-slot='component-actions'
      className={cn('absolute top-3 right-2 z-10 flex items-center', className)}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-slot='copy-button'
            size='icon'
            variant='ghost'
            className='bg-code size-7'
            onClick={() => copyToClipboard(code)}
          >
            <span className='sr-only'>Copy code</span>
            {isCopied ? <IconCheck /> : <IconCopy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isCopied ? 'Copied' : 'Copy code'}</TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className='bg-code size-7'
            aria-label='More actions'
          >
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56 rounded-lg'>
          <DropdownMenuItem onSelect={download}>
            <IconDownload className='size-4' />
            Download {filename}
          </DropdownMenuItem>

          {name && (
            <>
              <DropdownMenuItem
                onSelect={() =>
                  copyToClipboard(`npx bna-ui add ${name}`, {
                    name: 'copy_npm_command',
                    properties: { command: `npx bna-ui add ${name}`, pm: 'npm' },
                  })
                }
              >
                <IconTerminal2 className='size-4' />
                Copy install command
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {/* The payload carries the component plus every file it
                    imports, which is what an agent wants in one request. */}
                <a href={`/r/${name}.json`} download={`${name}.json`}>
                  <IconDownload className='size-4' />
                  Download with dependencies
                </a>
              </DropdownMenuItem>
            </>
          )}

          {githubUrl && (
            <DropdownMenuItem asChild>
              <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
                <IconBrandGithub className='size-4' />
                View source on GitHub
              </a>
            </DropdownMenuItem>
          )}

          {docUrl && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className='text-muted-foreground text-xs font-normal'>
                Open {name} in
              </DropdownMenuLabel>
              {AI_TARGETS.map((aiTarget) => {
                const Icon = aiTarget.icon;
                return (
                  <DropdownMenuItem key={aiTarget.id} asChild>
                    <a
                      href={aiTarget.href({ url: `${origin}${docUrl}`, name })}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon className='size-4' />
                      {aiTarget.label}
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
