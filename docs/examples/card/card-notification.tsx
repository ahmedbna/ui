import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Bell } from 'lucide-react-native';
import React from 'react';

export function CardNotification() {
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#3b82f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={Bell} color='white' size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <CardTitle>New Notification</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <Text>
          You have a new message from John Doe. Click to view the full
          conversation and respond.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant='outline'>Dismiss</Button>
        <Button>View Message</Button>
      </CardFooter>
    </Card>
  );
}
