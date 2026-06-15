import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-mode';

export type ThemeMode = 'light' | 'dark';

function readStoredMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useThemeMode(): {
  mode: ThemeMode;
  toggleMode: () => void;
} {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback((): void => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { mode, toggleMode };
}
