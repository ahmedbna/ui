import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function LinkStyled() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Default Styled</Text>
        <View style={{ gap: 6 }}>
          <Link href='/'>Default Link Style</Link>
          <Link href='https://example.com'>External Link</Link>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          Custom Text Styling
        </Text>
        <View style={{ gap: 6 }}>
          <Link href='/'>
            <Text
              style={{
                color: '#dc2626',
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}
            >
              Red Bold Link
            </Text>
          </Link>

          <Link href='/'>
            <Text
              style={{
                color: '#059669',
                fontSize: 18,
                fontStyle: 'italic',
              }}
            >
              Green Italic Link
            </Text>
          </Link>

          <Link href='https://github.com'>
            <Text
              style={{
                color: '#7c3aed',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Purple Uppercase
            </Text>
          </Link>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Inline Links</Text>
        <Text>
          This is a paragraph with an <Link href='/'>inline link</Link> that
          flows naturally with the text. You can also have{' '}
          <Link href='https://example.com'>external inline links</Link> in your
          content.
        </Text>
      </View>
    </View>
  );
}
