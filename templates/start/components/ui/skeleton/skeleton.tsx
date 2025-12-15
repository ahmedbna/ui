import { View, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton as MotiSkeleton } from 'moti/skeleton';
import { useColorScheme } from 'react-native';
import { useColor } from '@/hooks/useColor';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: number;
    style?: ViewStyle;
}

export const Skeleton = ({ width, height = 20, radius = 4, style }: SkeletonProps) => {
    const colorScheme = useColorScheme();
    const mode = colorScheme === 'dark' ? 'dark' : 'light';
    const bgColor = useColor('secondary'); // Base container bg
    return (
        <MotiView
            transition={{
                type: 'timing',
            }}
            style={[
                styles.container,
                { width: width as any, height: height as any, borderRadius: radius, backgroundColor: bgColor },
                style
            ]}
        >
            <MotiSkeleton colorMode={mode} width={'100%'} height={'100%'} radius={radius} />
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
