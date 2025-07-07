const lightColors = {
  // Primary text - App names, main content, message text
  label: '#000000',

  // Secondary text - Timestamps, subtitles, contact details (60% opacity)
  secondaryLabel: '#3C3C4399', // #3C3C43 with 60% opacity

  // Tertiary text - Placeholder text, disabled items, footer text (30% opacity)
  tertiaryLabel: '#3C3C434D', // #3C3C43 with 30% opacity

  // Main app backgrounds - Settings, Mail, Notes content area
  systemBackground: '#FFFFFF',

  // Table cells, message bubbles, toolbar backgrounds
  secondarySystemBackground: '#F2F2F7',

  // Input fields, selected cells, navigation bars
  tertiarySystemBackground: '#FFFFFF',

  // Settings app background, grouped lists background
  systemGroupedBackground: '#F2F2F7',

  // Individual setting cells, grouped sections
  secondarySystemGroupedBackground: '#FFFFFF',

  // Card views within grouped lists
  tertiarySystemGroupedBackground: '#F2F2F7',

  // Button backgrounds, overlay modals (20% opacity)
  systemFill: '#78788033', // #787880 with 20% opacity

  // Secondary button states (16% opacity)
  secondarySystemFill: '#78788029', // #787880 with 16% opacity

  // Loading states, progress indicators (12% opacity)
  tertiarySystemFill: '#7676801F', // #767680 with 12% opacity

  // Subtle fill states (8% opacity)
  quaternarySystemFill: '#74748014', // #747480 with 8% opacity

  // Default buttons, links, Send button, selected tabs
  systemBlue: '#007AFF',

  // Success states, FaceTime buttons, completed tasks
  systemGreen: '#34C759',

  // Delete buttons, error states, critical alerts
  systemRed: '#FF3B30',

  // VoiceOver highlights, warning states
  systemOrange: '#FF9500',

  // Notes app accent, Reminders highlights
  systemYellow: '#FFCC00',

  // Pink accent color for various UI elements
  systemPink: '#FF2D92',

  // Purple accent for creative apps and features
  systemPurple: '#AF52DE',

  // Teal accent for communication features
  systemTeal: '#5AC8FA',

  // Indigo accent for system features
  systemIndigo: '#5856D6',

  // Lines between table cells, navigation dividers (29% opacity)
  separator: '#3C3C434A', // #3C3C43 with 29% opacity

  // Thick dividers, card borders, strong visual breaks
  opaqueSeparator: '#C6C6C8',
};

const darkColors = {
  // Primary text - App names, main content, message text
  label: '#FFFFFF',

  // Secondary text - Timestamps, subtitles, contact details (60% opacity)
  secondaryLabel: '#EBEBF599', // #EBEBF5 with 60% opacity

  // Tertiary text - Placeholder text, disabled items, footer text (30% opacity)
  tertiaryLabel: '#EBEBF54D', // #EBEBF5 with 30% opacity

  // Main app backgrounds - Settings, Mail, Notes content area
  systemBackground: '#000000',

  // Table cells, message bubbles, toolbar backgrounds
  secondarySystemBackground: '#1C1C1E',

  // Input fields, selected cells, navigation bars
  tertiarySystemBackground: '#2C2C2E',

  // Settings app background, grouped lists background
  systemGroupedBackground: '#000000',

  // Individual setting cells, grouped sections
  secondarySystemGroupedBackground: '#1C1C1E',

  // Card views within grouped lists
  tertiarySystemGroupedBackground: '#2C2C2E',

  // Button backgrounds, overlay modals (36% opacity)
  systemFill: '#7878805C', // #787880 with 36% opacity

  // Secondary button states (32% opacity)
  secondarySystemFill: '#78788051', // #787880 with 32% opacity

  // Loading states, progress indicators (24% opacity)
  tertiarySystemFill: '#7676803D', // #767680 with 24% opacity

  // Subtle fill states (18% opacity)
  quaternarySystemFill: '#7474802E', // #747480 with 18% opacity

  // Default buttons, links, Send button, selected tabs
  systemBlue: '#0A84FF',

  // Success states, FaceTime buttons, completed tasks
  systemGreen: '#30D158',

  // Delete buttons, error states, critical alerts
  systemRed: '#FF453A',

  // VoiceOver highlights, warning states
  systemOrange: '#FF9F0A',

  // Notes app accent, Reminders highlights
  systemYellow: '#FFD60A',

  // Pink accent color for various UI elements
  systemPink: '#FF375F',

  // Purple accent for creative apps and features
  systemPurple: '#BF5AF2',

  // Teal accent for communication features
  systemTeal: '#64D2FF',

  // Indigo accent for system features
  systemIndigo: '#5E5CE6',

  // Lines between table cells, navigation dividers (65% opacity)
  separator: '#545458A6', // #545458 with 65% opacity

  // Thick dividers, card borders, strong visual breaks
  opaqueSeparator: '#38383A',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

// Export individual color schemes for easier access
export { darkColors, lightColors };

// Utility type for color keys
export type ColorKeys = keyof typeof lightColors;

// Helper function to convert opacity percentage to hex
export const opacityToHex = (opacity: number): string => {
  const alpha = Math.round(opacity * 255);
  return alpha.toString(16).padStart(2, '0').toUpperCase();
};

// Helper function to add opacity to hex color
export const addOpacityToColor = (
  hexColor: string,
  opacity: number
): string => {
  const cleanHex = hexColor.replace('#', '');
  const opacityHex = opacityToHex(opacity);
  return `#${cleanHex}${opacityHex}`;
};
