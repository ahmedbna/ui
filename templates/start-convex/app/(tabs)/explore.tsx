import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
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

export default function ExploreScreen() {
  const router = useRouter();
  const bottom = useBottomTabBarHeight();

  const cardColor = useColor('card');
  const borderColor = useColor('border');
  const primaryColor = useColor('primary');

  const components = [
    {
      id: 'button',
      name: 'Button',
      description: 'Interactive button with variants and animations',
      icon: Mouse,
      category: 'Interactive',
    },
    {
      id: 'text',
      name: 'Text',
      description: 'Typography component with variant support',
      icon: Type,
      category: 'Typography',
    },
    {
      id: 'icon',
      name: 'Icon',
      description: 'Lucide icons with theme support',
      icon: Sparkles,
      category: 'Visual',
    },
    {
      id: 'link',
      name: 'Link',
      description: 'Navigation links with external support',
      icon: LinkIcon,
      category: 'Navigation',
    },
    {
      id: 'spinner',
      name: 'Spinner',
      description: 'Loading indicators with multiple variants',
      icon: Loader,
      category: 'Feedback',
    },
    {
      id: 'mode-toggle',
      name: 'Mode Toggle',
      description: 'Theme switcher with smooth animations',
      icon: Moon,
      category: 'Interactive',
    },
  ];

  const features = [
    {
      title: 'Live Preview',
      description: 'See components in action with real-time demos',
      icon: Eye,
    },
    {
      title: 'Code Examples',
      description: 'Copy-paste ready code snippets',
      icon: Code,
    },
    {
      title: 'Customizable',
      description: 'Easy to customize with your brand colors',
      icon: Palette,
    },
    {
      title: 'Accessible',
      description: 'Built with accessibility in mind',
      icon: Settings,
    },
  ];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant='heading'>Components</Text>

          <ModeToggle />
        </View>
      </View>

      {/* Components List */}
      <View style={styles.componentsSection}>
        <View style={styles.componentsList}>
          {components.map((component) => (
            <TouchableOpacity
              key={component.id}
              style={[
                styles.componentCard,
                { backgroundColor: cardColor, borderColor },
              ]}
              onPress={() =>
                router.push(
                  `https://ui.ahmedbna.com/docs/components/${component.id}`
                )
              }
            >
              <View style={styles.componentHeader}>
                <View style={styles.componentIcon}>
                  <Icon name={component.icon} size={24} color={primaryColor} />
                </View>
                <View style={styles.componentInfo}>
                  <Text variant='subtitle' style={styles.componentName}>
                    {component.name}
                  </Text>
                  <Text variant='caption' style={styles.componentCategory}>
                    {component.category}
                  </Text>
                </View>
                <Button variant='ghost' size='icon' icon={ArrowRight} />
              </View>
              <Text variant='caption' style={styles.componentDescription}>
                {component.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Overview */}
      <View style={styles.featuresSection}>
        <Text variant='title' style={styles.sectionTitle}>
          What You Get
        </Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                styles.featureItem,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <Icon name={feature.icon} size={20} color={primaryColor} />
              <View style={styles.featureContent}>
                <Text variant='body' style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text variant='caption' style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  heroDemo: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  demoCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  demoTitle: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  demoDescription: {
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  demoButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  activeButton: {
    transform: [{ scale: 1.05 }],
  },
  demoSpinners: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    opacity: 0.7,
    lineHeight: 18,
  },
  componentsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  componentsList: {
    gap: 12,
  },
  componentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  componentCategory: {
    opacity: 0.6,
    fontSize: 12,
  },
  componentDescription: {
    opacity: 0.7,
    lineHeight: 18,
  },
  quickStartSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  quickStartCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickStartTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  quickStartDescription: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,
    lineHeight: 20,
  },
  quickStartButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quickStartButton: {
    flex: 1,
  },
  linksSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  linksList: {
    gap: 12,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    opacity: 0.6,
  },
});
