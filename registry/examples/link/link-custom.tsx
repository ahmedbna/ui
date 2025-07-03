import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ExternalLink, HomeIcon, Mail } from 'lucide-react-native';
import React from 'react';

export function LinkCustom() {
  return (
    <View style={{ gap: 16 }}>
      <Link href='/' asChild>
        <Button icon={HomeIcon}>Welcome</Button>
      </Link>

      <Link href='https://github.com'>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 12,
            backgroundColor: 'red',
            borderRadius: 8,
          }}
        >
          <ExternalLink size={16} color='#fff' />
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            External Link
          </Text>
        </View>
      </Link>

      <Link href='mailto:contact@example.com' asChild>
        <Button variant='success' icon={Mail}>
          Send Email
        </Button>
      </Link>
    </View>
  );
}
