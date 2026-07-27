import { Video } from '@/components/ui/video';

export function VideoDemo() {
  return (
    <Video
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/',
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
