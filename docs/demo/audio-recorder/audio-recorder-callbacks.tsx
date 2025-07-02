import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useState } from 'react';

export function AudioRecorderCallbacks() {
  const [status, setStatus] = useState('Ready to record');
  const [recordingCount, setRecordingCount] = useState(0);

  const handleRecordingStart = () => {
    setStatus('🔴 Recording in progress...');
    console.log('Recording started');
  };

  const handleRecordingStop = () => {
    setStatus('✅ Recording stopped');
    console.log('Recording stopped');
  };

  const handleRecordingComplete = (uri: string) => {
    setRecordingCount((prev) => prev + 1);
    setStatus(`📁 Recording #${recordingCount + 1} saved`);

    // Reset status after 3 seconds
    setTimeout(() => setStatus('Ready to record'), 3000);
  };

  const getOrdinalSuffix = (num: number) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
  };

  return (
    <View style={{ width: '100%' }}>
      <Text
        variant='body'
        style={{ marginBottom: 16, textAlign: 'center', fontWeight: '500' }}
      >
        Status: {status}
      </Text>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={180} // 3 minutes
        onRecordingStart={handleRecordingStart}
        onRecordingStop={handleRecordingStop}
        onRecordingComplete={handleRecordingComplete}
      />

      {recordingCount > 0 && (
        <Text variant='caption' style={{ marginTop: 12, textAlign: 'center' }}>
          Total recordings: {recordingCount}
        </Text>
      )}
    </View>
  );
}
