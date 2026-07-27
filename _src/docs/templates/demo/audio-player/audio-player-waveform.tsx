import { AudioPlayer } from '@/components/ui/audio-player';

export function AudioPlayerWaveform() {
  const sampleAudioUrl =
    'https://www.thesoundarchive.com/ringtones/old-phone-ringing.wav';

  return (
    <AudioPlayer
      source={{ uri: sampleAudioUrl }}
      showControls={true}
      showWaveform={true}
      showTimer={true}
      showProgressBar={false}
      autoPlay={false}
    />
  );
}
