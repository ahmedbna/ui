import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export function CarouselCustomWidth() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  const products = [
    { id: 1, name: 'Wireless Headphones', price: '$99.99', rating: '4.8' },
    { id: 2, name: 'Smart Watch', price: '$199.99', rating: '4.9' },
    { id: 3, name: 'Bluetooth Speaker', price: '$79.99', rating: '4.7' },
    { id: 4, name: 'Phone Case', price: '$24.99', rating: '4.6' },
    { id: 5, name: 'Wireless Charger', price: '$39.99', rating: '4.8' },
  ];

  return (
    <View>
      <Carousel
        itemWidth={screenWidth * 0.7}
        spacing={16}
        showIndicators={false}
      >
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            style={{
              backgroundColor: cardColor,
              minHeight: 160,
              padding: 20,
            }}
          >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Text
                  variant='title'
                  style={{
                    color: textColor,
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  style={{
                    color: textColor,
                    opacity: 0.7,
                    marginBottom: 12,
                  }}
                >
                  ⭐ {product.rating} rating
                </Text>
              </View>
              <Text
                variant='title'
                style={{
                  color: '#10b981',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {product.price}
              </Text>
            </View>
          </CarouselItem>
        ))}
      </Carousel>

      <Text
        variant='caption'
        style={{
          marginTop: 16,
        }}
      >
        Swipe to see more products →
      </Text>
    </View>
  );
}
