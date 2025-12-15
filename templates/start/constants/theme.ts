import { Colors } from './Colors';
import { THEME_SHADES } from './designTokens';

export const AppTheme = {
  light: {
    text: Colors.zinc[THEME_SHADES.LIGHT.TEXT],
    background: Colors.zinc[THEME_SHADES.LIGHT.BACKGROUND],
    border: Colors.zinc[THEME_SHADES.LIGHT.BORDER],
    tint: Colors.violet[600],
    icon: Colors.zinc[900],
    tabIconDefault: Colors.zinc[500],
    tabIconSelected: Colors.violet[600],
    card: Colors.white,
    primary: Colors.violet[600],
    secondary: Colors.zinc[500],
    muted: Colors.zinc[400],
    error: Colors.red[500],
    success: Colors.green[500],
    warning: Colors.amber[400],
    info: Colors.blue[500],
  },
  dark: {
    text: Colors.zinc[THEME_SHADES.DARK.TEXT],
    background: Colors.zinc[THEME_SHADES.DARK.BACKGROUND],
    border: Colors.zinc[THEME_SHADES.DARK.BORDER],
    tint: Colors.green[500], // As per design system example, or keep consistent? Let's use Violet for consistency or Green as requested in example.
    // The user example showed: dark: { tint: Colors.green[500] }
    icon: Colors.zinc[100],
    tabIconDefault: Colors.zinc[500],
    tabIconSelected: Colors.violet[500], // Tint is green but tab selected usually matches primary brand or tint
    card: Colors.zinc[900],
    primary: Colors.violet[500],
    secondary: Colors.zinc[400],
    muted: Colors.zinc[600],
    error: Colors.red[400],
    success: Colors.green[400],
    warning: Colors.amber[300],
    info: Colors.blue[400],
  },
};
