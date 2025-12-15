import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../text';
import { useColor } from '@/hooks/useColor';

interface ToggleProps {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children: React.ReactNode;
}

export const Toggle = ({ pressed, onPressedChange, children }: ToggleProps) => {
    const [internalPressed, setInternalPressed] = useState(false);
    const isPressed = pressed !== undefined ? pressed : internalPressed;
    const primaryColor = useColor('primary');
    const backgroundColor = useColor('secondary'); // or muted

    const handlePress = () => {
        const newVal = !isPressed;
        if (onPressedChange) {
            onPressedChange(newVal);
        } else {
            setInternalPressed(newVal);
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor },
                isPressed && { backgroundColor: primaryColor + '20', borderColor: primaryColor }
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={{ opacity: isPressed ? 1 : 0.6 }}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',

    },
});
