// Example usage of the fixed Carousel component
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { FONT_SIZE } from '@/theme/globals';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export function CarouselTestComponent() {
  const cardColor = useColor('card');

  const handleIndexChange = (index: number) => {
    // console.log('Current slide index:', index);
  };

  return (
    <View style={styles.container}>
      {/* Full-Width Carousel (Default Behavior) */}
      <View style={styles.container}>
        <Text variant='title' style={styles.sectionTitle}>
          Full-Width Carousel (Default)
        </Text>
        <Carousel
          showIndicators={true}
          showArrows={true}
          autoPlay={true}
          loop={true}
        >
          {slides.map((slide) => (
            <CarouselItem key={slide.id} style={styles.fullWidthSlide}>
              <Text variant='subtitle'>{slide.title}</Text>
              <Text style={styles.slideContent}>{slide.content}</Text>
            </CarouselItem>
          ))}
        </Carousel>
      </View>

      {/* Full Width Colorful */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Full Width Carousel</Text>
        <Carousel
          showArrows={true}
          showIndicators={true}
          loop={false}
          onIndexChange={handleIndexChange}
        >
          {testSlides.map((slide) => (
            <CarouselItem
              key={slide.id}
              style={[styles.testSlide, { backgroundColor: slide.color }]}
            >
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideSubtitle}>Full width slide</Text>
            </CarouselItem>
          ))}
        </Carousel>
      </View>

      {/* Custom Width Test */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Custom Width Carousel</Text>
        <Carousel
          itemWidth={300}
          spacing={16}
          showArrows={true}
          showIndicators={true}
          loop={true}
          onIndexChange={handleIndexChange}
        >
          {testSlides.map((slide) => (
            <CarouselItem
              key={slide.id}
              style={[styles.testSlide, { backgroundColor: slide.color }]}
            >
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideSubtitle}>Custom width: 300px</Text>
            </CarouselItem>
          ))}
        </Carousel>
      </View>

      {/* Testimonials Carousel */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Testimonials (Full Width)</Text>
        <Carousel autoPlay autoPlayInterval={5000} loop showIndicators>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <View
                style={{
                  backgroundColor: cardColor,
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Text variant='subtitle'>{testimonial.author}</Text>
                <Text variant='caption' style={styles.testimonialRole}>
                  {testimonial.role}
                </Text>
              </View>
            </CarouselItem>
          ))}
        </Carousel>
      </View>

      {/* Small Cards Carousel */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Small Cards Carousel</Text>
        <Carousel
          itemWidth={screenWidth * 0.6} // 60% width cards
          spacing={12}
          showIndicators={true}
          showArrows={false}
        >
          {features.map((feature) => (
            <CarouselItem key={feature.id} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text variant='subtitle'>{feature.title}</Text>
              <Text variant='caption' style={styles.featureDesc}>
                {feature.desc}
              </Text>
            </CarouselItem>
          ))}
        </Carousel>
      </View>
    </View>
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

const testSlides = [
  { id: 1, title: 'Slide 1', color: '#FF6B6B' },
  { id: 2, title: 'Slide 2', color: '#4ECDC4' },
  { id: 3, title: 'Slide 3', color: '#45B7D1' },
  { id: 4, title: 'Slide 4', color: '#96CEB4' },
];

const testimonials = [
  {
    id: 1,
    text: 'This app has completely transformed how I work. Highly recommended!',
    author: 'John Doe',
    role: 'Product Manager',
  },
  {
    id: 2,
    text: 'The user interface is intuitive and the features are exactly what I needed.',
    author: 'Jane Smith',
    role: 'Designer',
  },
  {
    id: 3,
    text: 'Outstanding customer support and reliable performance. Five stars!',
    author: 'Mike Johnson',
    role: 'Developer',
  },
];

const features = [
  { id: 1, icon: '🚀', title: 'Fast', desc: 'Lightning quick performance' },
  { id: 2, icon: '🔒', title: 'Secure', desc: 'Bank-level security' },
  { id: 3, icon: '💡', title: 'Smart', desc: 'AI-powered insights' },
  { id: 4, icon: '🌟', title: 'Premium', desc: 'Best-in-class quality' },
  { id: 5, icon: '🎯', title: 'Precise', desc: 'Accurate results' },
];

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  slideContent: {
    marginTop: 8,
    opacity: 0.7,
  },
  fullWidthSlide: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCard: {
    alignItems: 'center',
    gap: 8,
    minHeight: 160,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 48,
    fontSize: 32,
    lineHeight: 48,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDesc: {
    textAlign: 'center',
    opacity: 0.7,
  },
  testimonialCard: {
    minHeight: 180,
    justifyContent: 'center',
    gap: 16,
  },
  testimonialText: {
    fontSize: FONT_SIZE,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },

  testimonialRole: {
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: FONT_SIZE,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  testSlide: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  slideSubtitle: {
    fontSize: FONT_SIZE,
    color: 'white',
    opacity: 0.9,
  },
});
