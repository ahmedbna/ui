# BNA - Beautiful Native Apps

A CLI tool for building beautiful Expo React Native apps with pre-built UI components, inspired by shadcn/ui.

## Features

- 🚀 **Quick Setup**: Initialize new Expo projects with UI components ready to use
- 📱 **React Native Focused**: Components designed specifically for React Native/Expo
- 🎨 **Customizable**: Built with TypeScript and customizable themes
- 🔧 **Developer Friendly**: Simple CLI commands similar to shadcn/ui
- 📦 **Modular**: Add only the components you need

## Quick Start

### Initialize a new project

```bash
# Using npx (recommended)
npx bna@latest init my-app

# Using other package managers
pnpm dlx bna@latest init my-app
yarn dlx bna@latest init my-app
bunx --bun bna@latest init my-app
```

### Add components to existing project

```bash
# Initialize BNA in existing Expo project
bna init .

# Add individual components
bna add button
bna add card input

# Add all components
bna add --all

# List available components
bna list
```

## Available Components

### Form Components

- **Button** - Customizable button with variants and sizes
- **Input** - Text input with label and error states
- **Checkbox** - Checkbox with custom styling
- **Switch** - Animated toggle switch

### Layout Components

- **Card** - Container with shadow and border
- **Modal** - Animated modal component
- **Alert** - Alert messages with icons

### UI Components

- **Avatar** - User avatar with fallback
- **Badge** - Small status indicators
- **Loading** - Loading spinners and skeletons

## Commands

### `bna init <project-name>`

Initialize a new Expo project with BNA UI components.

**Options:**

- `-t, --template <template>` - Template to use (default: default)
