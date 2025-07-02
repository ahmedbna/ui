import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react-native';
import React from 'react';

export function CarouselNoIndicators() {
  const textColor = useThemeColor({}, 'text');

  const stats = [
    {
      title: 'Revenue',
      value: '$24,500',
      change: '+12.5%',
      trend: 'up',
      color: '#10b981',
    },
    {
      title: 'Users',
      value: '8,432',
      change: '+5.2%',
      trend: 'up',
      color: '#3b82f6',
    },
    {
      title: 'Orders',
      value: '1,248',
      change: '-2.1%',
      trend: 'down',
      color: '#ef4444',
    },
    {
      title: 'Conversion',
      value: '3.8%',
      change: '0.0%',
      trend: 'neutral',
      color: '#6b7280',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  return (
    <Carousel showArrows showIndicators={false} loop>
      {stats.map((stat, index) => {
        const TrendIcon = getTrendIcon(stat.trend);
        return (
          <CarouselItem key={index}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 180,
                padding: 24,
              }}
            >
              <Text
                style={{
                  color: textColor,
                  opacity: 0.7,
                  fontSize: 14,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {stat.title}
              </Text>

              <Text
                variant='title'
                style={{
                  color: textColor,
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}
              >
                {stat.value}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: `${stat.color}15`,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}
              >
                <TrendIcon size={16} color={stat.color} />
                <Text
                  style={{
                    color: stat.color,
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                >
                  {stat.change}
                </Text>
              </View>
            </View>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
