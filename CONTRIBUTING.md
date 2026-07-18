# Contributing to TaskFlow

First off, thank you for considering contributing to TaskFlow! It's people like you that make the open-source community such a fantastic place.

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/luolei/task-flow/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, code snippets)
- **Describe the behavior you observed and what you expected**
- **Include environment details** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions or features you've considered**

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the linter (`npm run lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the existing code style and conventions
- Update the README.md with details of changes if applicable
- Add tests for new features when possible
- Keep pull requests focused on a single feature or fix
- Link any relevant issues in the pull request description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/luolei/task-flow.git
cd taskflow

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Style Guide

- **TypeScript** — Strict mode enabled. All new code must be properly typed.
- **Components** — Use functional components with hooks. One component per file.
- **Imports** — Use `@/` path aliases for internal imports.
- **Naming** — PascalCase for components, camelCase for utilities and hooks.
- **CSS** — Use Tailwind utility classes. Avoid custom CSS when possible.

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add drag-and-drop task reordering
fix: resolve dark mode flicker on page load
docs: update README with setup instructions
refactor: extract useDebounce hook
style: format with Prettier
```

## Questions?

Feel free to open an issue with the tag "question" if you need any help.

---

Thank you for contributing! 🎉
