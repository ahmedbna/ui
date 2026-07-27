// templates/demo/video-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { VideoSources } from '@/templates/demo/video/video-sources';

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
