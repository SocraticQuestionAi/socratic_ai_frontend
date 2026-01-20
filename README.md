# Socratic AI Frontend

An educational question generation platform built with Next.js 15. This application enables educators and content creators to generate high-quality multiple choice and open-ended questions from various content sources using AI.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Production Build](#production-build)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [License](#license)

## Overview

Socratic AI Frontend is a modern web application designed to streamline the creation of educational assessment materials. By leveraging AI capabilities, it transforms raw content into well-structured questions that can be used for exams, quizzes, study materials, and educational assessments.

The platform follows a single-page application (SPA) architecture built on Next.js App Router, providing a seamless user experience with multiple integrated workspaces for different question generation workflows.

## Features

### PDF Workspace

The PDF Workspace allows users to generate questions from uploaded documents or pasted text content.

- Upload PDF files via drag-and-drop interface
- Paste text content directly for processing
- Configure generation options:
  - Number of questions to generate
  - Question type (multiple choice or open-ended)
  - Difficulty level selection
  - Language preference
- View generated questions in an organized list
- Copy questions to clipboard or export them

### Similarity Generator

Generate variations of existing questions while maintaining the same educational objectives.

- Input an existing question with its answer options
- Specify the number of similar variations to create
- AI generates semantically equivalent questions with different wording
- Useful for creating question banks and preventing academic dishonesty

### Interactive Studio

A canvas-like split-panel interface for AI-powered question refinement.

- Select questions from your generated collection
- Chat-based interface for iterative refinement
- Real-time preview of question modifications
- Conversation history for tracking changes
- Resizable panels for customized workspace layout

### Additional Features

- Dark and light theme support
- Bilingual interface (English and Turkish)
- Persistent session storage
- Responsive design for various screen sizes
- Toast notifications for user feedback
- Keyboard shortcuts for common actions

## Technology Stack

### Core Framework

- **Next.js 15** - React framework with App Router and standalone output mode
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **class-variance-authority** - Variant-based component styling
- **tailwind-merge** - Intelligent Tailwind class merging

### State Management

- **Zustand** - Lightweight state management with persist middleware
- **TanStack React Query** - Server state management and data fetching

### UI Components

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **react-resizable-panels** - Resizable split panels
- **react-dropzone** - File upload with drag-and-drop
- **sonner** - Toast notifications

### Form Handling

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod integration for React Hook Form

### Content Rendering

- **react-markdown** - Markdown rendering
- **KaTeX** - Mathematical notation rendering
- **react-katex** - React wrapper for KaTeX

### Utilities

- **date-fns** - Date manipulation
- **clsx** - Conditional class names
- **next-themes** - Theme management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 18.17 or higher
- **npm** - Version 9 or higher (comes with Node.js)
- **Git** - For version control

Additionally, you need access to the Socratic AI Backend API. The backend service handles the actual question generation using AI models.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/socratic-ai-frontend.git
cd socratic-ai-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:

```bash
cp .env.example .env.local
```

4. Configure your environment variables (see Configuration section)

## Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Backend API URL (required)
# This is the base URL for the Socratic AI Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

### Environment Variable Details

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | - | Base URL for the backend API. Must include the `/api/v1` path. |
| `NEXT_PUBLIC_ENABLE_MOCK_API` | No | `false` | Enable mock API responses for development without backend |

**Important**: Environment variables prefixed with `NEXT_PUBLIC_` are embedded at build time and exposed to the browser. Never store sensitive secrets in these variables.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run typecheck` | Run TypeScript type checking |

### Development Workflow

1. Start the backend API server (see backend documentation)
2. Run `npm run dev` to start the frontend
3. Open `http://localhost:3000` in your browser
4. Changes to source files will automatically reload

## Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The build output uses Next.js standalone mode, which creates a minimal production bundle that can be deployed independently.

## Docker Deployment

### Building the Docker Image

Build the Docker image with your API URL:

```bash
docker build -t socratic-frontend \
  --build-arg NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1 \
  .
```

### Running the Container

Run the container:

```bash
docker run -d -p 3000:3000 --name socratic-frontend socratic-frontend
```

### Docker Compose Example

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: https://api.your-domain.com/api/v1
    ports:
      - "3000:3000"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Run with Docker Compose:

```bash
docker-compose up -d
```

### Docker Image Details

The Dockerfile uses a multi-stage build process:

1. **deps** - Install Node.js dependencies
2. **builder** - Build the Next.js application
3. **runner** - Minimal production image with standalone output

Features:
- Based on `node:20-alpine` for minimal image size
- Non-root user for security
- Built-in health check
- Standalone output mode for minimal dependencies

## Project Structure

```
socratic-ai-frontend/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page (SPA entry)
│   │
│   ├── components/
│   │   ├── layout/            # Application layout components
│   │   │   ├── app-shell.tsx  # Main layout wrapper
│   │   │   ├── header.tsx     # Top navigation header
│   │   │   └── sidebar.tsx    # Side navigation
│   │   │
│   │   ├── shared/            # Reusable components
│   │   │   ├── empty-state.tsx
│   │   │   ├── loading-spinner.tsx
│   │   │   └── question-card.tsx
│   │   │
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   └── providers.tsx      # Context providers wrapper
│   │
│   ├── features/              # Feature modules
│   │   ├── pdf-workspace/     # PDF/text question generation
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── pdf-workspace-view.tsx
│   │   │
│   │   ├── similarity/        # Similar question generation
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── similarity-view.tsx
│   │   │
│   │   └── studio/            # Interactive refinement
│   │       ├── components/
│   │       ├── hooks/
│   │       └── studio-view.tsx
│   │
│   ├── lib/
│   │   ├── api-client.ts      # Typed API client
│   │   ├── i18n/              # Internationalization
│   │   │   ├── context.tsx
│   │   │   └── translations.ts
│   │   └── utils.ts           # Utility functions
│   │
│   ├── stores/                # Zustand state stores
│   │   ├── question-store.ts  # Questions and sessions
│   │   ├── studio-store.ts    # Studio session state
│   │   ├── ui-store.ts        # UI preferences
│   │   └── use-hydration.ts   # SSR hydration helper
│   │
│   └── types/                 # TypeScript type definitions
│       └── api.ts             # API response types
│
├── .env.example               # Environment template
├── Dockerfile                 # Container configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Architecture

### Application Architecture

The application follows a feature-based architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        App Shell                            │
│  ┌─────────────┐  ┌───────────────────────────────────────┐ │
│  │             │  │              Main Content              │ │
│  │   Sidebar   │  │  ┌─────────────────────────────────┐  │ │
│  │             │  │  │     Feature View (SPA)          │  │ │
│  │  - PDF      │  │  │                                 │  │ │
│  │  - Similar  │  │  │  - PDF Workspace View           │  │ │
│  │  - Studio   │  │  │  - Similarity View              │  │ │
│  │             │  │  │  - Studio View                  │  │ │
│  │             │  │  │                                 │  │ │
│  └─────────────┘  │  └─────────────────────────────────┘  │ │
│                    └───────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Providers (Theme, Query, I18n)
└── AppShell
    ├── Sidebar
    │   └── Navigation Items
    ├── Header
    │   ├── Theme Toggle
    │   └── Language Toggle
    └── Main Content
        └── Feature Views
            ├── PDFWorkspaceView
            ├── SimilarityView
            └── StudioView
```

### Data Flow

```
User Action → React Component → Zustand Store → UI Update
                    │
                    ▼
            React Query Hook → API Client → Backend API
                    │
                    ▼
            Cache Update → UI Rerender
```

## API Integration

### API Client

The application uses a typed API client (`src/lib/api-client.ts`) that provides methods for all backend endpoints.

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/generate/from-text` | POST | Generate questions from text content |
| `/generate/from-pdf` | POST | Generate questions from PDF file |
| `/similar/generate` | POST | Generate similar question variations |
| `/refine/refine` | POST | Refine question through conversation |

### Example API Usage

```typescript
import { apiClient } from '@/lib/api-client';

// Generate questions from text
const response = await apiClient.generateFromText({
  content: "Your educational content here",
  num_questions: 5,
  question_type: "mcq",
  difficulty: "medium",
  language: "en"
});
```

### Error Handling

API errors are handled through React Query's error states and displayed to users via toast notifications.

## State Management

### Store Overview

The application uses three Zustand stores:

#### Question Store (`useQuestionStore`)

Manages generated questions and session data.

- Questions collection
- Active session tracking
- LocalStorage persistence
- Session history

#### Studio Store (`useStudioStore`)

Manages the interactive refinement session.

- Selected question
- Chat conversation history
- Refinement state

#### UI Store (`useUIStore`)

Manages user interface preferences.

- Current view mode (pdf, similarity, studio)
- Sidebar collapsed state
- Panel sizes
- Theme preference

### Persistence

The question store uses Zustand's persist middleware with localStorage:

```typescript
const useQuestionStore = create(
  persist(
    (set, get) => ({
      // store implementation
    }),
    {
      name: 'question-storage',
      onRehydrateStorage: () => (state) => {
        // Handle SSR hydration
      }
    }
  )
);
```

## Internationalization

### Supported Languages

- English (en)
- Turkish (tr)

### Usage

```typescript
import { useTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t('welcome')}</h1>;
}
```

### Adding Translations

Edit `src/lib/i18n/translations.ts`:

```typescript
export const translations = {
  en: {
    welcome: 'Welcome',
    // ... more translations
  },
  tr: {
    welcome: 'Hoş Geldiniz',
    // ... more translations
  }
};
```

### Language Persistence

Selected language is persisted to localStorage and restored on page load.

## Contributing

### Development Guidelines

1. Follow TypeScript best practices
2. Use the existing component patterns
3. Maintain feature-based architecture
4. Write meaningful commit messages
5. Test changes before submitting

### Code Style

- Use functional components with hooks
- Follow shadcn/ui component patterns
- Use Tailwind CSS for styling
- Implement proper TypeScript types

### Pull Request Process

1. Create a feature branch from `main`
2. Implement your changes
3. Run `npm run lint` and `npm run typecheck`
4. Submit a pull request with a clear description

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For questions or support, please open an issue on the GitHub repository.
