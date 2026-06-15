import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface ImagePreviewModalProps {
  open: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export function ImagePreviewModal({
  open,
  imageUrl,
  title,
  onClose,
}: ImagePreviewModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="image-preview-title"
    >
      <DialogTitle
        id="image-preview-title"
        sx={{ display: 'flex', alignItems: 'center', pr: 6 }}
      >
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 1,
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
          Click outside or press Escape to close
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
