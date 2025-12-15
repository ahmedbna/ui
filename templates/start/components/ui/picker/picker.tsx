import { View, StyleSheet, Platform } from 'react-native';
import { Picker as NativePicker } from '@react-native-picker/picker';
import { Text } from '../text';

interface PickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string, itemIndex: number) => void;
    items: { label: string; value: string }[];
    label?: string;
}

export const Picker = ({ selectedValue, onValueChange, items, label }: PickerProps) => {
    return (
        <View style={styles.container}>
            {label && <Text variant="caption" style={{ marginBottom: 5 }}>{label}</Text>}
            <View style={styles.pickerWrapper}>
                <NativePicker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {items.map((item) => (
                        <NativePicker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </NativePicker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        // Example fix for Android/iOS consistency could go here
        ...(Platform.OS === 'android' ? { height: 50, justifyContent: 'center' } : {}),
    },
    picker: {
        width: '100%',
        ...(Platform.OS === 'ios' ? { height: 150 } : { color: '#000' }),
    },
});
