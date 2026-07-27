'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IPhonePreview } from '@/components/iphone-preview';
import { CodeBlockCommand } from '@/components/code-block-command';

export function ComponentDialog({
  name,
  className,
  description,
  source,
  preview,
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  description?: string;
  source: React.ReactNode;
  /** Absent for entries with nothing to show — hooks and theme files. */
  preview?: { dark: string; light: string };
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn('mt-2.5 flex flex-col items-center w-fit gap-2', className)}
      {...props}
    >
      {/* Code Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='cursor-pointer'>
          {preview ? (
            <IPhonePreview preview={preview} width={310} />
          ) : (
            <span className='text-muted-foreground border-border hover:bg-muted rounded-lg border px-4 py-2 text-sm'>
              View source
            </span>
          )}
        </DialogTrigger>
        <DialogContent className='max-w-4xl max-h-[80vh] overflow-hidden'>
          <DialogHeader>
            <DialogTitle>{`${name}.tsx`}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <CodeBlockCommand
            className='relative bg-code rounded-lg'
            __npm__={`npx bna-ui add ${name}`}
            __yarn__={`yarn dlx bna-ui add ${name}`}
            __pnpm__={`pnpm dlx bna-ui add ${name}`}
            __bun__={`bunx bna-ui add ${name}`}
          />

          <div className='px-4 bg-card rounded-lg max-h-[60vh] overflow-auto '>
            {source}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
