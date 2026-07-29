import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';

import { highlightCode } from '@/lib/highlight-code';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { docUrlForEntry, githubUrlForEntry } from '@/lib/component-links';
import { CodeCollapsibleWrapper } from '@/components/code-collapsible-wrapper';
import { ComponentActions } from '@/components/component-actions';
import { getIconForLanguageExtension } from '@/components/icons';
import { getSource } from '@/lib/registry';
import { REGISTRY } from '@bna-ui/registry';

export async function ComponentSource({
  name,
  src,
  file,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<'div'> & {
  name?: string;
  src?: string;
  /** Target path, for the rare entry declaring more than one file. */
  file?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!name && !src) {
    return null;
  }

  let code: string | undefined;

  if (name) {
    code = (await getSource(name, file)) ?? undefined;
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), 'utf-8');
    code = file;
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';
  const highlightedCode = await highlightCode(code, lang);

  const actions = {
    name,
    code,
    origin: siteConfig.url,
    target: title ?? file ?? (name ? REGISTRY[name]?.files[0]?.target : src),
    docUrl: name ? docUrlForEntry(name) : undefined,
    githubUrl: name ? githubUrlForEntry(name) : undefined,
  };

  if (!collapsible) {
    return (
      <div className={cn('relative', className)}>
        <ComponentCode
          actions={actions}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        actions={actions}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  );
}

function ComponentCode({
  actions,
  highlightedCode,
  language,
  title,
}: {
  actions: React.ComponentProps<typeof ComponentActions>;
  highlightedCode: string;
  language: string;
  title: string | undefined;
}) {
  return (
    <figure data-rehype-pretty-code-figure='' className='[&>pre]:max-h-96'>
      {title && (
        <figcaption
          data-rehype-pretty-code-title=''
          className='text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70'
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <ComponentActions {...actions} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}
