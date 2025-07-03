// registry/demo/video-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { VideoDemo } from '@/docs/examples/video/video-demo';
import { VideoNativeControls } from '@/docs/examples/video/video-native-controls';
import { VideoCustomControls } from '@/docs/examples/video/video-custom-controls';
import { VideoSubtitles } from '@/docs/examples/video/video-subtitles';
import { VideoAutoplayLoop } from '@/docs/examples/video/video-autoplay-loop';
import { VideoSources } from '@/docs/examples/video/video-sources';
import { VideoGestures } from '@/docs/examples/video/video-gestures';
import { VideoContentFit } from '@/docs/examples/video/video-content-fit';

// Main demo screen combining all video demo
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

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Player
        </Text>
        <VideoDemo />
      </View> */}

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

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sources
        </Text>
        <VideoSources />
      </View>
    </View>
  );
}
