# MUI Books DataGrid

A React demo application built with **Material UI** and **MUI X DataGrid**. It displays books from the [Open Library API](https://openlibrary.org/dev/docs/api/search) in a sortable, filterable table with modals, theme switching, and persisted UI state across page reloads.

## Live Demo

> Add your deployed URL here after publishing (e.g. `https://mui-books-datagrid.netlify.app`).

Local development: `npm run dev` → [http://localhost:5173](http://localhost:5173)

## Features

### Core requirements

| Feature | Implementation |
|--------|----------------|
| **React + MUI** | `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid` |
| **4+ columns** | Cover, Description, Published, Pages |
| **Sort & filter** | Enabled on all text/numeric columns (except Cover) |
| **Column styling** | Title (bold, primary), author (italic, secondary), year (monospace, green), pages (large, orange) |
| **Dynamic row height** | 100–300 px based on title/author length via `getRowHeight` |
| **Row click** | Opens a `Dialog` with full book details |
| **Cover click** | Opens a `Dialog` with a large cover image |
| **Class component** | `ErrorBoundary` wraps the app and shows an MUI `Alert` on errors |

### Bonus features

- [x] **Persisted state** — search query, sorting, filters, pagination, and column visibility saved to `localStorage` (`books-app-state`)
- [x] **Light / dark theme** — toggle in the app bar, preference stored in `localStorage`
- [x] **Open API** — [Open Library Search API](https://openlibrary.org/dev/docs/api/search)
- [x] **Debounced search** — 400 ms delay; spinner in the search field while waiting
- [x] **Custom loading overlay** — centered spinner with blurred, dimmed backdrop over the grid during fetch
- [x] **Smooth refetch** — previous results stay visible (`keepPreviousData`) while new data loads

## DataGrid columns

| Column | Field | Sort / Filter | Styling |
|--------|-------|---------------|---------|
| Cover | `coverUrl` | — | Thumbnail 80×120; click opens image modal |
| Description | `title`, `author` | Yes | Bold primary title + italic secondary author |
| Published | `publishYear` | Yes | Monospace, green |
| Pages | `pages` | Yes | 18 px, bold, orange, right-aligned |

## Tech stack

- **Vite** + **React 19** + **TypeScript** (strict)
- **MUI Material v9** + **MUI X DataGrid v9**
- **TanStack Query v5** — data fetching and caching
- **Zod** — runtime validation of API responses
- **Netlify** — deployment (`netlify.toml` included)

## MUI components used

`DataGrid`, `Dialog`, `ThemeProvider`, `CssBaseline`, `AppBar`, `Toolbar`, `TextField`, `Chip`, `Alert`, `IconButton`, `Stack`, `Typography`, `CircularProgress`, `GridOverlay` (custom loading slot)

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
npm install
npm run dev
```

### Build & preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project structure

```
src/
├── api/
│   └── openLibrary.ts          # Fetch + Zod schema + Book mapping
├── components/
│   ├── BooksDataGrid/          # DataGrid, columns, row/image click handlers
│   ├── BooksGridLoadingOverlay/# Custom loading overlay (spinner + backdrop)
│   ├── RowDetailsModal/        # Row details dialog
│   ├── ImagePreviewModal/      # Full-size cover dialog
│   ├── SearchField/            # Controlled search input with debounce indicator
│   ├── ThemeToggle/            # Light/dark mode switch
│   └── ErrorBoundary/          # Class component error boundary
├── hooks/
│   ├── useBooks.ts             # TanStack Query hook for Open Library
│   ├── usePersistedAppState.ts # localStorage: search, grid state
│   └── useThemeMode.ts         # Theme preference persistence
├── theme/
│   └── createAppTheme.ts       # MUI theme factory
├── types/
│   └── book.ts                 # Book type + row height calculation
├── App.tsx
└── main.tsx
```

## How it works

### Data fetching

Books are loaded from:

```
GET https://openlibrary.org/search.json?q={query}&limit=50&fields=...
```

Cover images use `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`. Books without a cover fall back to `/no-cover.svg`.

### Persisted state

All of the following survive a page reload (stored under `books-app-state` in `localStorage`):

- Search input value
- `sortModel`, `filterModel`, `paginationModel`, `columnVisibilityModel`

Theme mode is stored separately under `theme-mode`.

### Loading UX

- **Initial load** — custom overlay with spinner, blurred backdrop, and card
- **Search / refetch** — same overlay over the grid; previous rows remain underneath (dimmed)
- **Debounce** — small `CircularProgress` in the search field while the 400 ms timer runs

### Row height

Row height is computed from title and author length (`calculateRowHeight` in `src/types/book.ts`) and passed to `getRowHeight`. Values are clamped between **100 px** and **300 px**.

> **Note:** Dynamic row height (`getRowHeight`) is a MUI X DataGrid **Pro** feature. It works in this project for learning purposes; in production you may need a Pro license or a fixed `rowHeight` fallback.

## Deployment

### GitHub

```bash
git remote add origin https://github.com/<username>/mui-books-datagrid.git
git push -u origin main
```

### Netlify

1. Sign in at [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project** → select your GitHub repo
3. Build settings are read from `netlify.toml` automatically
4. Copy the deploy URL into the **Live Demo** section above

**CLI alternative:**

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## License

MIT
