// registry/examples/video-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { VideoDemo } from '@/docs/demo/video/video-demo';
import { VideoNativeControls } from '@/docs/demo/video/video-native-controls';
import { VideoCustomControls } from '@/docs/demo/video/video-custom-controls';
import { VideoSubtitles } from '@/docs/demo/video/video-subtitles';
import { VideoAutoplayLoop } from '@/docs/demo/video/video-autoplay-loop';
import { VideoSources } from '@/docs/demo/video/video-sources';
import { VideoGestures } from '@/docs/demo/video/video-gestures';
import { VideoContentFit } from '@/docs/demo/video/video-content-fit';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all video examples
export function VideoExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Video
      </Text>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Player
        </Text>
        <VideoDemo />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Native Controls
        </Text>
        <VideoNativeControls />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Controls
        </Text>
        <VideoCustomControls />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Subtitles
        </Text>
        <VideoSubtitles />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Autoplay & Loop
        </Text>
        <VideoAutoplayLoop />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Gesture Controls
        </Text>
        <VideoGestures />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Content Fit Options
        </Text>
        <VideoContentFit />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sources
        </Text>
        <VideoSources />
      </View> */}
    </View>
  );
}
