import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TabsDisabled() {
  return (
    <Tabs defaultValue='available' style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value='available'>Available</TabsTrigger>
        <TabsTrigger value='pending'>Pending</TabsTrigger>
        <TabsTrigger value='premium' disabled>
          Premium
        </TabsTrigger>
        <TabsTrigger value='enterprise' disabled>
          Enterprise
        </TabsTrigger>
      </TabsList>

      <TabsContent value='available'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Available Features
          </Text>
          <Text variant='body'>
            These features are currently available to you.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='pending'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Pending Features
          </Text>
          <Text variant='body'>
            These features are being processed and will be available soon.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='premium'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Premium Features
          </Text>
          <Text variant='body'>Upgrade to access premium features.</Text>
        </View>
      </TabsContent>

      <TabsContent value='enterprise'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Enterprise Features
          </Text>
          <Text variant='body'>Contact sales for enterprise features.</Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
