import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface SearchFieldProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export function SearchField({ onSearch, defaultValue = 'fiction' }: SearchFieldProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim() || 'fiction');
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <TextField
      fullWidth
      label="Search books"
      placeholder="e.g. fiction, javascript, tolkien..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{ mb: 2 }}
    />
  );
}
