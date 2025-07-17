[![CI/CD](https://github.com/rkovalov/repox/actions/workflows/ci.yml/badge.svg)](https://github.com/rkovalov/repox/actions/workflows/ci.yml)

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
- **Container**: Docker + Nginx

## 📋 Prerequisites

- Node.js >= 22
- pnpm >= 10
- [fnm](https://github.com/Schniz/fnm) (recommended for Node.js version management)
- Docker (optional, for containerized development)

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

## 🐳 Docker Setup

The application is containerized using Docker with a multi-stage build process and Nginx for serving the production build.

### Docker Structure
```
docker/
├── Dockerfile          # Multi-stage build configuration
├── nginx.conf         # Nginx server configuration
├── generate-env.sh    # Environment variable injection script
└── .dockerignore      # Docker build context exclusions
```

### Building and Running with Docker

1. **Build the Docker image**
   ```bash
   # Get the Git SHA
   GIT_SHA=$(./docker/get-git-sha.sh)
   
   # Build the image with Git SHA
   docker build -t github-repos \
     --build-arg GIT_SHA=$GIT_SHA \
     -f docker/Dockerfile .
   ```

2. **Run the container with environment variables**
   ```bash
   docker run -p 80:80 \
     -e REACT_APP_API_URL=https://api.github.com \
     -e REACT_APP_API_ACCESS_TOKEN=your_token \
     github-repos
   ```

3. **Access the application**
   Open your browser and navigate to `http://localhost`

### Docker Features

- **Multi-stage build**: 
  - Uses Node.js 22 Alpine for building
  - Uses Nginx Alpine for production
  - Optimizes image size by separating build and runtime environments
- **Environment Variables**: 
  - Runtime environment variable injection through `generate-env.sh`
  - Supports dynamic configuration without rebuilding
  - Automatic Git SHA detection during build
- **Nginx server**: 
  - Efficiently serves static assets
  - Includes security headers and CSP configuration
  - Gzip compression enabled
  - Optimized caching for static assets
- **Security**: 
  - Minimal base images (Alpine)
  - Proper file permissions
  - Environment variable handling

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
- Docker build and test
