import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface SimpleCarouselProps {
    data: any[];
    renderItem: (info: { item: any, index: number }) => React.ReactElement;
    height?: number;
    width?: number;
}

export const SimpleCarousel = ({ data, renderItem, height = 200, width }: SimpleCarouselProps) => {
    const windowWidth = Dimensions.get('window').width;
    // We adjust width to account for container padding if necessary, or default to full width
    const baseWidth = width || windowWidth - 40; // Assuming standard padding

    return (
        <View style={{ height, width: '100%', alignItems: 'center' }}>
            <Carousel
                loop
                width={baseWidth}
                height={height}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={renderItem}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            />
        </View>
    );
};
