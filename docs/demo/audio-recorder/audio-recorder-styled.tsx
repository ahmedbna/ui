import { AudioRecorder } from '@/components/ui/audio-recorder';

export function AudioRecorderStyled() {
  const handleRecordingComplete = (uri: string) => {
    console.log('🎵 Recording Complete', uri);
  };

  return (
    <AudioRecorder
      quality='high'
      showWaveform={true}
      showTimer={true}
      maxDuration={300}
      style={{
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 20,
        padding: 24,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}
      onRecordingComplete={handleRecordingComplete}
    />
  );
}
