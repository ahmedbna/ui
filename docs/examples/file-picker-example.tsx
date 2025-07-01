// registry/examples/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { FilePickerDemo } from '@/docs/demo/file-picker/file-picker-demo';
import { FilePickerControlled } from '@/docs/demo/file-picker/file-picker-controlled';
import { FilePickerImages } from '@/docs/demo/file-picker/file-picker-images';
import { FilePickerInfo } from '@/docs/demo/file-picker/file-picker-info';
import { FilePickerSingle } from '@/docs/demo/file-picker/file-picker-single';
import { FilePickerStyled } from '@/docs/demo/file-picker/file-picker-styled';
import { FilePickerValidation } from '@/docs/demo/file-picker/file-picker-validation';

// Main demo screen combining all examples
export function FilePickerExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        File Picker
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default File Picker
        </Text>
        <FilePickerDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Image Only
        </Text>
        <FilePickerImages />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Single File
        </Text>
        <FilePickerSingle />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Validation
        </Text>
        <FilePickerValidation />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <FilePickerStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Controlled
        </Text>
        <FilePickerControlled />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With File Info
        </Text>
        <FilePickerInfo />
      </View>
    </View>
  );
}
