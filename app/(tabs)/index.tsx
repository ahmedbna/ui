import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/ui/hello-wave';
import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

import { MediaPickerDemo } from '@/components/media-picker-demo';
import { Collapsible } from '@/components/ui/collapsible';
import { Link } from '@/components/ui/link';
import { HellowWaveDemo } from '@/docs/demo/hello-wave/hello-wave-demo';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Text>Welcome!</Text>
        <HelloWave />
      </View>

      <HellowWaveDemo />

      {/* <SpinnerDemo /> */}

      <MediaPickerDemo />

      <View style={styles.stepContainer}>
        <Text>Step 1: Try it</Text>
        <Text>
          Edit <Text>app/(tabs)/index.tsx</Text> to see changes. Press{' '}
          <Text>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Step 2: Explore</Text>
        <Text>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Step 3: Get a fresh start</Text>
        <Text>
          {`When you're ready, run `}
          <Text>npm run reset-project</Text> to get a fresh <Text>app</Text>{' '}
          directory. This will move the current <Text>app</Text> to{' '}
          <Text>app-example</Text>.
        </Text>
      </View>

      <Collapsible title='File-based routing'>
        <Text>
          This app has two screens: <Text>app/(tabs)/index.tsx</Text> and{' '}
          <Text>app/(tabs)/explore.tsx</Text>
        </Text>
        <Text>
          The layout file in <Text>app/(tabs)/_layout.tsx</Text> sets up the tab
          navigator.
        </Text>

        <Link href='https://docs.expo.dev/router/introduction'>
          <Text variant='link'>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Android, iOS, and web support'>
        <Text>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Text>w</Text> in the terminal running this
          project.
        </Text>
      </Collapsible>
      <Collapsible title='Images'>
        <Text>
          For static images, you can use the <Text>@2x</Text> and{' '}
          <Text>@3x</Text> suffixes to provide files for different screen
          densities
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ alignSelf: 'center' }}
        />
        <Link href='https://reactnative.dev/docs/images'>
          <Text variant='link'>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Custom fonts'>
        <Text>
          Open <Text>app/_layout.tsx</Text> to see how to load{' '}
          <Text style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </Text>
        </Text>
        <Link href='https://docs.expo.dev/versions/latest/sdk/font'>
          <Text>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Light and dark mode components'>
        <Text>
          This template has light and dark mode support. The hook lets you
          inspect what the user&apos;s current color scheme is, and so you can
          adjust UI colors accordingly.
        </Text>
        <Link href='https://docs.expo.dev/develop/user-interface/color-themes/'>
          <Text>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Animations'>
        <Text>
          This template includes an example of an animated component. The{' '}
          <Text>components/HelloWave.tsx</Text> component uses the powerful{' '}
          <Text>react-native-reanimated</Text> library to create a waving hand
          animation.
        </Text>
        {Platform.select({
          ios: (
            <Text>
              The <Text>components/ParallaxScrollView.tsx</Text> component
              provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
