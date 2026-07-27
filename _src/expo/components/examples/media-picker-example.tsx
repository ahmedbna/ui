// templates/demo/media-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { MediaPickerQuality } from '@/templates/demo/media-picker/media-picker-quality';

// Main demo screen combining all demo
export function MediaPickerExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Media Picker
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <MediaPickerDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Images Only
        </Text>
        <MediaPickerImages />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Videos Only
        </Text>
        <MediaPickerVideos />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Multiple Selection
        </Text>
        <MediaPickerMultiple />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Gallery
        </Text>
        <MediaPickerGallery />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Preview
        </Text>
        <MediaPickerPreview />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Quality Settings
        </Text>
        <MediaPickerQuality />
      </View>
    </View>
  );
}
