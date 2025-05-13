# GitHub Repos Explorer

A modern React application for exploring GitHub repositories, built with TypeScript and a robust tech stack.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Rsbuild
- **Styling**: Panda CSS
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Form Validation**: Valibot
- **UI Components**: React Aria Components
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library
- **Linting/Formatting**: Biome
- **Spelling**: cspell
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js >= 22
- pnpm >= 10
- [fnm](https://github.com/Schniz/fnm) (recommended for Node.js version management)

## 🛠️ Development Setup

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables

3. **Start Development Server**
   ```bash
   pnpm dev
   ```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Run linter
- `pnpm format` - Format code
- `pnpm check:types` - Check TypeScript types
- `pnpm check:cspell` - Check Spelling

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── modules/        # Feature modules
├── router/         # Route definitions
├── utils/          # Utility functions
├── env/           # Environment configuration
├── _public/       # Static assets
├── app.tsx        # Root application component
└── index.tsx      # Application entry point
```

## 🎨 Styling

The project uses Panda CSS for styling with a custom configuration in `panda.config.ts`. The styling system is generated in the `styled-system` directory.

## 🧪 Testing

Tests are written using Vitest and Testing Library. Test files are located in the `tests` directory.

## 📝 Code Quality

- **Linting**: Biome for code linting and formatting
- **Type Checking**: TypeScript for static type checking
- **Git Hooks**: 
  - Pre-commit: Runs linting and formatting
  - Commit-msg: Enforces conventional commit messages

## 🔄 CI/CD

The project includes several quality checks:
- Type checking
- Linting
- Formatting
- Spell checking
- Dependency checking
