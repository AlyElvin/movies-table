import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { ThemeMode } from '../../hooks/useThemeMode';

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  return (
    <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
      <IconButton color="inherit" onClick={onToggle} aria-label="toggle theme">
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}
