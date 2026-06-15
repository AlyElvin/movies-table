import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';

const STORAGE_KEY = 'books-app-state';
const SEARCH_DEBOUNCE_MS = 400;
const DEFAULT_SEARCH = 'fiction';

interface PersistedAppState {
  searchInput: string;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  paginationModel: GridPaginationModel;
  columnVisibilityModel: GridColumnVisibilityModel;
}

const DEFAULT_STATE: PersistedAppState = {
  searchInput: DEFAULT_SEARCH,
  sortModel: [],
  filterModel: { items: [] },
  paginationModel: { page: 0, pageSize: 10 },
  columnVisibilityModel: {},
};

function readStoredState(): PersistedAppState {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem('books-grid-state');
    if (!raw) {
      return DEFAULT_STATE;
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return DEFAULT_STATE;
    }
    const stored = parsed as Partial<PersistedAppState>;
    return {
      ...DEFAULT_STATE,
      ...stored,
      filterModel: stored.filterModel ?? DEFAULT_STATE.filterModel,
      paginationModel: stored.paginationModel ?? DEFAULT_STATE.paginationModel,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeStoredState(state: PersistedAppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function usePersistedAppState(): PersistedAppState & {
  debouncedSearch: string;
  isSearchPending: boolean;
  setSearchInput: (value: string) => void;
  setSortModel: (model: GridSortModel) => void;
  setFilterModel: (model: GridFilterModel) => void;
  setPaginationModel: (model: GridPaginationModel) => void;
  setColumnVisibilityModel: (model: GridColumnVisibilityModel) => void;
} {
  const [state, setState] = useState<PersistedAppState>(readStoredState);
  const [debouncedSearch, setDebouncedSearch] = useState(
    () => state.searchInput.trim() || DEFAULT_SEARCH,
  );
  const isHydratedRef = useRef(false);

  useEffect(() => {
    writeStoredState(state);
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(state.searchInput.trim() || DEFAULT_SEARCH);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [state.searchInput]);

  useEffect(() => {
    isHydratedRef.current = true;
  }, []);

  const setSearchInput = useCallback((searchInput: string): void => {
    setState((prev) => ({ ...prev, searchInput }));
  }, []);

  const setSortModel = useCallback((sortModel: GridSortModel): void => {
    if (!isHydratedRef.current) {
      return;
    }
    setState((prev) => ({ ...prev, sortModel }));
  }, []);

  const setFilterModel = useCallback((filterModel: GridFilterModel): void => {
    if (!isHydratedRef.current) {
      return;
    }
    setState((prev) => ({ ...prev, filterModel }));
  }, []);

  const setPaginationModel = useCallback(
    (paginationModel: GridPaginationModel): void => {
      if (!isHydratedRef.current) {
        return;
      }
      setState((prev) => ({ ...prev, paginationModel }));
    },
    [],
  );

  const setColumnVisibilityModel = useCallback(
    (columnVisibilityModel: GridColumnVisibilityModel): void => {
      if (!isHydratedRef.current) {
        return;
      }
      setState((prev) => ({ ...prev, columnVisibilityModel }));
    },
    [],
  );

  const isSearchPending =
    (state.searchInput.trim() || DEFAULT_SEARCH) !== debouncedSearch;

  return {
    ...state,
    debouncedSearch,
    isSearchPending,
    setSearchInput,
    setSortModel,
    setFilterModel,
    setPaginationModel,
    setColumnVisibilityModel,
  };
}
