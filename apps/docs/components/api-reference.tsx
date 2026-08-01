/**
 * Renders a component's API reference from registry metadata.
 *
 * Replaces the hand-written pipe tables these pages used to carry. The markup is
 * deliberately the same plain `<table>`/`<h3>` the MDX produced, so the existing
 * overrides in `mdx-components.tsx` style it and the pages look unchanged — the
 * difference is that the same data now also reaches `/r/<name>.json` and the
 * Markdown build without being retyped.
 *
 * Pages whose API section is shaped differently — method tables, event tables,
 * inline type literals — keep their hand-written MDX and never reach here.
 */
import * as React from 'react';
import { REGISTRY } from '@bna-ui/registry';
import type { TypeDoc, VariantGroup } from '@bna-ui/registry';

import { cn } from '@/lib/utils';

export function ApiReference({ name }: { name: string }) {
  const meta = REGISTRY[name]?.meta;

  if (!meta?.types?.length && !meta?.variants?.length) {
    return <MissingMeta name={name} what='API reference' />;
  }

  return (
    <>
      {meta.types?.map((type) => (
        <TypeTable key={type.name} type={type} />
      ))}
      {meta.variants?.map((group) => (
        <VariantList key={group.name} group={group} />
      ))}
    </>
  );
}

function TypeTable({ type }: { type: TypeDoc }) {
  // Only render the columns this table uses, so a type documented without
  // defaults does not gain a column of dashes.
  const hasDefault = type.props.some((prop) => prop.default);
  const hasRequired = type.props.some((prop) => prop.required !== undefined);

  const headers = [
    'Prop',
    'Type',
    ...(hasRequired ? ['Required'] : []),
    ...(hasDefault ? ['Default'] : []),
    'Description',
  ];

  return (
    <>
      <Heading>{type.name}</Heading>
      {type.description && (
        <p className='leading-relaxed [&:not(:first-child)]:mt-6'>
          <Inline text={type.description} />
        </p>
      )}
      <div className='my-6 w-full overflow-y-auto'>
        <table className='relative w-full overflow-hidden border-none text-sm'>
          <thead>
            <tr className='last:border-b-none m-0 border-b'>
              {headers.map((label) => (
                <th key={label} className='px-4 py-2 text-left font-bold'>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {type.props.map((prop) => (
              <tr key={prop.name} className='last:border-b-none m-0 border-b'>
                <td className='px-4 py-2 text-left'>
                  <Code>{prop.name}</Code>
                </td>
                <td className='px-4 py-2 text-left'>
                  <Inline text={prop.type} fallback='code' />
                </td>
                {hasRequired && (
                  <td className='px-4 py-2 text-left'>
                    {prop.required ? 'Yes' : 'No'}
                  </td>
                )}
                {hasDefault && (
                  <td className='px-4 py-2 text-left'>
                    {prop.default ? <Inline text={prop.default} /> : '-'}
                  </td>
                )}
                <td className='px-4 py-2 text-left'>
                  <Inline text={prop.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function VariantList({ group }: { group: VariantGroup }) {
  return (
    <>
      <Heading>{group.name}</Heading>
      {group.description && (
        <p className='leading-relaxed [&:not(:first-child)]:mt-6'>
          <Inline text={group.description} />
        </p>
      )}
      <ul className='my-6 ml-6 list-disc'>
        {group.values.map((variant) => (
          <li key={variant.value} className='mt-2'>
            <Code>{`'${variant.value}'`}</Code>
            {variant.description ? ` - ${variant.description}` : null}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Matches the `h3` override in `mdx-components.tsx`, including the slug the
 * `h2` override generates, so the table of contents keeps linking to these.
 */
function Heading({ children }: { children: string }) {
  return (
    <h3
      id={children.replace(/ /g, '-').replace(/'/g, '').toLowerCase()}
      className='font-heading mt-8 scroll-m-28 text-xl font-semibold tracking-tight'
    >
      {children}
    </h3>
  );
}

function Code({ children, className }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem]',
        className
      )}
    >
      {children}
    </code>
  );
}

/**
 * Registry strings that may carry Markdown code spans.
 *
 * Descriptions inherited them from the tables they were migrated out of, and a
 * few types are annotated — "`SwitchProps` (from React Native)". Backticks are
 * the only Markdown that appears in this corpus, so splitting on them is enough
 * and is a great deal safer than running a Markdown renderer over registry data.
 *
 * `fallback='code'` wraps a value with no backticks of its own in a code span,
 * which is what a bare type wants.
 */
function Inline({ text, fallback }: { text: string; fallback?: 'code' }) {
  if (fallback === 'code' && !text.includes('`')) return <Code>{text}</Code>;

  return (
    <>
      {text
        .split(/(`[^`]+`)/g)
        .map((part, i) =>
          part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
            <Code key={i}>{part.slice(1, -1)}</Code>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
    </>
  );
}

export function Usage({ name }: { name: string }) {
  const usage = REGISTRY[name]?.meta?.usage;
  if (!usage) return <MissingMeta name={name} what='usage' />;

  return (
    <>
      <UsageBlock code={usage.import} />
      <UsageBlock code={usage.snippet} />
    </>
  );
}

/**
 * Server-highlighted usage snippet.
 *
 * Kept as a separate async component so `ApiReference` itself stays synchronous
 * — the tables need no highlighting and would otherwise pay for Shiki.
 */
async function UsageBlock({ code }: { code: string }) {
  const { highlightCode } = await import('@/lib/highlight-code');
  const { CopyButton } = await import('@/components/copy-button');
  const html = await highlightCode(code, 'tsx');

  return (
    <figure data-rehype-pretty-code-figure='' className='relative'>
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}

export function Accessibility({ name }: { name: string }) {
  const a11y = REGISTRY[name]?.meta?.accessibility;
  if (!a11y) return <MissingMeta name={name} what='accessibility notes' />;

  return (
    <>
      {a11y.summary && (
        <p className='leading-relaxed [&:not(:first-child)]:mt-6'>
          {a11y.summary}
        </p>
      )}
      <ul className='my-6 ml-6 list-disc'>
        {a11y.items.map((item) => (
          <li key={item} className='mt-2'>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Visible rather than silent. A blank section reads as a styling bug; the same
 * failure is what `scripts/check-ai-artifacts.mjs` turns into a build error.
 */
function MissingMeta({ name, what }: { name: string; what: string }) {
  return (
    <p className='text-muted-foreground text-sm'>
      No {what} in the registry for <Code>{name}</Code>.
    </p>
  );
}
