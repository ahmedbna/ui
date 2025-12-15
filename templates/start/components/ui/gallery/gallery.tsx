import { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

interface GalleryProps {
    images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const formattedImages = images.map(uri => ({ uri }));

    const openGallery = (index: number) => {
        setCurrentIndex(index);
        setVisible(true);
    };

    return (
        <View style={styles.container}>
            {images.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => openGallery(index)}>
                    <Image source={{ uri }} style={styles.thumbnail} />
                </TouchableOpacity>
            ))}
            <ImageViewing
                images={formattedImages}
                imageIndex={currentIndex}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
});
