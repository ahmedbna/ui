import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Award, Heart, Star, Zap } from 'lucide-react-native';

export function CarouselArrows() {
  const slides = [
    {
      icon: Heart,
      title: 'Loved by Users',
      description: 'Thousands of happy customers worldwide trust our products.',
      color: '#fee2e2',
      bg: '#FF6B6B',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with smooth animations.',
      color: '#f3e8ff',
      bg: '#8b5cf6',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Built with the highest standards and attention to detail.',
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in design and functionality.',
      color: '#d1fae5',
      bg: '#4ECDC4',
    },
  ];

  return (
    <Carousel showArrows showIndicators loop>
      {slides.map((slide, index) => {
        const name = slide.icon;
        return (
          <CarouselItem
            key={index}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 220,
              backgroundColor: slide.bg,
              padding: 20,
            }}
          >
            <Icon name={name} size={48} color={slide.color} />
            <Text
              variant='title'
              style={{
                color: slide.color,
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              {slide.title}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: slide.color,
                fontSize: 14,
                lineHeight: 20,
              }}
            >
              {slide.description}
            </Text>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
