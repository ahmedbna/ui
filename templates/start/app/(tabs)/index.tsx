import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BookOpen, Stars, Terminal } from 'lucide-react-native';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const bottom = useBottomTabBarHeight();

  const cardColor = useColor('card');
  const borderColor = useColor('border');
  const primaryColor = useColor('primary');

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant='heading'>BNA UI</Text>

          <ModeToggle />
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text variant='heading' style={styles.heroTitle}>
          Welcome to BNA UI
        </Text>
        <Text variant='subtitle' style={styles.heroSubtitle}>
          A beautiful, modern component library for Expo, React Native apps
        </Text>
        <Text variant='caption' style={styles.heroDescription}>
          Build stunning mobile applications with our carefully crafted
          components.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Link asChild href='/explore'>
          <Button size='lg' icon={Stars}>
            Explore Components
          </Button>
        </Link>
        <Link asChild href='https://ui.ahmedbna.com'>
          <Button variant='success' size='lg' icon={BookOpen}>
            Documentation
          </Button>
        </Link>
      </View>

      {/* Getting Started */}
      <View style={styles.gettingStartedSection}>
        <Text variant='title' style={{ textAlign: 'center', marginBottom: 20 }}>
          Getting Started
        </Text>
        <View
          style={[
            styles.gettingStartedCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <View style={styles.terminalHeader}>
            <Terminal size={20} color={primaryColor} />
            <Text variant='body' style={styles.terminalTitle}>
              Add Components
            </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text variant='caption' style={styles.bashCommand}>
              npx bna-ui add avatar
            </Text>
          </View>
          <Text variant='caption' style={styles.installDescription}>
            Add components to your project with a single command
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text variant='caption' style={styles.footerText}>
          Built with ❤️ for Expo, React Native developers by BNA
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  heroDescription: {
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width - 80,
  },
  actionButtons: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 40,
  },
  gettingStartedSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gettingStartedCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  terminalTitle: {
    fontWeight: '600',
  },
  codeBlock: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: '100%',
  },
  bashCommand: {
    fontFamily: 'monospace',
    // color: '#00ff00',
    fontSize: 16,
    textAlign: 'center',
  },
  installDescription: {
    textAlign: 'center',
    opacity: 0.7,
  },
  gettingStartedText: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  gettingStartedButton: {
    alignSelf: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
