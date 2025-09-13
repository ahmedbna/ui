# BNA UI 🚀

![BNA UI Header](https://bna-ui.s3.eu-north-1.amazonaws.com/bna-ui-header.png)

**B**uild **N**ative **A**pps - A powerful CLI for creating Expo React Native applications with a beautiful UI component library.

## ✨ Features

- 🎨 **Beautiful UI Components** - Pre-built, customizable components with modern design
- 🌙 **Theme Support** - Built-in light/dark mode with seamless transitions
- 📱 **Expo Router Ready** - Complete navigation setup with tab and stack navigation
- 🎯 **TypeScript First** - Full TypeScript support with excellent IntelliSense
- 📦 **Flexible Package Manager** - Works with npm, yarn, or pnpm
- 🚀 **Zero Configuration** - Get started in seconds with sensible defaults
- 🔧 **Highly Customizable** - Easily customize colors, spacing, and components
- 📲 **Cross-Platform** - Perfect compatibility across iOS and Android
- ⚡ **Performance Optimized** - Lightweight and fast components
- 🎭 **Animation Ready** - Smooth animations with React Native Reanimated

## 📦 Installation

```bash
# The fastest way to set up BNA UI in your Expo project:
npx bna-ui init

# Navigate to your Expo project
cd bna-app

# Start adding components
npx bna-ui add button
npx bna-ui add card
npx bna-ui add input
```

## 🎨 Available Components

| Component      | Description                       | Status         |
| -------------- | --------------------------------- | -------------- |
| `Button`       | Customizable button with variants | ✅ Available   |
| `Card`         | Container component with shadow   | ✅ Available   |
| `Input`        | Text input with validation        | ✅ Available   |
| `Bottom Sheet` | Overlay modal component           | ✅ Available   |
| `Spinner`      | Loading spinner and skeletons     | ✅ Available   |
| `Avatar`       | User profile image component      | ✅ Available   |
| `Badge`        | Small status indicator            | ✅ Available   |
| `Date Picker`  | Date Picker component             | ✅ Available   |
| `Switch`       | Toggle switch component           | ✅ Available   |
| `Progress`     | Range progress component          | ✅ Available   |
| `Charts`       | Charts components.                | 🔄 Coming Soon |

## 🎯 Usage Example

```tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Card>
        <Input placeholder='Enter your email' keyboardType='email-address' />
        <Button
          variant='success'
          onPress={() => console.log('Button pressed!')}
        >
          Get Started
        </Button>
      </Card>
    </View>
  );
}
```

## 🌙 Theme Configuration

BNA UI comes with a flexible theming system:

```tsx
// theme/colors.ts
export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000',
    card: '#F2F2F7',
    cardForeground: '#000000',
    popover: '#F2F2F7',
    popoverForeground: '#000000',
    primary: '#18181b',
    primaryForeground: '#FFFFFF',
    secondary: '#F2F2F7',
    secondaryForeground: '#18181b',
    muted: '#78788033',
    mutedForeground: '#71717a',
    // ... more colors
  },
};

export const darkTheme = {
  colors: {
    background: '#000000',
    foreground: '#FFFFFF',
    card: '#1C1C1E',
    cardForeground: '#FFFFFF',
    popover: '#18181b',
    popoverForeground: '#FFFFFF',
    primary: '#e4e4e7',
    primaryForeground: '#18181b',
    secondary: '#1C1C1E',
    secondaryForeground: '#FFFFFF',
    muted: '#78788033',
    mutedForeground: '#a1a1aa',
    // ... more colors
  },
};
```

## 📱 Platform Support

- ✅ **iOS** - Full native iOS support
- ✅ **Android** - Full native Android support
- ✅ **Web** - Responsive web support
- ✅ **Expo Go** - Development with Expo Go
- ✅ **EAS Build** - Production builds with EAS

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/ahmedbna/bna-ui.git
cd bna-ui

# Install dependencies
npm install

# Build for production
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- 📚 **Documentation**: [https://ui.ahmedbna.com](https://ui.ahmedbna.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/ahmedbna/ui/issues)
- 💬 **Linkedin**: [@ahmedbna](https://www.linkedin.com/in/ahmedbna/)
- 𝕏 **X**: [@ahmedbnaa](https://x.com/ahmedbnaa)

## ⭐ Support

If you find BNA UI helpful, please consider giving it a star on GitHub! It helps us a lot.

[![GitHub stars](https://img.shields.io/github/stars/ahmedbna/ui?style=social)](https://github.com/ahmedbna/ui)

## 📈 Stats

![GitHub package.json version](https://img.shields.io/github/package-json/v/ahmedbna/ui)
![npm](https://img.shields.io/npm/v/bna-ui)
![npm](https://img.shields.io/npm/dm/bna-ui)
![GitHub](https://img.shields.io/github/license/ahmedbna/ui)

---

Made with ❤️ by [Ahmed BNA](https://github.com/ahmedbna)
