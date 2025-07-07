import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE } from '@/theme/globals';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { LucideProps, Video, X } from 'lucide-react-native';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  View as RNView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export type MediaType = 'image' | 'video' | 'all';
export type MediaQuality = 'low' | 'medium' | 'high';

export interface MediaAsset {
  id: string;
  uri: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  duration?: number;
  filename?: string;
  fileSize?: number;
}

export interface MediaPickerProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ComponentType<LucideProps>;
  disabled?: boolean;
  mediaType?: MediaType;
  multiple?: boolean;
  maxSelection?: number;
  quality?: MediaQuality;
  buttonText?: string;
  placeholder?: string;
  gallery?: boolean;
  showPreview?: boolean;
  previewSize?: number;
  selectedAssets?: MediaAsset[];
  onSelectionChange?: (assets: MediaAsset[]) => void;
  onError?: (error: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

// Helper function to compare arrays of MediaAssets
const arraysEqual = (a: MediaAsset[], b: MediaAsset[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((item, index) => {
    const bItem = b[index];
    return (
      item.id === bItem.id && item.uri === bItem.uri && item.type === bItem.type
    );
  });
};

export const MediaPicker = forwardRef<RNView, MediaPickerProps>(
  (
    {
      children,
      mediaType = 'all',
      multiple = false,
      gallery = false,
      maxSelection = 10,
      quality = 'high',
      onSelectionChange,
      onError,
      buttonText,
      showPreview = true,
      previewSize = 80,
      style,
      variant,
      size,
      icon,
      disabled = false,
      selectedAssets = [],
    },
    ref
  ) => {
    const [assets, setAssets] = useState<MediaAsset[]>(selectedAssets);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [galleryAssets, setGalleryAssets] = useState<MediaLibrary.Asset[]>(
      []
    );
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // Use ref to track previous selectedAssets to avoid unnecessary updates
    const prevSelectedAssetsRef = useRef<MediaAsset[]>(selectedAssets);

    // Theme colors
    const cardColor = useThemeColor({}, 'card');
    const borderColor = useThemeColor({}, 'border');
    const textColor = useThemeColor({}, 'text');
    const mutedColor = useThemeColor({}, 'mutedForeground');
    const primaryColor = useThemeColor({}, 'primary');
    const secondary = useThemeColor({}, 'secondary');

    // Request permissions on mount
    useEffect(() => {
      requestPermissions();
    }, []);

    // Update internal state when selectedAssets prop changes (with proper comparison)
    useEffect(() => {
      // Only update if the arrays are actually different
      if (!arraysEqual(prevSelectedAssetsRef.current, selectedAssets)) {
        setAssets(selectedAssets);
        prevSelectedAssetsRef.current = selectedAssets;
      }
    }, [selectedAssets]);

    const requestPermissions = async () => {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === 'granted');

        if (status !== 'granted') {
          onError?.(
            'Media library permission is required to access photos and videos'
          );
        }
      } catch (error) {
        onError?.('Failed to request permissions');
        setHasPermission(false);
      }
    };

    const loadGalleryAssets = async () => {
      if (!hasPermission) return;

      try {
        const mediaTypeFilter =
          mediaType === 'image'
            ? [MediaLibrary.MediaType.photo]
            : mediaType === 'video'
            ? [MediaLibrary.MediaType.video]
            : [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video];

        const { assets: galleryAssets } = await MediaLibrary.getAssetsAsync({
          first: 100,
          mediaType: mediaTypeFilter,
          sortBy: MediaLibrary.SortBy.creationTime,
        });

        setGalleryAssets(galleryAssets);
      } catch (error) {
        onError?.('Failed to load gallery assets');
      }
    };

    const pickFromGallery = async () => {
      if (!hasPermission) {
        await requestPermissions();
        return;
      }

      if (gallery) {
        await loadGalleryAssets();
        setIsGalleryVisible(true);
        return;
      }

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            mediaType === 'image'
              ? ImagePicker.MediaTypeOptions.Images
              : mediaType === 'video'
              ? ImagePicker.MediaTypeOptions.Videos
              : ImagePicker.MediaTypeOptions.All,
          allowsMultipleSelection: multiple,
          quality: quality === 'high' ? 1 : quality === 'medium' ? 0.7 : 0.3,
          selectionLimit: multiple ? maxSelection : 1,
        });

        if (!result.canceled && result.assets) {
          const newAssets = result.assets.map((asset, index) => ({
            id: `gallery_${Date.now()}_${index}`,
            uri: asset.uri,
            type:
              asset.type === 'video' ? ('video' as const) : ('image' as const),
            width: asset.width,
            height: asset.height,
            duration: asset.duration || undefined,
            filename: asset.fileName || undefined,
            fileSize: asset.fileSize,
          }));

          handleAssetSelection(newAssets);
        }
      } catch (error) {
        onError?.('Failed to pick media from gallery');
      }
    };

    const handleAssetSelection = (newAssets: MediaAsset[]) => {
      let updatedAssets: MediaAsset[];

      if (multiple) {
        updatedAssets = [...assets, ...newAssets].slice(0, maxSelection);
      } else {
        updatedAssets = newAssets;
      }

      setAssets(updatedAssets);
      prevSelectedAssetsRef.current = updatedAssets; // Update ref to prevent loop
      onSelectionChange?.(updatedAssets);
    };

    const handleGalleryAssetSelect = async (
      galleryAsset: MediaLibrary.Asset
    ) => {
      try {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(galleryAsset);

        const newAsset: MediaAsset = {
          id: galleryAsset.id,
          uri: assetInfo.localUri || galleryAsset.uri,
          type:
            galleryAsset.mediaType === MediaLibrary.MediaType.video
              ? 'video'
              : 'image',
          width: galleryAsset.width,
          height: galleryAsset.height,
          duration: galleryAsset.duration || undefined,
          filename: galleryAsset.filename,
        };

        if (multiple) {
          const isAlreadySelected = assets.some(
            (asset) => asset.id === newAsset.id
          );
          if (isAlreadySelected) {
            const filteredAssets = assets.filter(
              (asset) => asset.id !== newAsset.id
            );
            setAssets(filteredAssets);
            prevSelectedAssetsRef.current = filteredAssets; // Update ref
            onSelectionChange?.(filteredAssets);
          } else if (assets.length < maxSelection) {
            const updatedAssets = [...assets, newAsset];
            setAssets(updatedAssets);
            prevSelectedAssetsRef.current = updatedAssets; // Update ref
            onSelectionChange?.(updatedAssets);
          }
        } else {
          const newAssets = [newAsset];
          setAssets(newAssets);
          prevSelectedAssetsRef.current = newAssets; // Update ref
          onSelectionChange?.(newAssets);
          setIsGalleryVisible(false);
        }
      } catch (error) {
        onError?.('Failed to select asset');
      }
    };

    const removeAsset = (assetId: string) => {
      const filteredAssets = assets.filter((asset) => asset.id !== assetId);
      setAssets(filteredAssets);
      prevSelectedAssetsRef.current = filteredAssets; // Update ref
      onSelectionChange?.(filteredAssets);
    };

    const renderPreviewItem = ({ item }: { item: MediaAsset }) => (
      <View style={[styles.previewItem, { borderColor }]}>
        <ExpoImage
          source={{ uri: item.uri }}
          style={[
            styles.previewImage,
            { width: previewSize, height: previewSize },
          ]}
          contentFit='cover'
        />
        {item.type === 'video' && (
          <View style={styles.videoIndicator}>
            <Video size={16} color='white' />
          </View>
        )}
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: primaryColor }]}
          onPress={() => removeAsset(item.id)}
        >
          <X size={12} color={secondary} />
        </TouchableOpacity>
      </View>
    );

    const renderGalleryItem = ({ item }: { item: MediaLibrary.Asset }) => {
      const isSelected = assets.some((asset) => asset.id === item.id);
      const itemWidth = screenWidth / 3 - 4;

      return (
        <Pressable
          style={[
            styles.galleryItem,
            { width: itemWidth, height: itemWidth },
            isSelected && { borderColor: primaryColor, borderWidth: 3 },
          ]}
          onPress={() => handleGalleryAssetSelect(item)}
        >
          <ExpoImage
            source={{ uri: item.uri }}
            style={styles.galleryImage}
            contentFit='cover'
          />
          {item.mediaType === MediaLibrary.MediaType.video && (
            <View style={styles.videoIndicator}>
              <Video size={20} color='white' />
            </View>
          )}
          {multiple && isSelected && (
            <View
              style={[
                styles.selectedIndicator,
                { backgroundColor: primaryColor },
              ]}
            >
              <Text
                style={{
                  color: secondary,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >
                {assets.findIndex((asset) => asset.id === item.id) + 1}
              </Text>
            </View>
          )}
        </Pressable>
      );
    };

    return (
      <View ref={ref} style={style}>
        {children ? (
          children
        ) : (
          <Button
            onPress={pickFromGallery}
            disabled={disabled}
            variant={variant}
            size={size}
            icon={icon}
          >
            {buttonText ||
              `Select ${
                mediaType === 'all'
                  ? 'Media'
                  : mediaType === 'image'
                  ? 'Images'
                  : 'Videos'
              }`}
          </Button>
        )}

        {showPreview && assets.length > 0 && (
          <FlatList
            data={assets}
            renderItem={renderPreviewItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.previewContainer}
            contentContainerStyle={styles.previewContent}
          />
        )}

        {gallery && (
          <Modal
            visible={isGalleryVisible}
            animationType='slide'
            presentationStyle='pageSheet'
          >
            <View
              style={[styles.modalContainer, { backgroundColor: cardColor }]}
            >
              <View
                style={[styles.modalHeader, { borderBottomColor: borderColor }]}
              >
                <Text variant='title'>
                  {buttonText ||
                    `Select ${
                      mediaType === 'all'
                        ? 'Media'
                        : mediaType === 'image'
                        ? 'Images'
                        : 'Videos'
                    }`}
                </Text>
                <View style={styles.modalActions}>
                  {multiple && (
                    <Text
                      style={[styles.selectionCount, { color: mutedColor }]}
                    >
                      {assets.length}/{maxSelection}
                    </Text>
                  )}

                  <Button
                    size='sm'
                    variant='success'
                    onPress={() => setIsGalleryVisible(false)}
                  >
                    Done
                  </Button>
                </View>
              </View>

              <FlatList
                data={galleryAssets}
                renderItem={renderGalleryItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.galleryContent}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  compactButton: {
    width: 60,
    height: 60,
    borderRadius: CORNERS,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabled: {
    opacity: 0.5,
  },

  previewContainer: {
    marginTop: 12,
  },

  previewContent: {
    paddingHorizontal: 4,
  },

  previewItem: {
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },

  previewImage: {
    borderRadius: 8,
  },

  videoIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },

  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  selectionCount: {
    fontSize: FONT_SIZE,
    fontWeight: '500',
  },

  closeButton: {
    padding: 4,
  },

  galleryContent: {
    padding: 2,
  },

  galleryItem: {
    margin: 1,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },

  galleryImage: {
    width: '100%',
    height: '100%',
  },

  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MediaPicker.displayName = 'MediaPicker';
