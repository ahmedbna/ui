import { AudioPlayer } from '@/components/ui/audio-player';
import { useThemeColor } from '@/hooks/useThemeColor';

export function AudioPlayerStyled() {
  const blue = useThemeColor({}, 'indigo');

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
