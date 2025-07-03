import { ComponentPreviewTabs } from '@/components/component-preview-tabs';
import { ComponentSource } from '@/components/component-source';
import { Index } from '@/registry/__index__';

export function ComponentPreview({
  name,
  className,
  asset,
  align = 'center',
  hideCode = false,
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  align?: 'center' | 'start' | 'end';
  asset?: string;
  description?: string;
  hideCode?: boolean;
}) {
  const preview = Index[name]?.preview;

  if (!preview) {
    return (
      <p className='text-muted-foreground text-sm'>
        Component{' '}
        <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'>
          {name}
        </code>{' '}
        does not have a preview available.
      </p>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      preview={preview}
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  );
}
