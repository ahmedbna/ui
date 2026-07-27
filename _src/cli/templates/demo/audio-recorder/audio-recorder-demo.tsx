import { AudioRecorder } from '@/components/ui/audio-recorder';

export function AudioRecorderDemo() {
  const handleRecordingComplete = (uri: string) => {
    console.log('Recording saved to:', uri);
  };

  const handleRecordingStart = () => {
    console.log('Recording started');
  };

  const handleRecordingStop = () => {
    console.log('Recording stopped');
  };

  return (
    <AudioRecorder
      quality='high'
      showWaveform={true}
      showTimer={true}
      maxDuration={300} // 5 minutes
      onRecordingComplete={handleRecordingComplete}
      onRecordingStart={handleRecordingStart}
      onRecordingStop={handleRecordingStop}
    />
  );
}
