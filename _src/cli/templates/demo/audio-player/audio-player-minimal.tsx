import { AudioPlayer } from '@/components/ui/audio-player';

export function AudioPlayerMinimal() {
  const sampleAudioUrl =
    'https://www.thesoundarchive.com/ringtones/old-phone-ringing.wav';

  return (
    <AudioPlayer
      source={{ uri: sampleAudioUrl }}
      showControls={true}
      showWaveform={false}
      showTimer={false}
      showProgressBar={true}
      autoPlay={false}
    />
  );
}
