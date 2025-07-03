import { Button } from '@/components/ui/button';
import React from 'react';

export function ButtonDemo() {
  return (
    <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
  );
}
