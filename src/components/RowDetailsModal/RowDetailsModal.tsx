import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Book } from '../../types/book';

interface RowDetailsModalProps {
  open: boolean;
  book: Book | null;
  onClose: () => void;
}

export function RowDetailsModal({ open, book, onClose }: RowDetailsModalProps) {
  if (!book) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="row-details-title"
    >
      <DialogTitle
        id="row-details-title"
        sx={{ display: 'flex', alignItems: 'center', pr: 6 }}
      >
        Book details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Box
            component="img"
            src={book.coverUrl}
            alt={book.title}
            sx={{
              width: 140,
              height: 210,
              objectFit: 'cover',
              borderRadius: 1,
              flexShrink: 0,
              alignSelf: 'center',
            }}
          />
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
              {book.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              {book.author}
            </Typography>
            <Divider />
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              {book.publishYear !== null && (
                <Chip
                  label={`Published: ${book.publishYear}`}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              )}
              {book.pages !== null && (
                <Chip
                  label={`${book.pages} pages`}
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              )}
              {book.isbn !== null && (
                <Chip label={`ISBN: ${book.isbn}`} variant="outlined" size="small" />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Open Library ID: {book.id}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
