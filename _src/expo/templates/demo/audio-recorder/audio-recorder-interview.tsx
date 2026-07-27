import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { RecordingPresets } from 'expo-audio';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

export function AudioRecorderInterview() {
  const [interviewTitle, setInterviewTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordingStart = () => {
    setIsRecording(true);
    const title = `Interview ${new Date().toLocaleDateString()}`;
    setInterviewTitle(title);
  };

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (uri: string) => {
    Alert.alert(
      '🎤 Interview Complete',
      `"${interviewTitle}" has been recorded and saved.\n\nDuration: Available in file metadata\nQuality: High (48kHz, Stereo)`,
      [{ text: 'Save & Exit' }]
    );
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.interviewHeader}>
        <Text variant='title' style={styles.interviewTitle}>
          {interviewTitle || 'Ready for Interview'}
        </Text>

        <View
          style={[styles.statusBadge, isRecording && styles.recordingBadge]}
        >
          <Text
            style={[styles.statusText, isRecording && styles.recordingText]}
          >
            {isRecording ? '🔴 LIVE' : '⏸️ READY'}
          </Text>
        </View>
      </View>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={7200} // 2 hours for long interviews
        customRecordingOptions={{
          ...RecordingPresets.HIGH_QUALITY,
          sampleRate: 48000,
          bitRate: 128000,
          numberOfChannels: 2,
          isMeteringEnabled: true,
        }}
        onRecordingStart={handleRecordingStart}
        onRecordingStop={handleRecordingStop}
        onRecordingComplete={handleRecordingComplete}
      />

      <Text variant='caption' style={{ marginTop: 12, textAlign: 'center' }}>
        Maximum duration: 2 hours • High quality stereo recording
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  interviewHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  interviewTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  recordingBadge: {
    backgroundColor: '#fef2f2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  recordingText: {
    color: '#dc2626',
  },
});
