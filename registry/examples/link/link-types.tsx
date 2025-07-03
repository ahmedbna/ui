import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function LinkTypes() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          Internal Navigation
        </Text>
        <View style={{ gap: 6 }}>
          <Link href='/'>Home Page</Link>
          <Link href='/'>About Us</Link>
          <Link href={{ pathname: '/', params: { id: '123' } }}>
            Product Details
          </Link>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>External URLs</Text>
        <View style={{ gap: 6 }}>
          <Link href='https://google.com'>Google</Link>
          <Link href='http://example.com'>Example Site</Link>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          Communication Links
        </Text>
        <View style={{ gap: 6 }}>
          <Link href='mailto:hello@example.com'>Send Email</Link>
          <Link href='tel:+1234567890'>Call Phone</Link>
          <Link href='mailto:support@company.com?subject=Help Request'>
            Email with Subject
          </Link>
          <Link href='sms:+1234567890'>Send SMS</Link>
        </View>
      </View>
    </View>
  );
}
