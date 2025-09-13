import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { ScrollView } from '@/components/ui/scroll-view';
import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SignInWithGoogle } from '@/components/auth/google';
import { SignInWithApple } from '@/components/auth/apple';
import { Password } from '@/components/auth/password';
import { EmailOTP } from './email-otp';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const tabWidth = (screenWidth - 44) / 3; // 16 padding on each side

export const Auth = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 96 }}
        keyboardShouldPersistTaps='handled'
      >
        <Text
          style={{
            fontSize: 60,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          🚀
        </Text>
        <Text
          style={{
            fontSize: 60,
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          BNA UI
        </Text>

        <Tabs defaultValue='oauth' enableSwipe={false} style={{ flex: 1 }}>
          <TabsList>
            <TabsTrigger value='oauth' style={{ width: tabWidth }}>
              OAuth
            </TabsTrigger>
            <TabsTrigger value='password' style={{ width: tabWidth }}>
              Password
            </TabsTrigger>
            <TabsTrigger value='otp' style={{ width: tabWidth }}>
              OTP
            </TabsTrigger>
          </TabsList>

          <TabsContent value='oauth'>
            <Card>
              <CardHeader style={{ paddingBottom: 16 }}>
                <CardDescription style={{ textAlign: 'center' }}>
                  Login to your account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <View style={{ gap: 16 }}>
                  <SignInWithGoogle />

                  <SignInWithApple />
                </View>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='password'>
            <Password />
          </TabsContent>

          <TabsContent value='otp'>
            <EmailOTP />
          </TabsContent>
        </Tabs>

        <View style={{ padding: 16 }}>
          <Text variant='caption' style={{ textAlign: 'center' }}>
            By clicking continue, you agree to our{' '}
            <Link href='https://ui.ahmedbna.com'>
              <Text variant='link' style={{ fontSize: 14 }}>
                Terms of Service
              </Text>
            </Link>{' '}
            and{' '}
            <Link href='https://ui.ahmedbna.com'>
              <Text variant='link' style={{ fontSize: 14 }}>
                Privacy Policy
              </Text>
            </Link>
          </Text>
        </View>
      </ScrollView>

      <AvoidKeyboard />
    </View>
  );
};
