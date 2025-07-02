import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeSizes() {
  return (
    <View style={{ gap: 16 }}>
      {/* Extra Small */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, fontSize: 14 }}>Extra Small:</Text>
        <Badge
          style={{
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
          textStyle={{ fontSize: 11 }}
        >
          XS
        </Badge>
        <Badge
          variant='success'
          style={{
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
          textStyle={{ fontSize: 11 }}
        >
          New
        </Badge>
      </View>

      {/* Small */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, fontSize: 14 }}>Small:</Text>
        <Badge
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          textStyle={{ fontSize: 12 }}
        >
          Small
        </Badge>
        <Badge
          variant='secondary'
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          textStyle={{ fontSize: 12 }}
        >
          Beta
        </Badge>
      </View>

      {/* Default */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, fontSize: 14 }}>Default:</Text>
        <Badge>Default</Badge>
        <Badge variant='outline'>Outline</Badge>
      </View>

      {/* Large */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, fontSize: 14 }}>Large:</Text>
        <Badge
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          textStyle={{ fontSize: 16, fontWeight: '600' }}
        >
          Large
        </Badge>
        <Badge
          variant='destructive'
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          textStyle={{ fontSize: 16, fontWeight: '600' }}
        >
          Important
        </Badge>
      </View>

      {/* Extra Large */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, fontSize: 14 }}>Extra Large:</Text>
        <Badge
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 12,
          }}
          textStyle={{ fontSize: 18, fontWeight: 'bold' }}
        >
          XL Badge
        </Badge>
      </View>
    </View>
  );
}
