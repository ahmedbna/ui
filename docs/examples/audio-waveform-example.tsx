import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

import { AudioWaveformCompact } from '@/docs/demo/audio-waveform/audio-waveform-compact';
import { AudioWaveformDemo } from '@/docs/demo/audio-waveform/audio-waveform-demo';
import { AudioWaveformInteractive } from '@/docs/demo/audio-waveform/audio-waveform-interactive';
import { AudioWaveformRealtime } from '@/docs/demo/audio-waveform/audio-waveform-realtime';
import { AudioWaveformRecording } from '@/docs/demo/audio-waveform/audio-waveform-recording';
import { AudioWaveformStyled } from '@/docs/demo/audio-waveform/audio-waveform-styled';

export function AudioWaveformExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Audio Waveform
      </Text>

      {/* <View>
        <Text variant='title'>Basic Audio Waveform</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Simple waveform with play/pause controls and progress tracking
        </Text>
        <AudioWaveformDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Interactive Seeking</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Touch-enabled waveform for scrubbing through audio content
        </Text>
        <AudioWaveformInteractive />
      </View> */}

      {/* <View>
        <Text variant='title'>Recording Mode</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Animated waveform for real-time recording visualization
        </Text>
        <AudioWaveformRecording />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Styling</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Multiple themed waveforms with different visual styles
        </Text>
        <AudioWaveformStyled />
      </View> */}

      {/* <View>
        <Text variant='title'>Real-time Data</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Live audio visualization with configurable wave patterns
        </Text>
        <AudioWaveformRealtime />
      </View> */}

      <View>
        <Text variant='title'>Compact Messages</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Minimal waveforms perfect for chat interfaces and voice messages
        </Text>
        <AudioWaveformCompact />
      </View>
    </View>
  );
}
