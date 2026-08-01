'use client';

import * as React from 'react';
import { CheckIcon, ClipboardIcon } from 'lucide-react';

import type { Event } from '@/lib/events';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  event,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
  event?: Event['name'];
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot='copy-button'
          size='icon'
          variant={variant}
          className={cn(
            'bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100',
            className
          )}
          onClick={() =>
            copyToClipboard(
              value,
              event ? { name: event, properties: { code: value } } : undefined
            )
          }
          {...props}
        >
          <span className='sr-only'>Copy</span>
          {isCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isCopied ? 'Copied' : 'Copy to Clipboard'}
      </TooltipContent>
    </Tooltip>
  );
}
