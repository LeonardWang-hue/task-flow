<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

<br />
<div align="center">
  <h1 align="center">
    <span style="color: #6366f1">Task</span>Flow
  </h1>
  <p align="center">
    A modern, full-featured task management application built with Next.js 16.
    <br />
    Built with drag-and-drop, dark mode, multi-user support, and a clean, responsive UI.
    <br />
    <br />
    <a href="#demo"><strong>View Demo</strong></a>
    ·
    <a href="https://github.com/luolei/task-flow/issues/new?labels=bug"><strong>Report Bug</strong></a>
    ·
    <a href="https://github.com/luolei/task-flow/issues/new?labels=enhancement"><strong>Request Feature</strong></a>
  </p>
</div>

---

## Table of Contents

<details open>
  <summary>Click to expand</summary>
  <ol>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#custom-hooks">Custom Hooks</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## Demo

### Login Page

Multi-user simulated authentication with one-click demo accounts.

<img src="https://raw.githubusercontent.com/luolei/task-flow/main/docs/login.png" alt="Login Page" width="800" />

### Task Dashboard

Drag-and-drop task management with real-time search, filter, and sort.

<img src="https://raw.githubusercontent.com/luolei/task-flow/main/docs/dashboard.png" alt="Task Dashboard" width="800" />

### Dark Mode

Full dark mode support with system preference detection and manual toggle.

<img src="https://raw.githubusercontent.com/luolei/task-flow/main/docs/dark-mode.png" alt="Dark Mode" width="800" />

### Project Showcase

Showcase your projects with tech tags and external links.

<img src="https://raw.githubusercontent.com/luolei/task-flow/main/docs/projects.png" alt="Project Showcase" width="800" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Features

### Core Functionality

- **Multi-User Authentication** — Simulated login with 4 demo accounts. Each user has isolated data stored in localStorage.
- **CRUD Task Management** — Create, read, update, and delete tasks with a clean modal interface.
- **Drag-and-Drop Reordering** — Powered by `@dnd-kit`, reorder tasks via drag handles with smooth animations.
- **Undo Delete** — Toast notifications with a 5-second undo window when deleting tasks.
- **Search & Filter** — Debounced search across titles and descriptions. Filter by status (Todo / In Progress / Done) and priority (High / Medium / Low).
- **Multiple Sort Options** — Sort by creation date, due date, priority, or title, with ascending/descending toggle.
- **Dark Mode** — Full light/dark theme support with system preference detection and manual toggle. Persisted to localStorage.
- **Project Showcase** — Add, edit, and delete portfolio projects with tech tags and external links. Perfect for developers to showcase their work.

### Architecture Highlights

- **Custom Hooks** — `useAuth`, `useTasks`, `useProjects`, `useTheme`, `useUndo`, `useDebounce` for clean separation of concerns.
- **Context API** — `ThemeContext` and `AuthContext` for global state management.
- **Mock API Layer** — Simulated network requests with realistic delays (200–600ms), backed by localStorage for data persistence.
- **TypeScript** — End-to-end type safety with strict mode enabled.
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile.
- **Accessibility** — Semantic HTML, ARIA labels on interactive elements, keyboard-accessible drag-and-drop.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Tech Stack

| Category       | Technology                                           |
| :------------- | :--------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)       |
| Language       | [TypeScript 5](https://www.typescriptlang.org/)       |
| UI Library     | [React 19](https://react.dev/)                       |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com/)           |
| Drag & Drop    | [@dnd-kit/core](https://dndkit.com/)                 |
| Unique IDs     | [uuid](https://github.com/uuidjs/uuid)               |
| Linting        | [ESLint](https://eslint.org/) + next/core-web-vitals |
| Package Manager| npm                                                  |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.17
- **npm** >= 9

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/luolei/task-flow.git
   cd taskflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

   The production build serves on [http://localhost:3000](http://localhost:3000).

### Demo Accounts

All accounts have the password: `123456`

| Username  | Description               |
| :-------- | :------------------------ |
| `alice`   | Pre-populated sample data |
| `bob`     | Clean slate               |
| `carol`   | Clean slate               |
| `dave`    | Clean slate               |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with theme/dark mode
│   ├── page.tsx            # Home page (task dashboard)
│   ├── ClientBody.tsx      # Client-side provider wrapper
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── projects/
│       └── page.tsx        # Project showcase page
├── components/             # Reusable UI components
│   ├── Header.tsx          # Navigation bar
│   ├── LoginForm.tsx       # Authentication form
│   ├── TaskBoard.tsx       # Main task dashboard (DnD context)
│   ├── TaskCard.tsx        # Single task card
│   ├── TaskEditor.tsx      # Create/Edit task modal
│   ├── TaskControls.tsx    # SearchBar, FilterPanel, SortControls
│   ├── UndoToast.tsx       # Undo notification
│   ├── ProjectCard.tsx     # Project display card
│   └── ProjectEditor.tsx   # Create/Edit project modal
├── contexts/               # React Context providers
│   ├── ThemeContext.tsx     # Theme management (light/dark)
│   └── AuthContext.tsx      # Authentication state
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Login, logout, register
│   ├── useTasks.ts         # Task CRUD operations
│   ├── useProjects.ts      # Project CRUD operations
│   ├── useTheme.ts         # Theme accessor (via Context)
│   ├── useUndo.ts          # Generic undo stack
│   └── useDebounce.ts      # Debounced value
└── lib/                    # Shared utilities
    ├── types.ts            # TypeScript interfaces
    ├── mock-api.ts         # Mock API service
    └── constants.ts        # App constants & labels
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Custom Hooks

### `useAuth`

Manages user authentication state. Stores session in `localStorage`. Exposes `login`, `register`, and `logout` methods.

```tsx
const { user, isLoading, login, register, logout } = useAuth();
```

### `useTasks`

Full CRUD for tasks with mock API integration. Provides `searchTasks`, `filterTasks`, `sortTasks`, and `reorderTasks` for client-side operations.

```tsx
const { tasks, addTask, editTask, removeTask, restoreTask, reorderTasks } = useTasks();
```

### `useUndo`

Generic undo stack. Pushes entries with a configurable timeout. Perfect for implementing undo-delete patterns.

```tsx
const { entry, push, clear } = useUndo<Task>();
```

### `useDebounce`

Debounces a value by a configurable delay. Used for search input to avoid excessive filtering.

```tsx
const debouncedQuery = useDebounce(searchQuery, 250);
```

### `useTheme`

Accessor hook for the `ThemeContext`. Provides current theme and a toggle function.

```tsx
const { theme, toggleTheme } = useTheme();
```

### `useProjects`

CRUD operations for project showcase entries, with mock API integration.

```tsx
const { projects, addProject, editProject, removeProject } = useProjects();
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

- [x] Multi-user authentication (simulated)
- [x] Task CRUD with drag-and-drop reordering
- [x] Dark mode with system preference detection
- [x] Search, filter, and sort
- [x] Undo delete with toast notifications
- [x] Project showcase with tech tags
- [x] TypeScript strict mode
- [x] Responsive design
- [ ] Real backend integration (e.g., Supabase, PlanetScale)
- [ ] OAuth login (GitHub, Google)
- [ ] Team workspaces and shared tasks
- [ ] Task comments and attachments
- [ ] Calendar view
- [ ] Kanban board view
- [ ] PWA support with offline mode
- [ ] End-to-end tests with Playwright
- [ ] Internationalization (i18n)

See the [open issues](https://github.com/luolei/task-flow/issues) for a full list of proposed features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Don't forget to give the project a star! Thanks again!

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [@dnd-kit](https://dndkit.com/) — Modern drag-and-drop toolkit
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) — Beautiful, consistent icons
- [shields.io](https://shields.io/) — README badges
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) — README inspiration

<p align="right">(<a href="#readme-top">back to top</a>)</p>
