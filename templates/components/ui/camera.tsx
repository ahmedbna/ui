import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import {
  CameraMode,
  CameraRatio,
  CameraType,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import {
  Camera as CameraIcon,
  Grid3X3,
  Settings,
  SwitchCamera,
  Timer,
  Video,
  Volume2,
  VolumeX,
  X,
  Zap,
  ZapOff,
} from 'lucide-react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Progress } from './progress';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export type CaptureSuccess = {
  type: CameraMode;
  uri: string;
  cameraHeight: number;
};
export interface CameraProps {
  style?: ViewStyle;
  facing?: CameraType;
  enableTorch?: boolean;
  showControls?: boolean;
  timerOptions?: Array<number>;
  enableVideo?: boolean;
  maxVideoDuration?: number; // in seconds
  onClose?: () => void;
  onCapture?: ({ type, uri, cameraHeight }: CaptureSuccess) => void;
  onVideoCapture?: ({ type, uri, cameraHeight }: CaptureSuccess) => void;
}

export interface CameraRef extends CameraView {
  switchCamera: () => void;
  toggleTorch: () => void;
  takePicture: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
}

export const Camera = forwardRef<CameraRef, CameraProps>(
  (
    {
      style,
      onCapture,
      onVideoCapture,
      onClose,
      enableTorch = true,
      showControls = true,
      enableVideo = true,
      maxVideoDuration = 60,
      timerOptions = [0, 3, 10],
      facing: initialFacing = 'back',
    },
    ref
  ) => {
    const cameraRef = useRef<CameraView>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const recordingInterval = useRef<number | null>(null);
    const timerInterval = useRef<number | null>(null);
    const settingsAnim = useRef(new Animated.Value(0)).current;
    const zoomTextAnim = useRef(new Animated.Value(0)).current;
    const zoomControlsAnim = useRef(new Animated.Value(0)).current;
    const baseZoom = useRef(0);
    const lastZoom = useRef(0);

    const aspectRatios: Array<CameraRatio> = ['16:9', '4:3', '1:1'];

    const [permission, requestPermission] = useCameraPermissions();
    const [torch, setTorch] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [mode, setMode] = useState<CameraMode>('picture');
    const [facing, setFacing] = useState<CameraType>(initialFacing);
    const [showGrid, setShowGrid] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [selectedTimer, setSelectedTimer] = useState<number>(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [aspectRatioIndex, setAspectRatioIndex] = useState(1); // 0: 16:9, 1: 4:3, 2: 1:1
    const [zoomControls, setZoomControls] = useState(false);
    const [availableZoomFactors, setAvailableZoomFactors] = useState<number[]>([
      0,
      0.25,
      0.5,
      0.75,
      1.0, // Zoom levels: 1x, 2x, 3x, 4x, 5x
    ]);
    const [currentZoomIndex, setCurrentZoomIndex] = useState(0);

    // Theme colors
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const primaryColor = useThemeColor({}, 'primary');
    const cardColor = useThemeColor({}, 'card');
    const destructiveColor = useThemeColor({}, 'destructive');

    // Modern gesture handler for pinch-to-zoom
    const pinchGesture = Gesture.Pinch()
      .onUpdate((event) => {
        const newZoom = Math.min(
          Math.max(baseZoom.current + (event.scale - 1) * 0.5, 0),
          1
        );
        setZoom(newZoom);
      })
      .onEnd(() => {
        baseZoom.current = zoom;
        showZoomIndicator();
      });

    // Double tap gesture for quick zoom
    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .onEnd(() => {
        const newZoom = zoom > 0 ? 0 : 0.5;
        setZoom(newZoom);
        baseZoom.current = newZoom;
        showZoomIndicator();
      });

    // Combined gestures
    const composedGestures = Gesture.Simultaneous(
      pinchGesture,
      doubleTapGesture
    );

    // @ts-ignore
    useImperativeHandle(ref, () => {
      if (!cameraRef.current) {
        return {} as CameraRef; // fallback to empty cast to satisfy types
      }

      const cam = cameraRef.current as CameraRef;

      return {
        ...cam,
        switchCamera: toggleCameraFacing,
        toggleTorch,
        takePicture: handleCapture,
        startRecording: handleStartRecording,
        stopRecording: handleStopRecording,
      };
    });

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    useEffect(() => {
      return () => {
        if (recordingInterval.current) {
          clearInterval(recordingInterval.current);
        }
        if (timerInterval.current) {
          clearInterval(timerInterval.current);
        }
      };
    }, []);

    const getCameraHeight = () => {
      const currentAspectRatio = aspectRatios[aspectRatioIndex];
      switch (currentAspectRatio) {
        case '16:9':
          return (screenWidth * 16) / 9;
        case '1:1':
          return screenWidth;
        case '4:3':
        default:
          return (screenWidth * 4) / 3;
      }
    };

    const startTimer = (seconds: number) => {
      setTimerSeconds(seconds);
      setIsTimerActive(true);

      timerInterval.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            if (timerInterval.current) {
              clearInterval(timerInterval.current);
              timerInterval.current = null;
            }
            // Execute the actual capture/recording
            setTimeout(() => {
              if (mode === 'picture') {
                handleActualCapture();
              } else {
                handleStartRecording();
              }
            }, 100);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const cancelTimer = () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
      setIsTimerActive(false);
      setTimerSeconds(0);
    };

    const handleActualCapture = async () => {
      if (!cameraRef.current || isCapturing || isRecording) return;

      try {
        setIsCapturing(true);

        // if (soundEnabled) {
        //   Vibration.vibrate(50);
        // }

        const picture = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: true,
        });

        if (picture && onCapture) {
          onCapture({
            type: 'picture',
            uri: picture.uri,
            cameraHeight: getCameraHeight(),
          });
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      } finally {
        setIsCapturing(false);
      }
    };

    const handleStartRecording = async () => {
      if (!cameraRef.current || isRecording || isCapturing) return;

      try {
        setIsRecording(true);
        setRecordingTime(0);

        // if (soundEnabled) {
        //   Vibration.vibrate([0, 100, 50, 100]);
        // }

        recordingInterval.current = setInterval(() => {
          setRecordingTime((prev) => {
            if (prev >= maxVideoDuration) {
              handleStopRecording();
              return prev;
            }
            return prev + 1;
          });
        }, 1000);

        const video = await cameraRef.current.recordAsync({
          maxDuration: maxVideoDuration,
        });

        if (video && onVideoCapture) {
          onVideoCapture({
            type: 'video',
            uri: video.uri,
            cameraHeight: getCameraHeight(),
          });
        }
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', 'Failed to start recording');
        setIsRecording(false);
      }
    };

    const handleCapture = async () => {
      if (isCapturing || isRecording || isTimerActive) return;

      if (selectedTimer > 0) {
        startTimer(selectedTimer);
      } else {
        if (mode === 'picture') {
          handleActualCapture();
        } else {
          handleStartRecording();
        }
      }
    };

    const handleStopRecording = async () => {
      if (!cameraRef.current || !isRecording) return;

      try {
        await cameraRef.current.stopRecording();

        if (recordingInterval.current) {
          clearInterval(recordingInterval.current);
          recordingInterval.current = null;
        }

        // if (soundEnabled) {
        //   Vibration.vibrate(100);
        // }
      } catch (error) {
        console.error('Error stopping recording:', error);
      } finally {
        setIsRecording(false);
        setRecordingTime(0);
      }
    };

    const toggleCameraFacing = () => {
      setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const toggleTorch = () => {
      setTorch((current) => !current);
    };

    const toggleMode = () => {
      if (!isRecording && !isCapturing) {
        setMode((current) => (current === 'picture' ? 'video' : 'picture'));
      }
    };

    const toggleSettings = () => {
      setShowSettings((prev) => {
        const newValue = !prev;
        Animated.timing(settingsAnim, {
          toValue: newValue ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
        return newValue;
      });
    };

    const showZoomIndicator = () => {
      Animated.sequence([
        Animated.timing(zoomTextAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(zoomTextAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handleZoomSliderChange = (value: number) => {
      setZoom(value / 100); // Convert from 0-100 to 0-1
      baseZoom.current = value / 100;
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    };

    const getTimerButtonText = () => {
      if (selectedTimer === 0) return 'OFF';
      return `${selectedTimer}s`;
    };

    const getZoomFactor = () => {
      return zoom === 0 ? '1×' : `${(1 + zoom * 4).toFixed(0)}×`;
    };

    // New zoom button handlers
    const handleZoomButtonTap = () => {
      // Cycle through available zoom levels
      const nextIndex = (currentZoomIndex + 1) % availableZoomFactors.length;
      const nextZoom = availableZoomFactors[nextIndex];

      setCurrentZoomIndex(nextIndex);
      setZoom(nextZoom);
      baseZoom.current = nextZoom;
      showZoomIndicator();

      // if (soundEnabled) {
      //   Vibration.vibrate([1]); // Light haptic feedback
      // }
    };

    if (!permission) {
      return (
        <View style={[styles.container, { backgroundColor }, style]}>
          <ActivityIndicator size='large' color={primaryColor} />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading camera...
          </Text>
        </View>
      );
    }

    return !permission.granted ? (
      <View
        style={[styles.permissionContainer, { backgroundColor: cardColor }]}
      >
        <CameraIcon size={36} color={textColor} style={styles.permissionIcon} />

        <Text variant='title' style={{ textAlign: 'center' }}>
          Camera Access Required
        </Text>

        <Text variant='body' style={{ textAlign: 'center' }}>
          We need access to your camera to take pictures and videos
        </Text>

        <View style={{ width: '100%' }}>
          <Button onPress={requestPermission} style={{ width: '100%' }}>
            Grant Permission
          </Button>
        </View>
      </View>
    ) : (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor, opacity: fadeAnim },
          style,
        ]}
      >
        <View style={[styles.cameraContainer, { height: getCameraHeight() }]}>
          <GestureDetector gesture={composedGestures}>
            <Animated.View style={styles.camera}>
              <CameraView
                ref={cameraRef}
                mode={mode}
                style={styles.camera}
                facing={facing}
                enableTorch={torch}
                animateShutter={true}
                zoom={zoom}
                mirror={mode === 'picture' && facing === 'front'}
                ratio={aspectRatios[aspectRatioIndex]}
              >
                {/* Grid Overlay */}
                {showGrid && (
                  <View style={styles.gridOverlay}>
                    <View style={styles.gridLines}>
                      <View style={[styles.gridLine, styles.verticalLine1]} />
                      <View style={[styles.gridLine, styles.verticalLine2]} />
                      <View style={[styles.gridLine, styles.horizontalLine1]} />
                      <View style={[styles.gridLine, styles.horizontalLine2]} />
                    </View>
                  </View>
                )}

                {/* Zoom Indicator */}
                <Animated.View
                  style={[styles.zoomIndicator, { opacity: zoomTextAnim }]}
                  pointerEvents='none'
                >
                  <Text style={styles.zoomText}>{getZoomFactor()}</Text>
                </Animated.View>

                {/* Zoom Controls */}
                {zoomControls && (
                  <Animated.View
                    style={[
                      styles.zoomControls,
                      {
                        opacity: zoomControlsAnim,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    ]}
                    pointerEvents={zoomControls ? 'auto' : 'none'}
                  >
                    <View style={styles.sliderContainer}>
                      <Text style={[styles.zoomValue, { color: 'white' }]}>
                        1×
                      </Text>
                      <Progress
                        interactive
                        value={zoom * 100}
                        onValueChange={handleZoomSliderChange}
                        style={styles.zoomSlider}
                        height={6}
                      />
                      <Text style={[styles.zoomValue, { color: 'white' }]}>
                        5×
                      </Text>
                    </View>
                    <Text style={[styles.currentZoomText, { color: 'white' }]}>
                      {getZoomFactor()}
                    </Text>
                  </Animated.View>
                )}

                {/* Timer Overlay */}
                {isTimerActive && (
                  <TouchableOpacity
                    style={styles.timerOverlay}
                    onPress={cancelTimer}
                    activeOpacity={1}
                  >
                    <Text style={styles.timerText}>{timerSeconds}</Text>
                    <View style={styles.cancelTimerButton}>
                      <X size={20} color='white' />
                    </View>
                    <Text style={styles.tapToCancelText}>Tap to cancel</Text>
                  </TouchableOpacity>
                )}

                {/* Recording Indicator */}
                {isRecording && (
                  <View style={styles.recordingIndicator}>
                    <View style={styles.recordingDot} />
                    <Text style={styles.recordingText}>
                      REC {formatTime(recordingTime)}
                    </Text>
                  </View>
                )}

                {showControls && (
                  <>
                    {/* Top Controls */}
                    <View style={styles.topControls}>
                      <View style={styles.topLeft}>
                        {onClose && (
                          <TouchableOpacity
                            style={[
                              styles.controlButton,
                              { backgroundColor: cardColor },
                            ]}
                            onPress={onClose}
                            activeOpacity={0.7}
                          >
                            <X size={24} color={textColor} />
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={styles.topCenter}>
                        <Text style={[styles.modeText, { color: textColor }]}>
                          {mode.toUpperCase()}
                        </Text>
                      </View>

                      <View style={styles.topRight}>
                        <TouchableOpacity
                          style={[
                            styles.controlButton,
                            { backgroundColor: cardColor },
                          ]}
                          onPress={toggleSettings}
                          activeOpacity={0.7}
                        >
                          <Settings size={24} color={textColor} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Settings Panel */}
                    <Animated.View
                      style={[
                        styles.settingsPanel,
                        {
                          backgroundColor: cardColor,
                          opacity: settingsAnim,
                          transform: [
                            {
                              translateY: settingsAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-100, 0],
                              }),
                            },
                          ],
                        },
                      ]}
                      pointerEvents={showSettings ? 'auto' : 'none'}
                    >
                      <View style={styles.settingsRow}>
                        <TouchableOpacity
                          style={[
                            styles.settingButton,
                            showGrid && { backgroundColor: primaryColor },
                          ]}
                          onPress={() => setShowGrid(!showGrid)}
                        >
                          <Grid3X3
                            size={20}
                            color={showGrid ? cardColor : textColor}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.settingButton,
                            {
                              backgroundColor: soundEnabled
                                ? primaryColor
                                : cardColor,
                            },
                          ]}
                          onPress={() => setSoundEnabled(!soundEnabled)}
                        >
                          {soundEnabled ? (
                            <Volume2 size={20} color={cardColor} />
                          ) : (
                            <VolumeX size={20} color={textColor} />
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.settingButton,
                            { backgroundColor: cardColor },
                          ]}
                          onPress={() =>
                            setAspectRatioIndex((prev) => (prev + 1) % 3)
                          }
                        >
                          <Text
                            style={[styles.settingText, { color: textColor }]}
                          >
                            {aspectRatios[aspectRatioIndex]}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.settingButton,
                            {
                              backgroundColor:
                                selectedTimer > 0 ? primaryColor : cardColor,
                            },
                          ]}
                          onPress={() => {
                            const currentIndex =
                              timerOptions.indexOf(selectedTimer);
                            const nextIndex =
                              (currentIndex + 1) % timerOptions.length;
                            setSelectedTimer(timerOptions[nextIndex]);
                          }}
                        >
                          <Timer
                            size={16}
                            color={selectedTimer > 0 ? cardColor : textColor}
                          />
                          <Text
                            style={[
                              styles.timerSettingText,
                              {
                                color:
                                  selectedTimer > 0 ? cardColor : textColor,
                              },
                            ]}
                          >
                            {getTimerButtonText()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>

                    {/* Side Controls */}
                    <View style={styles.sideControls}>
                      {enableTorch && facing === 'back' && (
                        <TouchableOpacity
                          style={[
                            styles.controlButton,
                            {
                              backgroundColor: torch ? primaryColor : cardColor,
                            },
                          ]}
                          onPress={toggleTorch}
                          activeOpacity={0.7}
                        >
                          {torch ? (
                            <Zap size={24} color={cardColor} />
                          ) : (
                            <ZapOff size={24} color={textColor} />
                          )}
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={[
                          styles.controlButton,
                          { backgroundColor: cardColor },
                        ]}
                        onPress={toggleCameraFacing}
                        activeOpacity={0.7}
                      >
                        <SwitchCamera size={24} color={textColor} />
                      </TouchableOpacity>

                      {/* New Zoom Control Button */}
                      <TouchableOpacity
                        style={[
                          styles.controlButton,
                          {
                            backgroundColor: zoomControls
                              ? primaryColor
                              : cardColor,
                          },
                        ]}
                        onPress={handleZoomButtonTap}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={{
                            fontWeight: 600,
                            color: zoomControls ? cardColor : textColor,
                          }}
                        >
                          {getZoomFactor()}
                        </Text>
                      </TouchableOpacity>

                      {/* Mode Toggle Button */}
                      {enableVideo && (
                        <TouchableOpacity
                          style={[
                            styles.controlButton,
                            { backgroundColor: cardColor },
                          ]}
                          onPress={toggleMode}
                          disabled={isRecording || isCapturing}
                          activeOpacity={0.7}
                        >
                          {mode === 'picture' ? (
                            <Video size={24} color={textColor} />
                          ) : (
                            <CameraIcon size={24} color={textColor} />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Bottom Controls */}
                    <View style={styles.bottomControls}>
                      {/* Main Capture Button */}
                      <TouchableOpacity
                        style={[
                          styles.captureButton,
                          {
                            backgroundColor:
                              mode === 'video' && isRecording
                                ? destructiveColor
                                : 'white',
                            borderColor:
                              mode === 'video' && isRecording
                                ? destructiveColor
                                : primaryColor,
                          },
                          (isCapturing || isTimerActive) &&
                            styles.capturingButton,
                        ]}
                        onPress={
                          mode === 'picture'
                            ? handleCapture
                            : isRecording
                            ? handleStopRecording
                            : handleCapture
                        }
                        disabled={isCapturing || isTimerActive}
                        activeOpacity={0.8}
                      >
                        {isCapturing ? (
                          <ActivityIndicator
                            size='small'
                            color={primaryColor}
                          />
                        ) : (
                          <View
                            style={[
                              styles.captureInner,
                              {
                                backgroundColor:
                                  mode === 'video' && isRecording
                                    ? 'white'
                                    : primaryColor,
                                borderRadius:
                                  mode === 'video' && isRecording ? 4 : 30,
                              },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </CameraView>
            </Animated.View>
          </GestureDetector>
        </View>
      </Animated.View>
    );
  }
);

Camera.displayName = 'Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: screenWidth,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  topLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
  },
  topRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  modeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsPanel: {
    position: 'absolute',
    top: 76,
    left: 20,
    right: 20,
    borderRadius: BORDER_RADIUS,
    padding: 16,
    zIndex: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  settingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerSettingText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  sideControls: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -120 }],
    gap: 16,
    zIndex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  captureInner: {
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  capturingButton: {
    transform: [{ scale: 0.9 }],
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gridLines: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  verticalLine1: {
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  verticalLine2: {
    left: '66.66%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  horizontalLine1: {
    top: '33.33%',
    left: 0,
    right: 0,
    height: 1,
  },
  horizontalLine2: {
    top: '66.66%',
    left: 0,
    right: 0,
    height: 1,
  },
  zoomIndicator: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  cancelTimerButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapToCancelText: {
    position: 'absolute',
    bottom: 100,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  recordingIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 2,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 8,
  },
  recordingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  permissionContainer: {
    gap: 16,
    padding: 32,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
  },
  permissionIcon: {
    marginBottom: 16,
  },
  permissionTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: FONT_SIZE,
  },
  loadingText: {
    marginTop: 16,
    fontSize: FONT_SIZE,
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    top: '25%',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  sliderContainer: {
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    transform: [{ rotate: '-90deg' }], // rotate to make it vertical
  },
  zoomSlider: {
    width: 160, // becomes height visually due to rotate
    borderRadius: 999,
  },
  zoomValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  currentZoomText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Camera;
