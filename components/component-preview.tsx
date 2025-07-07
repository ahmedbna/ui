import { ComponentSource } from '@/components/component-source';
import { ComponentDialog } from '@/components/component-dialog';
import { Index } from '@/templates/__index__';

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
  const preview = Index[name]?.preview;
  const path = Index[name]?.files[0]?.path;
  const target = Index[name]?.files[0]?.target;

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
