import { useCallback, useEffect, useState } from 'react';
import type {
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';

const STORAGE_KEY = 'books-grid-state';

interface PersistedGridState {
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  paginationModel: GridPaginationModel;
  columnVisibilityModel: GridColumnVisibilityModel;
}

const DEFAULT_STATE: PersistedGridState = {
  sortModel: [],
  filterModel: { items: [] },
  paginationModel: { page: 0, pageSize: 10 },
  columnVisibilityModel: {},
};

function readStoredState(): PersistedGridState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_STATE;
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return DEFAULT_STATE;
    }
    return { ...DEFAULT_STATE, ...(parsed as PersistedGridState) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function usePersistedGridState(): PersistedGridState & {
  setSortModel: (model: GridSortModel) => void;
  setFilterModel: (model: GridFilterModel) => void;
  setPaginationModel: (model: GridPaginationModel) => void;
  setColumnVisibilityModel: (model: GridColumnVisibilityModel) => void;
} {
  const [state, setState] = useState<PersistedGridState>(readStoredState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setSortModel = useCallback((sortModel: GridSortModel): void => {
    setState((prev) => ({ ...prev, sortModel }));
  }, []);

  const setFilterModel = useCallback((filterModel: GridFilterModel): void => {
    setState((prev) => ({ ...prev, filterModel }));
  }, []);

  const setPaginationModel = useCallback(
    (paginationModel: GridPaginationModel): void => {
      setState((prev) => ({ ...prev, paginationModel }));
    },
    [],
  );

  const setColumnVisibilityModel = useCallback(
    (columnVisibilityModel: GridColumnVisibilityModel): void => {
      setState((prev) => ({ ...prev, columnVisibilityModel }));
    },
    [],
  );

  return {
    ...state,
    setSortModel,
    setFilterModel,
    setPaginationModel,
    setColumnVisibilityModel,
  };
}
