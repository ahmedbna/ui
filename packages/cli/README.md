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
# Scaffold a new Expo app
npx bna-ui init my-app
cd my-app

# Add components — dependencies come along automatically
npx bna-ui add button
npx bna-ui add card input

# Or browse everything interactively
npx bna-ui add
```

Already have an Expo project? Skip `init` and run `add` inside it.

### Commands

| Command                  | What it does                                                       |
| ------------------------ | ------------------------------------------------------------------ |
| `bna-ui init [name]`     | Scaffold a new Expo app with routing, theming and a tab layout     |
| `bna-ui convex [name]`   | Same, plus a Convex backend with auth and OTP email flows          |
| `bna-ui supabase [name]` | Same, plus a Supabase backend with auth, migrations and edge funcs |
| `bna-ui add [...names]`  | Add components, with their hooks, theme files and npm deps         |
| `bna-ui list`            | List every component, chart, hook and theme file                   |
| `bna-ui search <query>`  | Find something by name or description                              |
| `bna-ui info <name>`     | Print a component's props, source and examples                     |
| `bna-ui mcp`             | Run an MCP server so AI assistants can browse the registry         |

Pass `--no-auth` to `convex` or `supabase` for a backend with no sign-in.

Run `bna-ui <command> --help` for the flags and worked examples of any command.

**Common flags**

- All scaffolds: `--skip-install`, `--npm` / `--yarn` / `--pnpm` / `--bun`
- `convex`: `--skip-convex` — leave `npx convex dev` for you to run later
- `supabase`: `--skip-supabase` — leave linking and migrations for later
- `add`: `--overwrite`, `--dry-run`, `--yes`, `--registry <url>`
- Anywhere: `--verbose` for the full stack on failure

**Environment**

| Variable             | Effect                   |
| -------------------- | ------------------------ |
| `BNA_UI_REGISTRY`    | Registry to fetch from   |
| `NO_COLOR`           | Disable all colour       |
| `NO_UPDATE_NOTIFIER` | Silence the update check |

Components are fetched from `https://ui.ahmedbna.com/r` and cached under
`~/.cache/bna-ui` with ETags, so repeat installs work offline.

### components.json

`init` writes one, and it is entirely optional — every command works without it.
It saves repeating yourself:

```json
{
  "registry": "https://ui.ahmedbna.com/r",
  "aliases": { "components": "src/components", "hooks": "src/hooks" },
  "packageManager": "pnpm"
}
```

With `aliases` set, `add` writes to `src/components/ui/button.tsx` instead of
`components/ui/button.tsx`.

### Requirements

Node.js **22.12 or newer**.

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

Components read colours through the `useColor` hook, so light and dark work
without any per-component wiring:

```tsx
import { useColor } from '@/hooks/useColor';

const background = useColor('background');
const primary = useColor('primary');
```

The tokens live in `theme/colors.ts`, which lands in your project when you add
your first component:

```tsx
// theme/colors.ts
export const Colors = {
  light: {
    background: '#FFFFFF',
    foreground: '#000000',
    card: '#F2F2F7',
    primary: '#007AFF',
    // ... more tokens
  },
  dark: {
    background: '#000000',
    foreground: '#FFFFFF',
    card: '#1C1C1E',
    // ... more tokens
  },
};
```

Edit that file and every component follows — it's your code now.

## 📱 Platform Support

- ✅ **iOS** - Full native iOS support
- ✅ **Android** - Full native Android support
- ✅ **Web** - Responsive web support
- ✅ **Expo Go** - Development with Expo Go
- ✅ **EAS Build** - Production builds with EAS

## 🛠️ Development

BNA UI lives in a monorepo alongside the component registry, the docs site and
an Expo playground.

```bash
git clone https://github.com/ahmedbna/ui.git bna-ui
cd bna-ui

pnpm install
pnpm build
```

The CLI is `packages/cli`; components live in `packages/registry`.

## 🤝 Contributing

We welcome contributions! See the
[Contributing Guide](https://github.com/ahmedbna/ui/blob/main/CONTRIBUTING.md)
for the full workflow.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
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

![GitHub package.json version](https://img.shields.io/github/package-json/v/ahmedbna/ui?color=FAD40B&labelColor=18181B)
![npm](https://img.shields.io/npm/v/bna-ui?color=FAD40B&labelColor=18181B)
![npm](https://img.shields.io/npm/dm/bna-ui?color=FAD40B&labelColor=18181B)
![GitHub](https://img.shields.io/github/license/ahmedbna/ui?color=FAD40B&labelColor=18181B)

---

Made with ❤️ by [Ahmed BNA](https://github.com/ahmedbna)
