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
import { View } from '@/components/ui/view';
import React from 'react';
import { Image } from 'react-native';

export function CardWithImage() {
  return (
    <Card>
      <View style={{ borderRadius: 26, overflow: 'hidden', marginBottom: 16 }}>
        <Image
          source={{ uri: 'https://picsum.photos/350/200' }}
          style={{ width: '100%', height: 300 }}
          resizeMode='cover'
        />
      </View>
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardDescription>
          A stunning view captured in the mountains during golden hour.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This image showcases the beauty of nature with its vibrant colors and
          serene atmosphere.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant='outline'>Share</Button>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
}
