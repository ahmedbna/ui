import { View, StyleSheet } from 'react-native';
import { useColor } from '@/hooks/useColor';

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    thickness?: number;
    color?: string;
}

export const Separator = ({
    orientation = 'horizontal',
    thickness = 1,
    color
}: SeparatorProps) => {
    const defaultColor = useColor('border'); // assuming 'border' exists in theme or fallback

    return (
        <View
            style={[
                { backgroundColor: color || defaultColor || '#e5e7eb' },
                orientation === 'horizontal'
                    ? { width: '100%', height: thickness }
                    : { width: thickness, height: '100%' }
            ]}
        />
    );
};
