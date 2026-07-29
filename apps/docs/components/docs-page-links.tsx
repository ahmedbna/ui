'use client';

/**
 * The same actions as `DocsCopyPage`, as a quiet list under the table of
 * contents on wide viewports — where there is room to show every target at once
 * rather than hiding them behind a chevron.
 */
import * as React from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { AI_TARGETS, type PromptContext } from '@/components/ai-targets';

export function DocsPageLinks({
  markdown,
  className,
  ...ctx
}: PromptContext & { markdown: string; className?: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className={cn('flex flex-col gap-3 px-8', className)}>
      <ul className='text-muted-foreground flex flex-col gap-2 text-[0.8rem]'>
        <li>
          <button
            type='button'
            onClick={() => copyToClipboard(markdown)}
            className='hover:text-foreground inline-flex items-center gap-2 transition-colors'
          >
            {isCopied ? (
              <IconCheck className='size-4' />
            ) : (
              <IconCopy className='size-4' />
            )}
            Copy page
          </button>
        </li>
        {AI_TARGETS.map((target) => {
          const Icon = target.icon;
          return (
            <li key={target.id}>
              <a
                href={target.href(ctx)}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-foreground inline-flex items-center gap-2 transition-colors'
              >
                <Icon className='size-4' />
                {target.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
