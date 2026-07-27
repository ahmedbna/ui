import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import React from 'react';

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content. It provides additional
          context about what this card contains.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This is the main content area of the card. You can put any content
          here including text, images, forms, or other components.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant='outline'>Cancel</Button>
        <Button style={{ flex: 1 }}>Confirm</Button>
      </CardFooter>
    </Card>
  );
}
