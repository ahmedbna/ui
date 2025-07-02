import { Button } from '@/components/ui/button';
import { Camera, CaptureSuccess } from '@/components/ui/camera';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Video } from '@/components/ui/video';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as MediaLibrary from 'expo-media-library';
import { Download, Upload, X } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export function CameraPreview() {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraHeight, setCameraHeight] = useState((screenWidth * 4) / 3);
  const [capturedMedia, setCapturedMedia] = useState<{
    uri: string;
    type: 'picture' | 'video';
  } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  const handleCapture = (results: CaptureSuccess) => {
    setCameraHeight(results.cameraHeight);
    setCapturedMedia({ type: results.type, uri: results.uri });
    setShowCamera(false);
    setShowPreview(true);
  };

  const handleVideoCapture = (results: CaptureSuccess) => {
    setCameraHeight(results.cameraHeight);
    setCapturedMedia({ type: results.type, uri: results.uri });
    setShowCamera(false);
    setShowPreview(true);
  };

  const handleOpenCamera = () => {
    setCapturedMedia(null);
    setShowPreview(false);
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleRetakeMedia = () => {
    setCapturedMedia(null);
    setShowPreview(false);
    setShowCamera(true);
  };

  const handleSaveToAlbum = async () => {
    if (!capturedMedia) return;

    try {
      // Request permission if not granted
      if (mediaLibraryPermission?.status !== 'granted') {
        const permission = await requestMediaLibraryPermission();
        if (!permission.granted) {
          Alert.alert(
            'Permission Required',
            'Please grant permission to save media to your picture library.'
          );
          return;
        }
      }

      // Save to media library
      await MediaLibrary.saveToLibraryAsync(capturedMedia.uri);

      Alert.alert(
        'Success!',
        `${
          capturedMedia.type === 'picture' ? 'Photo' : 'Video'
        } saved to your picture library.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setCapturedMedia(null);
              setShowPreview(false);
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving to album:', error);
      Alert.alert('Error', 'Failed to save media to your picture library.');
    }
  };

  const handleUploadAction = () => {
    if (!capturedMedia) return;

    // This is where you would implement your upload logic
    // For example: upload to a server, save to database, etc.

    const mediaDetails = {
      uri: capturedMedia.uri,
      type: capturedMedia.type,
      timestamp: new Date().toISOString(),
      // Add any other metadata you need
    };

    console.log('Media details for upload/processing:', mediaDetails);

    // Example: Call your upload function
    // uploadToServer(mediaDetails);
    // saveToDatabase(mediaDetails);

    Alert.alert(
      'Upload Action',
      `${
        capturedMedia.type === 'picture' ? 'Photo' : 'Video'
      } ready for processing.\n\nCheck console for media details.`,
      [
        {
          text: 'Continue',
          onPress: () => {
            // You might want to keep the preview open or close it
            // depending on your use case
          },
        },
        {
          text: 'Done',
          onPress: () => {
            // setCapturedMedia(null);
            // setShowPreview(false);
          },
        },
      ]
    );
  };

  // Preview Mode
  if (showPreview && capturedMedia) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={[styles.previewContainer, { height: cameraHeight }]}>
          {capturedMedia.type === 'picture' && capturedMedia.uri ? (
            <Image source={{ uri: capturedMedia.uri }} />
          ) : (
            <Video
              source={{ uri: capturedMedia.uri }}
              // nativeControls
              allowsFullscreen
              allowsPictureInPicture
            />
          )}

          {/* Top Floating Buttons */}
          <View style={styles.topFloatingButtons}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.floatingButton,
                  { backgroundColor: cardColor, opacity: 0.9 },
                ]}
                onPress={handleRetakeMedia}
                activeOpacity={0.8}
              >
                <X size={24} color={textColor} />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.floatingButton,
                    { backgroundColor: cardColor, opacity: 0.9 },
                  ]}
                  onPress={handleSaveToAlbum}
                  activeOpacity={0.8}
                >
                  <Download size={24} color={textColor} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.floatingButton,
                    { backgroundColor: cardColor, opacity: 0.9 },
                  ]}
                  onPress={handleUploadAction}
                  activeOpacity={0.8}
                >
                  <Upload size={24} color={textColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Camera Mode
  if (showCamera) {
    return (
      <Camera
        onCapture={handleCapture}
        onVideoCapture={handleVideoCapture}
        onClose={handleCloseCamera}
        facing='back'
        enableTorch={true}
        showControls={true}
        enableVideo={true}
        style={{ flex: 1 }}
      />
    );
  }

  // Main Screen
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text variant='heading' style={styles.title}>
          Camera Component
        </Text>

        <Text variant='body' style={styles.description}>
          Tap the button below to open the camera and capture photos or videos.
          After capturing, you can preview, save, or process your media.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            variant='default'
            size='lg'
            onPress={handleOpenCamera}
            style={styles.button}
          >
            Open Camera
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  lastCaptureContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    maxWidth: '100%',
  },
  lastCaptureTitle: {
    marginBottom: 12,
  },
  thumbnailImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  videoThumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playIcon: {
    fontSize: 24,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
  previewContainer: {
    width: screenWidth,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 0,
  },
  previewMedia: {
    width: '100%',
    height: '100%',
  },
  topFloatingButtons: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomActionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadIcon: {
    marginRight: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  mediaInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mediaInfoText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaInfoSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
