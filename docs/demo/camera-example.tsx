// registry/demo/camera-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { CameraCustomControls } from '@/docs/examples/camera/camera-custom-controls';
import { CameraDemo } from '@/docs/examples/camera/camera-demo';
import { CameraPictureOnly } from '@/docs/examples/camera/camera-picture-only';
import { CameraSettings } from '@/docs/examples/camera/camera-settings';
import { CameraTimer } from '@/docs/examples/camera/camera-timer';
import { CameraVideo } from '@/docs/examples/camera/camera-video';
import { CameraZoom } from '@/docs/examples/camera/camera-zoom';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all camera demo
export function CameraExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Camera
      </Text>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Camera
        </Text>
        <CameraDemo />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Controls
        </Text>
        <CameraCustomControls />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Picture Only Mode
        </Text>
        <CameraPictureOnly />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Video Recording
        </Text>
        <CameraVideo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Timer Features
        </Text>
        <CameraTimer />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Zoom Controls
        </Text>
        <CameraZoom />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Settings Panel
        </Text>
        <CameraSettings />
      </View> */}
    </View>
  );
}
