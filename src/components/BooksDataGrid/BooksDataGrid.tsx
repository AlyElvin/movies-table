import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  type GridRowHeightParams,
  type GridRowParams,
} from '@mui/x-data-grid';
import { ImagePreviewModal } from '../ImagePreviewModal';
import { RowDetailsModal } from '../RowDetailsModal';
import { usePersistedGridState } from '../../hooks/usePersistedGridState';
import type { Book } from '../../types/book';
import { calculateRowHeight } from '../../types/book';

interface BooksDataGridProps {
  books: Book[];
  loading: boolean;
}

interface ImagePreviewState {
  open: boolean;
  imageUrl: string;
  title: string;
}

export function BooksDataGrid({ books, loading }: BooksDataGridProps) {
  const {
    sortModel,
    filterModel,
    paginationModel,
    columnVisibilityModel,
    setSortModel,
    setFilterModel,
    setPaginationModel,
    setColumnVisibilityModel,
  } = usePersistedGridState();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [rowModalOpen, setRowModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<ImagePreviewState>({
    open: false,
    imageUrl: '',
    title: '',
  });

  const rowHeightMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const book of books) {
      map.set(book.id, calculateRowHeight(book));
    }
    return map;
  }, [books]);

  const handleImageClick = useCallback(
    (event: React.MouseEvent, book: Book): void => {
      event.stopPropagation();
      setImagePreview({
        open: true,
        imageUrl: book.coverUrl,
        title: book.title,
      });
    },
    [],
  );

  const handleCloseImagePreview = useCallback((): void => {
    setImagePreview((prev) => ({ ...prev, open: false }));
  }, []);

  const handleRowClick: GridEventListener<'rowClick'> = useCallback(
    (params: GridRowParams<Book>) => {
      setSelectedBook(params.row);
      setRowModalOpen(true);
    },
    [],
  );

  const handleCloseRowModal = useCallback((): void => {
    setRowModalOpen(false);
  }, []);

  const columns: GridColDef<Book>[] = useMemo(
    () => [
      {
        field: 'coverUrl',
        headerName: 'Cover',
        width: 110,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              py: 1,
            }}
          >
            <Box
              component="img"
              src={params.row.coverUrl}
              alt={params.row.title}
              onClick={(event) => handleImageClick(event, params.row)}
              sx={{
                width: 80,
                height: 120,
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                boxShadow: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          </Box>
        ),
      },
      {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 250,
        sortable: true,
        filterable: true,
        valueGetter: (_value, row) => `${row.title} ${row.author}`,
        renderCell: (params) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              py: 1,
              whiteSpace: 'normal',
              lineHeight: 1.5,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: 'primary.main' }}
            >
              {params.row.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 0.5 }}
            >
              {params.row.author}
            </Typography>
          </Box>
        ),
      },
      {
        field: 'publishYear',
        headerName: 'Published',
        width: 130,
        type: 'number',
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Typography
            sx={{
              fontFamily: 'monospace',
              color: 'success.main',
              fontWeight: 500,
            }}
          >
            {params.value ?? '—'}
          </Typography>
        ),
      },
      {
        field: 'pages',
        headerName: 'Pages',
        width: 120,
        type: 'number',
        sortable: true,
        filterable: true,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: 'warning.main',
              width: '100%',
              textAlign: 'right',
            }}
          >
            {params.value ?? '—'}
          </Typography>
        ),
      },
    ],
    [handleImageClick],
  );

  const getRowHeight = useCallback(
    (params: GridRowHeightParams): number => {
      return rowHeightMap.get(String(params.id)) ?? 150;
    },
    [rowHeightMap],
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Chip
          label={`${books.length} books`}
          color="primary"
          variant="outlined"
          size="small"
        />
        <Typography variant="caption" color="text.secondary">
          Click a row for details · Click cover for full image
        </Typography>
      </Box>

      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={books}
          columns={columns}
          loading={loading}
          getRowHeight={getRowHeight}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
              minHeight: '100px !important',
              maxHeight: '300px !important',
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
              minHeight: '100px !important',
              maxHeight: '300px !important',
            },
          }}
        />
      </Box>

      <RowDetailsModal
        open={rowModalOpen}
        book={selectedBook}
        onClose={handleCloseRowModal}
      />

      <ImagePreviewModal
        open={imagePreview.open}
        imageUrl={imagePreview.imageUrl}
        title={imagePreview.title}
        onClose={handleCloseImagePreview}
      />
    </>
  );
}
