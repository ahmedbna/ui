// templates/demo/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { DatePickerForm } from '@/templates/demo/date-picker/date-picker-form';

// Main demo screen combining all demo
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
