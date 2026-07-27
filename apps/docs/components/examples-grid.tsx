import React from 'react';

interface ExampleGridProps {
  children: React.ReactNode;
}

export function ExamplesGrid({ children }: ExampleGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  mt-8'>{children}</div>
  );
}
