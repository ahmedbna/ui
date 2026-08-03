import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { Platform } from 'react-native';

/**
 * What a haptic is *for*, rather than which API to call.
 *
 * iOS and web share one API surface — `impactAsync` / `notificationAsync` /
 * `selectionAsync`. Web is not a no-op: expo-haptics drives `navigator.vibrate`
 * there, falling back to an iOS-Safari switch-element trick.
 *
 * Android must not use those. They are simulated with the raw `Vibrator`
 * service, which Expo explicitly does not recommend: it is a coarse timed buzz
 * and nothing like what native Android controls feel like.
 * `performAndroidHapticsAsync` goes through `View.performHapticFeedback`
 * instead, which is exactly what those controls use.
 *
 * Branching on that is the whole reason this file exists, so that no component
 * has to know about it.
 */
export type HapticIntent =
  | 'selection'
  | 'tick'
  | 'toggle-on'
  | 'toggle-off'
  | 'impact-light'
  | 'impact-medium'
  | 'success'
  | 'warning'
  | 'error';

const ANDROID_HAPTICS: Record<HapticIntent, Haptics.AndroidHaptics> = {
  selection: Haptics.AndroidHaptics.Segment_Tick,
  // Clock_Tick rather than Segment_Frequent_Tick: the latter is documented as
  // possibly producing no vibration at all on devices that cannot make a
  // suitably soft one, which would silently drop repeated ticks.
  tick: Haptics.AndroidHaptics.Clock_Tick,
  'toggle-on': Haptics.AndroidHaptics.Toggle_On,
  'toggle-off': Haptics.AndroidHaptics.Toggle_Off,
  'impact-light': Haptics.AndroidHaptics.Virtual_Key,
  'impact-medium': Haptics.AndroidHaptics.Long_Press,
  success: Haptics.AndroidHaptics.Confirm,
  warning: Haptics.AndroidHaptics.Reject,
  error: Haptics.AndroidHaptics.Reject,
};

function perform(intent: HapticIntent): Promise<void> {
  if (Platform.OS === 'android') {
    return Haptics.performAndroidHapticsAsync(ANDROID_HAPTICS[intent]);
  }

  switch (intent) {
    case 'selection':
    case 'tick':
      return Haptics.selectionAsync();
    case 'impact-medium':
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    case 'success':
      return Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    case 'warning':
      return Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
    case 'error':
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    default:
      // toggle-on, toggle-off, impact-light
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

/**
 * Fire and forget. Never throws and never rejects.
 *
 * Haptics are decoration: a device with no taptic engine, a user who turned
 * touch feedback off, or a build where the native module is missing (which
 * makes expo-haptics reject with `UnavailabilityError`) must not be able to
 * take an `onPress` handler down with it.
 *
 * Call this on the JS thread. The expo module is bound to the JS runtime, so
 * invoking it from a Reanimated worklet running on the UI thread will throw —
 * reach for `runOnJS` at those call sites.
 */
export function triggerHaptic(intent: HapticIntent = 'impact-light'): void {
  try {
    perform(intent).catch(() => {});
  } catch {
    // Unreachable today, since every expo-haptics entry point is async. Kept so
    // that a future version throwing synchronously cannot break a press either.
  }
}

/**
 * Returns a stable trigger that no-ops while `enabled` is false — the shape
 * every component's `haptic` prop plugs into:
 *
 * ```tsx
 * const feedback = useHaptics(haptic);
 * feedback('toggle-on');
 * ```
 *
 * Its identity only changes when `enabled` does, so it is safe to list in a
 * `useCallback` dependency array and will not defeat a `React.memo` boundary.
 */
export function useHaptics(enabled: boolean = true) {
  return useCallback(
    (intent: HapticIntent = 'impact-light') => {
      if (!enabled) return;
      triggerHaptic(intent);
    },
    [enabled]
  );
}
