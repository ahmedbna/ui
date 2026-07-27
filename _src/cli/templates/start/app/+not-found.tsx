import { Stack } from 'expo-router';

import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Text>This screen does not exist.</Text>
        <Link href='/'>Go to home screen!</Link>
      </View>
    </>
  );
}
