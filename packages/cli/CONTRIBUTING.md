# Contributing to BNA UI 🤝

Thank you for your interest in contributing to BNA UI! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bna-ui.git
   cd bna-ui
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/ahmedbna/bna-ui.git
   ```

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests (if available)
npm test
```

## 📋 Contribution Guidelines

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New components**
- 📚 **Documentation improvements**
- 🎨 **Design enhancements**
- ⚡ **Performance optimizations**
- 🧪 **Tests**

### Before You Start

1. **Check existing issues** - Look for related issues or discussions
2. **Create an issue** - For new features, create an issue first to discuss
3. **Small PRs preferred** - Keep changes focused and small

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create new branch
git checkout -b feature/component-name
# or
git checkout -b fix/issue-description
```

### 2. Make Changes

- Follow existing code patterns
- Add TypeScript types
- Include proper documentation
- Test your changes thoroughly

### 3. Component Guidelines

When adding new components:

```tsx
// 1. Use proper TypeScript interfaces
interface ComponentProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

// 2. Use theme colors
const backgroundColor = useColor('primary');

// 3. Export from index file
export { Component } from './component';

// 4. Include demo file
// Create: templates/demo/component/component-demo.tsx
```

### 4. Commit Guidelines

Use conventional commits:

```bash
git commit -m "feat: add new Button component"
git commit -m "fix: resolve theme switching issue"
git commit -m "docs: update installation guide"
git commit -m "style: improve component spacing"
```

**Commit Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build/tooling changes

### 5. Submit Pull Request

```bash
# Push to your fork
git push origin feature/component-name

# Create PR on GitHub
```

## 📝 Pull Request Guidelines

### PR Title Format

```
feat: add Avatar component with fallback support
fix: resolve Button press animation on Android
docs: improve theme configuration examples
```

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing

- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🧪 Testing

### Manual Testing

```bash
# Test in Expo Go
npm start

# Test components in demo app
npx expo start --clear
```

### Component Testing

- Test all variants and props
- Test theme switching
- Test on different screen sizes
- Verify accessibility

## 🎨 Design Guidelines

### Component Structure

```
components/ui/component-name/
├── index.ts              # Export file
├── component.tsx         # Main component
└── component.types.ts    # TypeScript types (if complex)
```

### Styling Principles

- Use theme colors consistently
- Support both light/dark themes
- Follow platform conventions
- Maintain accessibility standards
- Use consistent spacing/sizing

### File Naming

- Components: `PascalCase`
- Files: `kebab-case`
- Props: `camelCase`

## 🚫 What Not to Do

- Don't push directly to main branch
- Don't ignore existing code patterns
- Don't add dependencies without discussion
- Don't make breaking changes without major version bump
- Don't submit PRs without testing

## 🔍 Code Review Process

1. **Automated Checks** - All CI checks must pass
2. **Maintainer Review** - Code review by project maintainers
3. **Testing** - Manual testing of changes
4. **Approval** - At least one approval required
5. **Merge** - Maintainer will merge after approval

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/ahmedbna/bna-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ahmedbna/bna-ui/discussions)
- **LinkedIn**: [@ahmedbna](https://www.linkedin.com/in/ahmedbna/)
- **X**: [@ahmedbnaa](https://x.com/ahmedbnaa)

## 🙏 Recognition

Contributors will be:

- Added to README contributors section
- Mentioned in release notes
- Credited in component documentation

Thank you for contributing to BNA UI! 🚀
