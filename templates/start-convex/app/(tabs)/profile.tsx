import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Code,
  Eye,
  Link as LinkIcon,
  Loader,
  Moon,
  Mouse,
  Palette,
  Settings,
  Sparkles,
  Type,
} from 'lucide-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const bottom = useBottomTabBarHeight();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingTop: 64,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant='heading'>Profile</Text>

          <ModeToggle />
        </View>
      </View>
    </ScrollView>
  );
}
