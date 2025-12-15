import { useState } from 'react';
import { View, Platform, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../button';
import { Text } from '../text';
import { Calendar } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
}

export const DatePicker = ({ value = new Date(), onChange }: DatePickerProps) => {
    const [date, setDate] = useState(value);
    const [show, setShow] = useState(false);
    const bgColor = useColor('background');
    const textColor = useColor('text');

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (onChange) {
            onChange(currentDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            <View style={styles.triggerRow}>
                <Button variant="outline" onPress={showDatepicker} icon={Calendar}>
                    {date.toLocaleDateString()}
                </Button>
                {Platform.OS === 'ios' && show && (
                   <View style={styles.iosPickerContainer}>
                       <DateTimePicker
                           testID="dateTimePicker"
                           value={date}
                           mode="date"
                           display="default"
                           onChange={onChangeDate}
                       />
                       <Button size="sm" variant="ghost" onPress={() => setShow(false)}>Done</Button>
                   </View>
                )}
            </View>

            {Platform.OS === 'android' && show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShow(false);
                        onChangeDate(event, selectedDate);
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    triggerRow: {
        alignItems: 'flex-start',
    },
    iosPickerContainer: {
        marginTop: 10,
        backgroundColor: '#f3f4f6', // subtle bg for picker area
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    }
});
