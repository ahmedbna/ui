import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const GradientIcon = ({
  iconName,
  colors,
}: {
  iconName: string;
  colors: [string, string];
}) => (
  <LinearGradient
    colors={colors}
    style={{
      padding: 24,
      borderRadius: 70,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    }}
  >
    <Feather name={iconName as any} size={64} color='white' />
  </LinearGradient>
);

export function OnboardingStyled() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Secure & Private',
      description:
        'Your data is protected with end-to-end encryption. We prioritize your privacy above all else.',
      icon: <GradientIcon iconName='shield' colors={['#667eea', '#764ba2']} />,
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: '2',
      title: 'Lightning Fast',
      description:
        'Experience blazing fast performance with our optimized infrastructure and smart caching.',
      icon: <GradientIcon iconName='zap' colors={['#f093fb', '#f5576c']} />,
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: '3',
      title: 'Always Connected',
      description:
        'Stay connected with real-time sync across all your devices. Never miss an important update.',
      icon: <GradientIcon iconName='wifi' colors={['#4facfe', '#00f2fe']} />,
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Styled onboarding completed!')}
      onSkip={() => console.log('Styled onboarding skipped!')}
      primaryButtonText='Start Now'
      nextButtonText='Next Step'
      skipButtonText='Skip Intro'
      style={{ backgroundColor: '#1a1a2e' }}
    />
  );
}
