import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import type { ReactNode } from 'react';

/**
 * The frame every screen under `(auth)` shares: title, subtitle, and a body
 * that stays above the keyboard.
 *
 * `AvoidKeyboard` is a trailing spacer, not a wrapper — it renders an animated
 * view that grows to the keyboard's height. It has to sit after the scroll
 * view, as a sibling, which is why it is outside the `ScrollView` below.
 */
export function AuthScreen({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          gap: 24,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ gap: 8 }}>
          <Text variant='heading'>{title}</Text>
          {subtitle && <Text variant='caption'>{subtitle}</Text>}
        </View>

        <View style={{ gap: 16 }}>{children}</View>

        {footer && <View style={{ gap: 12, marginTop: 8 }}>{footer}</View>}
      </ScrollView>

      <AvoidKeyboard />
    </View>
  );
}
