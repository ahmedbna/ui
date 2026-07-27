import { AudioPlayer } from '@/components/ui/audio-player';

export function AudioPlayerDemo() {
  // Sample audio URL - replace with your actual audio source
  const sampleAudioUrl =
    'https://www.thesoundarchive.com/ringtones/old-phone-ringing.wav';

  return (
    <AudioPlayer
      source={{ uri: sampleAudioUrl }}
      showControls={true}
      showWaveform={true}
      showTimer={true}
      showProgressBar={true}
      autoPlay={false}
      onPlaybackStatusUpdate={(status) => {
        console.log('Playback status:', status);
      }}
    />
  );
}
