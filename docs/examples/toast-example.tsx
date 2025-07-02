// registry/examples/toast-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ToastActions } from '@/docs/demo/toast/toast-actions';
import { ToastCompact } from '@/docs/demo/toast/toast-compact';
import { ToastDemo } from '@/docs/demo/toast/toast-demo';
import { ToastDuration } from '@/docs/demo/toast/toast-duration';
import { ToastMultiple } from '@/docs/demo/toast/toast-multiple';
import { ToastVariants } from '@/docs/demo/toast/toast-variants';

// Main demo screen combining all toast examples
export function ToastExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Toast
      </Text>

      {/* <View>
        <Text variant='title'>Default</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Basic toast with title and description
        </Text>
        <ToastDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Variants</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Different toast types with icons and colors
        </Text>
        <ToastVariants />
      </View> */}

      {/* <View>
        <Text variant='title'>With Actions</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Toasts with interactive action buttons
        </Text>
        <ToastActions />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Duration</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Control how long toasts stay visible
        </Text>
        <ToastDuration />
      </View> */}

      {/* <View>
        <Text variant='title'>Multiple Toasts</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Stack multiple toasts and manage them
        </Text>
        <ToastMultiple />
      </View> */}

      <View>
        <Text variant='title'>Compact Mode</Text>
        <Text variant='caption' style={{ marginBottom: 12 }}>
          Minimal toasts with icons only or title only
        </Text>
        <ToastCompact />
      </View>
    </View>
  );
}
