import { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Button } from '../button';
import { Text } from '../text';
import { Play, Pause } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

interface VideoPlayerProps {
    uri?: string;
}

export const VideoPlayer = ({ uri }: VideoPlayerProps) => {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
    const backgroundColor = useColor('background');

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: uri || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(status)}
            />
            <View style={[styles.buttons, { backgroundColor }]}>
                <Button
                    size="sm"
                    icon={status.isLoaded && status.isPlaying ? Pause : Play}
                    onPress={() =>
                        status.isLoaded && status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync()
                    }
                >
                    {status.isLoaded && status.isPlaying ? 'Pause' : 'Play'}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
});
