import { AudioRecorder } from '@/components/ui/audio-recorder';

export function AudioRecorderMinimal() {
  const handleRecordingComplete = (uri: string) => {
    console.log('Your audio has been recorded.', uri);
  };

  return (
    <AudioRecorder
      quality='low'
      showWaveform={false}
      showTimer={true}
      maxDuration={60} // 1 minute
      onRecordingComplete={handleRecordingComplete}
    />
  );
}
