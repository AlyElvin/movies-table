# MUI Books DataGrid

Демо-приложение на React и Material UI: таблица книг с сортировкой, фильтрацией, модальными окнами и сохранением состояния.

## Live Demo

После деплоя добавьте ссылку сюда. Локально: `npm run dev` → `http://localhost:5173`

### Публикация на GitHub

```bash
# Создайте репозиторий на GitHub, затем:
git remote add origin https://github.com/<username>/mui-books-datagrid.git
git push -u origin main
```

### Публикация на Netlify

1. Войдите на [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project** → выберите GitHub-репозиторий
3. Настройки подхватятся из `netlify.toml` автоматически
4. После деплоя скопируйте URL (например `https://mui-books-datagrid.netlify.app`) в секцию **Live Demo** выше

Альтернатива через CLI:

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

## Возможности

### Основные требования

- **React** + **MUI** (`@mui/material`, `@mui/icons-material`)
- **MUI X DataGrid** — таблица с 4 колонками:
  | Колонка | Описание | Сортировка / фильтр |
  |---------|----------|---------------------|
  | Cover | Обложка книги (клик → модалка с большим изображением) | — |
  | Description | Название (жирный, primary) + автор (курсив, secondary) | да |
  | Published | Год издания (monospace, зелёный) | да |
  | Pages | Количество страниц (крупный шрифт, оранжевый) | да |
- **Динамическая высота строк** — от 100 до 300 px в зависимости от длины описания (`getRowHeight`)
- **Клик по строке** → модальное окно с деталями книги (`Dialog`)
- **Клик по обложке** → модальное окно с полноразмерным изображением
- **Class component** — `ErrorBoundary` для обработки ошибок

### Бонусы

- [x] Сохранение состояния таблицы (сортировка, фильтры, пагинация) в `localStorage`
- [x] Переключение светлой / тёмной темы (`ThemeProvider` + `localStorage`)
- [x] Данные из открытого API — [Open Library](https://openlibrary.org/dev/docs/api/search)
- [x] Поиск по названию с debounce 300 ms
- [x] Chip со счётчиком книг, `LinearProgress` при загрузке

## Стек

- Vite + React 19 + TypeScript
- MUI Material v9 + MUI X DataGrid v9
- TanStack Query — загрузка данных
- Zod — валидация ответа API

## MUI-компоненты

`DataGrid`, `Dialog`, `ThemeProvider`, `CssBaseline`, `AppBar`, `Toolbar`, `TextField`, `Chip`, `Alert`, `IconButton`, `Stack`, `Typography`, `LinearProgress`

## Запуск локально

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на Netlify

1. Загрузите репозиторий на GitHub
2. В [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**
3. Выберите репозиторий — `netlify.toml` уже настроен
4. После деплоя добавьте URL в секцию **Live Demo** выше

## Примечание о `getRowHeight`

Переменная высота строк (`getRowHeight`) в MUI X DataGrid — функция **Pro**-плана. В Community-версии она может работать с ограничениями. В проекте высота вычисляется по длине текста и ограничивается диапазоном 100–300 px. При необходимости можно перейти на фиксированный `rowHeight={150}`.

## Структура проекта

```
src/
├── api/openLibrary.ts       # Fetch + Zod
├── components/
│   ├── BooksDataGrid/       # Основная таблица
│   ├── RowDetailsModal/     # Модалка деталей строки
│   ├── ImagePreviewModal/   # Модалка обложки
│   ├── ThemeToggle/         # Переключатель темы
│   ├── SearchField/         # Поиск
│   └── ErrorBoundary/       # Class component
├── hooks/
│   ├── useBooks.ts
│   ├── usePersistedGridState.ts
│   └── useThemeMode.ts
└── theme/createAppTheme.ts
```

## Лицензия

MIT
