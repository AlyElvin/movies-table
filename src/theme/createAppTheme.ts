import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '../hooks/useThemeMode';

export function createAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1565c0' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#7b1fa2' : '#ce93d8',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
}
