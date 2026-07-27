import { AudioPlayer } from '@/components/ui/audio-player';
import { useColor } from '@/hooks/useColor';

export function AudioPlayerStyled() {
  const blue = useColor('indigo');

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
      style={{
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: blue,
      }}
    />
  );
}
