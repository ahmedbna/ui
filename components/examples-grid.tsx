import React from 'react';

interface ExampleGridProps {
  children: React.ReactNode;
}

export function ExamplesGrid({ children }: ExampleGridProps) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>{children}</div>
  );
}
