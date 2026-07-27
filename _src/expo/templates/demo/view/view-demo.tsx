import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';

export function ViewDemo() {
  return (
    <View
      style={{
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: BORDER_RADIUS,
      }}
    />
  );
}
