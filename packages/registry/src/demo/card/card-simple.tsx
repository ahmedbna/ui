import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import React from 'react';

export function CardSimple() {
  return (
    <Card>
      <CardContent>
        <Text>
          A simple card with just content. Perfect for displaying basic
          information or messages.
        </Text>
      </CardContent>
    </Card>
  );
}
