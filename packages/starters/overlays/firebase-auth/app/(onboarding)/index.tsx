import { Icon } from '@/components/ui/icon';
import { Onboarding } from '@/components/ui/onboarding';
import { useColor } from '@/hooks/useColor';
import { router } from 'expo-router';
import { Database, ShieldCheck, Zap } from 'lucide-react-native';

/**
 * The intro carousel.
 *
 * Reached only when the signed-in user's `users/{uid}.onboarded` is false — the
 * guard in app/_layout.tsx decides that, so a returning user never sees this
 * again and a user who quits halfway through sees it on next launch.
 *
 * Skipping lands on the same profile screen: the flag is only set there, so
 * skipping the tour never leaves a user stuck outside the app.
 */
export default function OnboardingScreen() {
  const primary = useColor('primary');

  return (
    <Onboarding
      steps={[
        {
          id: 'realtime',
          title: 'Everything stays in sync',
          description:
            'Your tasks are a live Firestore listener. Change one on another device and it lands here without a refresh.',
          icon: <Icon name={Zap} size={48} color={primary} />,
        },
        {
          id: 'secure',
          title: 'Your data is yours',
          description:
            'Security rules run on Google’s servers, so another signed-in user cannot read your documents even if the app asks.',
          icon: <Icon name={ShieldCheck} size={48} color={primary} />,
        },
        {
          id: 'yours',
          title: 'And it is all open code',
          description:
            'Every screen, hook and security rule is in your repository. Change whatever you like.',
          icon: <Icon name={Database} size={48} color={primary} />,
        },
      ]}
      primaryButtonText='Set up my profile'
      onComplete={() => router.push('/profile')}
      onSkip={() => router.push('/profile')}
    />
  );
}
