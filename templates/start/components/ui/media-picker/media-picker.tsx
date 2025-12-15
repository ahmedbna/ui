import { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from '../button';
import { Text } from '../text';
import { Image as ImageIcon, FileText, Trash2 } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

export const MediaPicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [document, setDocument] = useState<any | null>(null);
    const mutedColor = useColor('mutedForeground');
    const borderColor = useColor('border');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setDocument(null);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        if (!result.canceled) {
            setDocument(result.assets[0]);
            setImage(null);
        }
    };

    const clearSelection = () => {
        setImage(null);
        setDocument(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.actions}>
                <Button variant="outline" onPress={pickImage} icon={ImageIcon}>Pick Image</Button>
                <Button variant="outline" onPress={pickDocument} icon={FileText}>Pick Doc</Button>
            </View>

            {(image || document) && (
                <View style={[styles.preview, { borderColor }]}>
                    {image && (
                        <Image source={{ uri: image }} style={styles.image} />
                    )}
                    {document && (
                        <View style={styles.docPreview}>
                            <FileText size={32} color={mutedColor} />
                            <Text variant="caption">{document.name}</Text>
                        </View>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onPress={clearSelection}
                        style={{ marginTop: 10 }}
                    >
                        Clear
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    preview: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'dashed',
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 8,
    },
    docPreview: {
        alignItems: 'center',
        gap: 5,
        padding: 20,
    },
});
