import { AudioPlayer } from '@/components/ui/audio-player';

export function AudioPlayerAutoplay() {
  const sampleAudioUrl =
    'https://www.thesoundarchive.com/ringtones/old-phone-ringing.wav';

  return (
    <AudioPlayer
      source={{ uri: sampleAudioUrl }}
      showControls={true}
      showWaveform={true}
      showTimer={true}
      showProgressBar={true}
      autoPlay={true}
      onPlaybackStatusUpdate={(status) => {
        if (status.isLoaded && status.playing) {
          console.log('Auto-playing audio');
        }
      }}
    />
  );
}
