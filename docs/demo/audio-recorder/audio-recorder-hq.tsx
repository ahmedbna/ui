import { AudioRecorder } from '@/components/ui/audio-recorder';
import { RecordingPresets } from 'expo-audio';

export function AudioRecorderHQ() {
  const handleRecordingComplete = (uri: string) => {
    console.log('HQ recording saved:', uri);
  };

  return (
    <AudioRecorder
      quality='high'
      showWaveform={true}
      showTimer={true}
      maxDuration={1800} // 30 minutes
      customRecordingOptions={{
        ...RecordingPresets.HIGH_QUALITY,
        sampleRate: 48000,
        bitRate: 192000,
        numberOfChannels: 2,
      }}
      onRecordingComplete={handleRecordingComplete}
    />
  );
}
