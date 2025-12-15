import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Button } from '../button';
import { Text } from '../text';
import { Mic, Square, Play, RotateCcw } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';
import * as FileSystem from 'expo-file-system';

interface AudioRecorderProps {
  onRecordingComplete?: (uri: string) => void;
}

export const AudioRecorder = ({ onRecordingComplete }: AudioRecorderProps) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [duration, setDuration] = useState('00:00');
  const [intervalId, setIntervalId] = useState<any | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const errorColor = useColor('destructive');
  const primaryColor = useColor('primary');

  const mutedColor = useColor('mutedForeground');
  const borderColor = useColor('border');
  const backgroundColor = useColor('background');


  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        const permission = await requestPermission();
        if (permission.status !== 'granted') {
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingUri(null);
      setTimerSeconds(0);
      setDuration('00:00');

      const id = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          const mins = Math.floor(next / 60);
          const secs = next % 60;
          setDuration(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return next;
        });
      }, 1000);
      setIntervalId(id);

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    if (!recording) return;

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setRecording(null);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecordingUri(uri);
    if (uri && onRecordingComplete) {
      onRecordingComplete(uri);
    }
  }

  const handleReset = () => {
      setRecordingUri(null);
      setDuration('00:00');
      setTimerSeconds(0);
  }

  return (
    <View style={[styles.container, { borderColor, backgroundColor }]}>
      <View style={styles.statusContainer}>
        <View style={[styles.indicator, { backgroundColor: isRecording ? errorColor : mutedColor }]} />
        <Text variant="title" style={{ fontFamily: 'monospace' }}>{duration}</Text>
      </View>

      <View style={styles.controls}>
        {!isRecording ? (
          <Button
            variant={recordingUri ? "outline" : "default"}
            onPress={startRecording}
            icon={Mic}
          >
            {recordingUri ? 'Record Again' : 'Start Recording'}
          </Button>
        ) : (
          <Button
            variant="destructive"
            onPress={stopRecording}
            icon={Square}
          >
            Stop Recording
          </Button>
        )}
      </View>

      {recordingUri && (
          <Text variant="caption" style={{ marginTop: 10, color: mutedColor }}>
              File saved: {recordingUri.split('/').pop()}
          </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
});
