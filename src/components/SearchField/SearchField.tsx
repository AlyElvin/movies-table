import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  isSearching?: boolean;
}

export function SearchField({
  value,
  onChange,
  isSearching = false,
}: SearchFieldProps) {
  return (
    <TextField
      fullWidth
      label="Search books"
      placeholder="e.g. fiction, javascript, tolkien..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: isSearching ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{ mb: 2 }}
    />
  );
}
