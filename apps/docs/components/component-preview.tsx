import { REGISTRY } from '@bna-ui/registry';
import { ComponentSource } from '@/components/component-source';
import { ComponentDialog } from '@/components/component-dialog';

export function ComponentPreview({
  name,
  description,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  description?: string;
  className?: string;
}) {
  const entry = REGISTRY[name];
  const preview = entry?.preview;
  const path = entry?.files[0]?.path;
  const target = entry?.files[0]?.target;

  if (!path) {
    return (
      <p className='text-muted-foreground text-sm'>
        Component{' '}
        <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'>
          {name}
        </code>{' '}
        does not Exits.
      </p>
    );
  }

  return (
    <ComponentDialog
      name={name}
      className={className}
      description={description}
      preview={preview}
      source={
        <ComponentSource name={name} title={target} collapsible={false} />
      }
      {...props}
    />
  );
}
