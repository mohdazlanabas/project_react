# React Component Library Demo

A comprehensive React application demonstrating various UI components and React hooks patterns built with Vite.

## Overview

This project showcases a complete component library with practical examples of React hooks including `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, and `useReducer`. It includes a custom `useLocalStorage` hook for persisting theme preferences.

## Features

- **Theme System**: Light/dark mode toggle with persistent storage
- **Navigation**: Multi-page navigation with Header, Footer, and Sidebar
- **Data Management**: Search, filtering, and pagination functionality
- **UI Components**:
  - Layout: Header, Footer, Sidebar, Card
  - Interactive: Button, Modal, Tabs, Accordion, Toast
  - Data Display: Table, List, Pagination
  - Forms: TextInput, Select, Checkbox, SearchBar, Form
  - Utilities: Spinner, ThemeToggle

## Component List

1. **Button** - Variant-based button component (primary, danger)
2. **Card** - Container component with title and content
3. **Header** - Navigation header with theme toggle
4. **Footer** - Application footer
5. **Sidebar** - Side navigation with live stats
6. **Modal** - Dialog overlay with ESC-to-close functionality
7. **Tabs** - Tabbed interface component
8. **Accordion** - Expandable/collapsible content sections
9. **Toast** - Auto-dismissing notification messages
10. **Table** - Data table with styling
11. **List** - Interactive item list
12. **Pagination** - Page navigation controls
13. **SearchBar** - Real-time search input
14. **Form** - Form wrapper with validation
15. **TextInput** - Text input field component
16. **Select** - Dropdown select component
17. **Checkbox** - Checkbox input component
18. **Spinner** - Loading indicator
19. **ThemeToggle** - Light/dark theme switcher

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **ESLint** - Code linting
- No external UI libraries - all components built from scratch

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
project_react/
├── src/
│   ├── components/      # All UI components
│   ├── context/         # React Context providers (ThemeContext)
│   ├── hooks/           # Custom hooks (useLocalStorage)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── styles.css       # Global styles and component CSS
├── public/              # Static assets
├── .claude/             # Claude Code configuration
└── package.json         # Project dependencies and scripts
```

## React Hooks Demonstrated

- **useState**: Component state management
- **useEffect**: Side effects and lifecycle management
- **useContext**: Global theme state via ThemeContext
- **useRef**: DOM references and persisting values
- **useMemo**: Performance optimization for computed values
- **useCallback**: Memoized callback functions
- **useReducer**: Complex state management with actions

## Known Issues

### CSS Files

The project contains two unused CSS files from the Vite template:
- `src/App.css` - Not imported anywhere, contains default Vite styles
- `src/index.css` - Not imported anywhere, contains default Vite styles

The active stylesheet is `src/styles.css` which is imported in `main.jsx:4`. Consider removing the unused files to avoid confusion.

### Fixed Issues

- **Accordion filename**: Corrected spelling from `Accordian.jsx` to `Accordion.jsx` to match import statements

## Development Notes

- All components are in separate files for modularity
- No TypeScript in this version (JavaScript-only)
- Styling is CSS-based without preprocessors
- Theme implementation uses CSS classes and context

## Future Enhancements

Potential areas for expansion:
- Add React Router for client-side routing
- Implement API data fetching examples
- Add comprehensive form validation
- Include unit tests with React Testing Library
- Add TypeScript types
- Implement more complex state management patterns

## License

This is a demonstration project for educational purposes.
