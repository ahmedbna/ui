import { Video } from '@/components/ui/video';

export function VideoDemo() {
  return (
    <Video
      source={{
        uri: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8,
      }}
      autoPlay={false}
      loop={false}
      muted={false}
      showControls={true}
    />
  );
}
