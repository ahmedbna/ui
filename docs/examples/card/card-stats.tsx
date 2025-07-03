import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function CardStats() {
  const stats = [
    { title: 'Total Users', value: '12,543', change: '+12%' },
    { title: 'Revenue', value: '$45,231', change: '+8%' },
    { title: 'Orders', value: '1,234', change: '+23%' },
    { title: 'Growth', value: '15.3%', change: '+4%' },
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {stats.map((stat, index) => (
        <Card key={index} style={{ flex: 1, minWidth: 150 }}>
          <CardHeader>
            <CardTitle style={{ fontSize: 16 }}>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
              {stat.value}
            </Text>
            <Text style={{ color: '#22c55e', fontSize: 14 }}>
              {stat.change} from last month
            </Text>
          </CardContent>
        </Card>
      ))}
    </View>
  );
}
