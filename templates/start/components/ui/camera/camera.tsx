import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera as CameraIcon, RotateCcw } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

export const Camera = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const textColor = useColor('foreground');
    const backgroundColor = useColor('background');

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={{ textAlign: 'center', marginBottom: 10, color: textColor }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission}>Grant Permission</Button>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <CameraView style={styles.camera} facing={facing}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <View style={styles.pill}>
                                <RotateCcw color="white" size={20} />
                                <Text style={styles.text}>Flip</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 300,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
        marginBottom: 30,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
});
