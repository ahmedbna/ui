// docs/demo/audio-recorder-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

import { AudioRecorderInterview } from '@/templates/demo/audio-recorder/audio-recorder-interview';

export function AudioRecorderExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        AudioPlayer
      </Text>

      {/* <View>
        <Text variant='title'>Default</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Full-featured recorder with real-time waveform and playback
        </Text>
        <AudioRecorderDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Voice Notes</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Optimized for quick voice messages with time limits
        </Text>
        <AudioRecorderVoice />
      </View> */}

      {/* <View>
        <Text variant='title'>High Quality</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Professional quality recording for music and interviews
        </Text>
        <AudioRecorderHQ />
      </View> */}

      {/* <View>
        <Text variant='title'>Minimal</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Clean interface without waveform visualization
        </Text>
        <AudioRecorderMinimal />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Styled</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Recorder with custom styling and branding
        </Text>
        <AudioRecorderStyled />
      </View> */}

      {/* <View>
        <Text variant='title'>With Callbacks</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Comprehensive callback handling and status tracking
        </Text>
        <AudioRecorderCallbacks />
      </View> */}

      {/* <View>
        <Text variant='title'>Cloud Integration</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Automatic upload to cloud storage after recording
        </Text>
        <AudioRecorderCloud />
      </View> */}

      <View>
        <Text variant='title'>Interview Mode</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Professional recorder for long-form interviews and meetings
        </Text>
        <AudioRecorderInterview />
      </View>
    </View>
  );
}
