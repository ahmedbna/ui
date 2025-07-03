import { Image } from '@/components/ui/image';

export function ImageDemo() {
  return (
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
      aspectRatio={1}
    />
  );
}
