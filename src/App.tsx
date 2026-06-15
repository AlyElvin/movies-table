import { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BooksDataGrid } from './components/BooksDataGrid';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchField } from './components/SearchField';
import { ThemeToggle } from './components/ThemeToggle';
import { useBooks } from './hooks/useBooks';
import { usePersistedAppState } from './hooks/usePersistedAppState';
import { useThemeMode } from './hooks/useThemeMode';
import { createAppTheme } from './theme/createAppTheme';

const queryClient = new QueryClient();

function AppContent() {
  const { mode, toggleMode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const {
    searchInput,
    debouncedSearch,
    isSearchPending,
    setSearchInput,
    sortModel,
    filterModel,
    paginationModel,
    columnVisibilityModel,
    setSortModel,
    setFilterModel,
    setPaginationModel,
    setColumnVisibilityModel,
  } = usePersistedAppState();

  const { books, isLoading, isFetching, isError, error } = useBooks(debouncedSearch);

  const showGridLoading = isLoading || isFetching;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            MUI Books DataGrid
          </Typography>
          <ThemeToggle mode={mode} onToggle={toggleMode} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Open Library Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore books with sortable, filterable MUI DataGrid. State persists
          across page reloads.
        </Typography>

        <SearchField
          value={searchInput}
          onChange={setSearchInput}
          isSearching={isSearchPending}
        />

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.message ?? 'Failed to load books'}
          </Alert>
        )}

        <Box sx={{ width: '100%' }}>
          <BooksDataGrid
            books={books ?? []}
            loading={showGridLoading}
            sortModel={sortModel}
            filterModel={filterModel}
            paginationModel={paginationModel}
            columnVisibilityModel={columnVisibilityModel}
            onSortModelChange={setSortModel}
            onFilterModelChange={setFilterModel}
            onPaginationModelChange={setPaginationModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
