import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';

export function CarouselDemo() {
  return (
    <Carousel
      showIndicators={true}
      showArrows={true}
      autoPlay={true}
      loop={true}
    >
      {slides.map((slide) => (
        <CarouselItem
          key={slide.id}
          style={{
            minHeight: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text variant='subtitle'>{slide.title}</Text>
          <Text
            style={{
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            {slide.content}
          </Text>
        </CarouselItem>
      ))}
    </Carousel>
  );
}

const slides = [
  {
    id: 1,
    title: 'Full Width Slide 1',
    content: 'This slide takes the full width of the container',
  },
  {
    id: 2,
    title: 'Full Width Slide 2',
    content: 'Perfect for hero sections and main content',
  },
  {
    id: 3,
    title: 'Full Width Slide 3',
    content: 'Uses paging for smooth navigation',
  },
  {
    id: 4,
    title: 'Full Width Slide 4',
    content: 'Default behavior - no spacing needed',
  },
];
