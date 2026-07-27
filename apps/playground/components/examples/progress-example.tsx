import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ProgressSteps } from '@/demo/progress/progress-steps';

// Main demo screen combining all demo
export function ProgressExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Progress
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ProgressDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Interactive
        </Text>
        <ProgressInteractive />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Heights
        </Text>
        <ProgressHeights />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Labels
        </Text>
        <ProgressLabels />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Animated Progress
        </Text>
        <ProgressAnimated />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Media Player Style
        </Text>
        <ProgressMedia />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Step Progress
        </Text>
        <ProgressSteps />
      </View>
    </View>
  );
}
