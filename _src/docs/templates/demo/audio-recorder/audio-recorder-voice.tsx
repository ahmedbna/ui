import { AudioRecorder } from '@/components/ui/audio-recorder';

export function AudioRecorderVoice() {
  const handleRecordingComplete = (uri: string) => {
    // Here you could add the voice note to a list or send it
    console.log('Voice note saved:', uri);
  };

  return (
    <AudioRecorder
      quality='low'
      showWaveform={true}
      showTimer={true}
      maxDuration={120} // 2 minutes for voice notes
      onRecordingComplete={handleRecordingComplete}
    />
  );
}
