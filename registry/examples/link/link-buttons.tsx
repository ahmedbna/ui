import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { View } from '@/components/ui/view';
import { ExternalLink, Settings, User } from 'lucide-react-native';
import React from 'react';

export function LinkButtons() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 12 }}>
        <Link href='/' asChild>
          <Button variant='default' icon={User}>
            View Profile
          </Button>
        </Link>

        <Link href='/' asChild>
          <Button variant='outline' icon={Settings}>
            Open Settings
          </Button>
        </Link>

        <Link href='https://github.com' browser='external' asChild>
          <Button variant='secondary' icon={ExternalLink}>
            Visit GitHub
          </Button>
        </Link>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
        <Link href='/' asChild>
          <Button variant='default' size='sm'>
            Dashboard
          </Button>
        </Link>

        <Link href='/' asChild>
          <Button variant='ghost' size='sm'>
            Help
          </Button>
        </Link>
      </View>

      <View style={{ gap: 8 }}>
        <Link href='/' asChild>
          <Button variant='destructive' size='lg'>
            Danger Zone
          </Button>
        </Link>

        <Link href='/' asChild>
          <Button variant='success' size='lg'>
            Success Action
          </Button>
        </Link>
      </View>

      <Link href='mailto:support@example.com' asChild>
        <Button variant='link' size='sm'>
          Contact
        </Button>
      </Link>
    </View>
  );
}
