import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeStatus() {
  const users = [
    { name: 'John Doe', status: 'online' },
    { name: 'Jane Smith', status: 'away' },
    { name: 'Bob Johnson', status: 'offline' },
    { name: 'Alice Brown', status: 'busy' },
  ];

  const orders = [
    { id: '#1234', status: 'pending' },
    { id: '#1235', status: 'processing' },
    { id: '#1236', status: 'shipped' },
    { id: '#1237', status: 'delivered' },
    { id: '#1238', status: 'cancelled' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant='success'>Online</Badge>;
      case 'away':
        return (
          <Badge
            style={{ backgroundColor: '#f59e0b' }}
            textStyle={{ color: 'white' }}
          >
            Away
          </Badge>
        );
      case 'busy':
        return <Badge variant='destructive'>Busy</Badge>;
      case 'offline':
        return <Badge variant='outline'>Offline</Badge>;
      case 'pending':
        return (
          <Badge
            style={{ backgroundColor: '#6b7280' }}
            textStyle={{ color: 'white' }}
          >
            Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge
            style={{ backgroundColor: '#3b82f6' }}
            textStyle={{ color: 'white' }}
          >
            Processing
          </Badge>
        );
      case 'shipped':
        return (
          <Badge
            style={{ backgroundColor: '#8b5cf6' }}
            textStyle={{ color: 'white' }}
          >
            Shipped
          </Badge>
        );
      case 'delivered':
        return <Badge variant='success'>Delivered</Badge>;
      case 'cancelled':
        return <Badge variant='destructive'>Cancelled</Badge>;
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  return (
    <View style={{ gap: 24 }}>
      {/* User Status */}
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
          User Status
        </Text>
        <View style={{ gap: 8 }}>
          {users.map((user, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 4,
              }}
            >
              <Text style={{ flex: 1 }}>{user.name}</Text>
              {getStatusBadge(user.status)}
            </View>
          ))}
        </View>
      </View>

      {/* Order Status */}
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
          Order Status
        </Text>
        <View style={{ gap: 8 }}>
          {orders.map((order, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 4,
              }}
            >
              <Text style={{ flex: 1 }}>Order {order.id}</Text>
              {getStatusBadge(order.status)}
            </View>
          ))}
        </View>
      </View>

      {/* Priority Levels */}
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
          Priority Levels
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge
            style={{ backgroundColor: '#ef4444' }}
            textStyle={{ color: 'white', fontWeight: '600' }}
          >
            High Priority
          </Badge>
          <Badge
            style={{ backgroundColor: '#f59e0b' }}
            textStyle={{ color: 'white', fontWeight: '600' }}
          >
            Medium Priority
          </Badge>
          <Badge
            style={{ backgroundColor: '#10b981' }}
            textStyle={{ color: 'white', fontWeight: '600' }}
          >
            Low Priority
          </Badge>
        </View>
      </View>
    </View>
  );
}
