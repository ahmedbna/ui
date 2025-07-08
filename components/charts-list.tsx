import Link from 'next/link';

import { source } from '@/lib/source';
import { Button } from '@/components/ui/button';

export function ChartsList() {
  const components = source.pageTree.children.find(
    (page) => page.$id === 'charts'
  );

  if (components?.type !== 'folder') {
    return;
  }

  const list = components.children.filter(
    (component) => component.type === 'page'
  );

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20'>
      {list.map((component) => (
        <Button
          asChild
          variant='ghost'
          className='px-3 text-lg text-start justify-start font-medium'
          key={component.$id}
        >
          <Link key={component.$id} href={component.url}>
            {component.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
