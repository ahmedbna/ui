import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TextVariants() {
  return (
    <View style={{ gap: 20 }}>
      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          HEADING (28px, weight 700)
        </Text>
        <Text variant='heading'>
          The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          TITLE (24px, weight 700)
        </Text>
        <Text variant='title'>The quick brown fox jumps over the lazy dog</Text>
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          SUBTITLE (19px, weight 600)
        </Text>
        <Text variant='subtitle'>
          The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          BODY (16px, weight 400)
        </Text>
        <Text variant='body'>
          The quick brown fox jumps over the lazy dog. This is the default text
          variant used for body content and regular paragraphs.
        </Text>
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          CAPTION (16px, weight 400, muted)
        </Text>
        <Text variant='caption'>
          The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 4 }}>
          LINK (16px, weight 500, underlined)
        </Text>
        <Text variant='link'>The quick brown fox jumps over the lazy dog</Text>
      </View>
    </View>
  );
}
