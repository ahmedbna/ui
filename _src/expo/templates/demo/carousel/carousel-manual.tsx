import { Button } from '@/components/ui/button';
import { Carousel, CarouselItem, CarouselRef } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import React, { useRef, useState } from 'react';

export function CarouselManual() {
  const totalSlides = 4;
  const carouselRef = useRef<CarouselRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lessons = [
    {
      title: 'Introduction to React Native',
      progress: 0,
      duration: '15 min',
      bg: '#9c27b0',
      color: '#f3e5f5',
    },
    {
      title: 'Component Architecture',
      progress: 45,
      duration: '20 min',
      bg: '#ff5722',
      color: '#fff3e0',
    },
    {
      title: 'State Management',
      progress: 75,
      duration: '25 min',
      bg: '#00bcd4',
      color: '#e0f2f1',
    },
    {
      title: 'Navigation Patterns',
      progress: 100,
      duration: '18 min',
      bg: '#ff4081',
      color: '#fce4ec',
    },
  ];

  const handleGoToSlide = (index: number) => {
    if (carouselRef.current?.goToSlide) {
      carouselRef.current.goToSlide(index);
    }
  };

  const handleGoToPrevious = () => {
    if (currentIndex > 0) {
      if (carouselRef.current?.goToPrevious) {
        carouselRef.current.goToPrevious();
      }
    }
  };

  const handleGoToNext = () => {
    if (currentIndex < totalSlides - 1) {
      if (carouselRef.current?.goToNext) {
        carouselRef.current.goToNext();
      }
    }
  };

  const handleReset = () => {
    if (carouselRef.current?.goToSlide) {
      carouselRef.current.goToSlide(0);
    }
  };

  // Handle index changes from carousel (swipe gestures AND button presses)
  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={{ gap: 16 }}>
      {/* External Controls */}
      <View
        style={{
          paddingHorizontal: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size='icon'
          variant='outline'
          icon={ChevronLeft}
          onPress={handleGoToPrevious}
          disabled={currentIndex === 0}
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              size='icon'
              variant={currentIndex === index ? 'default' : 'outline'}
              onPress={() => handleGoToSlide(index)}
              style={{ minWidth: 40 }}
            >
              {`${index + 1}`}
            </Button>
          ))}
        </View>

        <Button
          size='icon'
          variant='outline'
          icon={ChevronRight}
          onPress={handleGoToNext}
          disabled={currentIndex === totalSlides - 1}
        />
      </View>

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        showIndicators={false}
        onIndexChange={handleIndexChange}
      >
        {lessons.map((lesson, index) => (
          <CarouselItem
            key={index}
            style={{
              padding: 24,
              minHeight: 200,
              backgroundColor: lesson.bg,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                variant='title'
                style={{
                  color: lesson.color,
                  fontSize: 20,
                  marginBottom: 12,
                }}
              >
                {lesson.title}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: lesson.color, fontSize: 14 }}>
                  {lesson.duration}
                </Text>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: lesson.color,
                    opacity: 0.5,
                  }}
                />
                <Text style={{ color: lesson.color, fontSize: 14 }}>
                  {lesson.progress}% complete
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View>
              <View
                style={{
                  height: 16,
                  backgroundColor: 'white',
                  borderRadius: 999,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${lesson.progress}%`,
                    backgroundColor: 'black',
                    borderRadius: 999,
                  }}
                />
              </View>

              <Text
                style={{
                  color: lesson.color,
                  fontSize: 14,
                  textAlign: 'center',
                  opacity: 0.8,
                }}
              >
                Lesson {index + 1} of {totalSlides}
              </Text>
            </View>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Reset Button */}
      <Button size='sm' variant='ghost' icon={RotateCcw} onPress={handleReset}>
        Reset to Start
      </Button>
    </View>
  );
}
