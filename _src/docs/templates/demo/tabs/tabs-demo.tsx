import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TabsDemo() {
  return (
    <Tabs defaultValue='account' style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='followers'>Followers</TabsTrigger>
        <TabsTrigger value='following'>Following</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
        <TabsTrigger value='settings'>Settings</TabsTrigger>
        <TabsTrigger value='more'>More</TabsTrigger>
      </TabsList>

      <TabsContent value='account'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Account Settings
          </Text>
          <Text variant='body'>
            Manage your account information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='followers'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Followers
          </Text>
          <Text variant='body'>
            Manage your followers information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='following'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Following
          </Text>
          <Text variant='body'>
            Manage your following information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='password'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Password Settings
          </Text>
          <Text variant='body'>
            Change your password and security settings preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='settings'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            General Settings
          </Text>
          <Text variant='body'>
            Configure your application preferences and options.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='more'>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            More
          </Text>
          <Text variant='body'>
            Configure your application preferences and options.
          </Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
