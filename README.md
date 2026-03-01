
<div align="right">
  <details>
    <summary >🌐 Language</summary>
    <div>
      <div align="center">
        <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=en">English</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=zh-CN">简体中文</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=zh-TW">繁體中文</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=ja">日本語</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=ko">한국어</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=hi">हिन्दी</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=th">ไทย</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=fr">Français</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=de">Deutsch</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=es">Español</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=it">Italiano</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=ru">Русский</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=pt">Português</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=nl">Nederlands</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=pl">Polski</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=ar">العربية</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=fa">فارسی</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=tr">Türkçe</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=vi">Tiếng Việt</a>
        | <a href="https://openaitx.github.io/view.html?user=ahmedbna&project=ui&lang=id">Bahasa Indonesia</a>
      </div>
    </div>
  </details>
</div>

# BNA UI 🚀

![BNA UI Header](https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/bna-ui-header.png)

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
    // ... more colors
  },
};

export const darkTheme = {
  colors: {
    background: '#000000',
    foreground: '#FFFFFF',
    card: '#1C1C1E',
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
- 𝕏 : [@ahmedbnaa](https://x.com/ahmedbnaa)

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
