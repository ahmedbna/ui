import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { XStack, YStack, ZStack } from '@/components/ui/stack';

export default function StackDemo() {
  return (
    <YStack gap={16} padding={16}>
      <Text style={{ fontWeight: '600', fontSize: 16 }}>XStack (row)</Text>
      <XStack gap={8} center>
        <View style={{ width: 40, height: 40, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: '#22c55e', borderRadius: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: '#f59e0b', borderRadius: 8 }} />
      </XStack>

      <Text style={{ fontWeight: '600', fontSize: 16, marginTop: 8 }}>YStack (column)</Text>
      <YStack gap={8}>
        <View style={{ height: 24, backgroundColor: '#e5e7eb', borderRadius: 6 }} />
        <View style={{ height: 24, backgroundColor: '#d1d5db', borderRadius: 6 }} />
        <View style={{ height: 24, backgroundColor: '#9ca3af', borderRadius: 6 }} />
      </YStack>

      <Text style={{ fontWeight: '600', fontSize: 16, marginTop: 8 }}>ZStack (overlay)</Text>
      <ZStack height={100} borderRadius={10} overflow="hidden">
        <View style={{ flex: 1, backgroundColor: '#93c5fd' }} />
        <View style={{ flex: 1, backgroundColor: '#00000020' }} />
        <View
          pointerEvents="none"
          style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: '#111827cc', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}
        >
          <Text style={{ color: 'white', fontSize: 12 }}>Overlay</Text>
        </View>
      </ZStack>
    </YStack>
  );
}
