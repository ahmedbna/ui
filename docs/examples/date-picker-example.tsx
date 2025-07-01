// registry/examples/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { DatePickerConstraints } from '@/docs/demo/date-picker/date-picker-constraints';
import { DatePickerDateTime } from '@/docs/demo/date-picker/date-picker-datetime';
import { DatePickerDemo } from '@/docs/demo/date-picker/date-picker-demo';
import { DatePickerForm } from '@/docs/demo/date-picker/date-picker-form';
import { DatePickerFormats } from '@/docs/demo/date-picker/date-picker-formats';
import { DatePickerTime } from '@/docs/demo/date-picker/date-picker-time';
import { DatePickerVariants } from '@/docs/demo/date-picker/date-picker-variants';

// Main demo screen combining all examples
export function DatePickerExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Date Picker
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Date Picker
        </Text>
        <DatePickerDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Time Picker
        </Text>
        <DatePickerTime />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Date Time Picker
        </Text>
        <DatePickerDateTime />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Constraints
        </Text>
        <DatePickerConstraints />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Variants
        </Text>
        <DatePickerVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Time Formats
        </Text>
        <DatePickerFormats />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Form Integration
        </Text>
        <DatePickerForm />
      </View>
    </View>
  );
}
