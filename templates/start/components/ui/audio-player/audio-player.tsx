import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Button } from '../button';
import { Text } from '../text';
import { Play, Pause, AlertCircle } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';

interface AudioPlayerProps {
  uri?: string | null;
}

export const AudioPlayer = ({ uri }: AudioPlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const primaryColor = useColor('primary');
  const mutedColor = useColor('mutedForeground');
  const backgroundColor = useColor('background');
  const borderColor = useColor('border');

  useEffect(() => {
    return () => {
      // Unload sound when unmounting
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // If URI changes, unload previous and reset
  useEffect(() => {
    if (sound) {
        sound.unloadAsync();
        setSound(undefined);
        setIsPlaying(false);
        setError(null);
    }
  }, [uri]);

  async function playSound() {
    if (!uri) return;
    try {
      if (sound) {
        // Resume
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        // Load and play
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                if (status.didJustFinish) {
                    setIsPlaying(false);
                    newSound.setPositionAsync(0);
                }
            } else if (status.error) {
                console.error(`Player Error: ${status.error}`);
                setError('Playback error');
            }
        });
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error('Failed to play sound', e);
      setError('Could not load audio');
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  if (!uri) {
      return (
          <View style={[styles.container, { opacity: 0.5 }]}>
              <Text style={{ color: mutedColor }}>No audio selected</Text>
          </View>
      )
  }

  return (
    <View style={[styles.container, { borderColor, backgroundColor }]}>
      {error ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <AlertCircle size={20} color={Colors.red[500]} />
              <Text style={{ color: Colors.red[500] }}>{error}</Text>
          </View>
      ) : (
        <View style={styles.controls}>
            <View style={{ flex: 1 }}>
                <Text variant="caption" numberOfLines={1} style={{ color: mutedColor }}>
                    {uri.split('/').pop()}
                </Text>
            </View>
            <Button
                variant={isPlaying ? "secondary" : "default"}
                size="sm"
                icon={isPlaying ? Pause : Play}
                onPress={isPlaying ? pauseSound : playSound}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    marginVertical: 5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});
