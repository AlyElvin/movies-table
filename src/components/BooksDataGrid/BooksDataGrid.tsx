import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridColumnVisibilityModel,
  type GridEventListener,
  type GridFilterModel,
  type GridPaginationModel,
  type GridRowHeightParams,
  type GridRowParams,
  type GridSortModel,
} from "@mui/x-data-grid";
import { ImagePreviewModal } from "../ImagePreviewModal";
import { RowDetailsModal } from "../RowDetailsModal";
import { BooksGridLoadingOverlay } from "../BooksGridLoadingOverlay";
import { type Book, calculateRowHeight } from "../../types/book";

interface BooksDataGridProps {
  books: Book[];
  loading: boolean;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  paginationModel: GridPaginationModel;
  columnVisibilityModel: GridColumnVisibilityModel;
  onSortModelChange: (model: GridSortModel) => void;
  onFilterModelChange: (model: GridFilterModel) => void;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onColumnVisibilityModelChange: (model: GridColumnVisibilityModel) => void;
}

interface ImagePreviewState {
  open: boolean;
  imageUrl: string;
  title: string;
}

function getBookFromParams(params: GridRowHeightParams): Book {
  return params.model as Book;
}

export function BooksDataGrid({
  books,
  loading,
  sortModel,
  filterModel,
  paginationModel,
  columnVisibilityModel,
  onSortModelChange,
  onFilterModelChange,
  onPaginationModelChange,
  onColumnVisibilityModelChange,
}: BooksDataGridProps) {
  const apiRef = useGridApiRef();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [rowModalOpen, setRowModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<ImagePreviewState>({
    open: false,
    imageUrl: "",
    title: "",
  });

  useEffect(() => {
    if (books.length > 0) {
      apiRef.current?.resetRowHeights();
    }
  }, [books, apiRef]);

  const handleImageClick = useCallback(
    (event: React.MouseEvent, book: Book): void => {
      event.stopPropagation();
      setImagePreview({
        open: true,
        imageUrl: book.coverUrl,
        title: book.title,
      });
    },
    []
  );

  const handleCloseImagePreview = useCallback((): void => {
    setImagePreview((prev) => ({ ...prev, open: false }));
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = useCallback(
    (params: GridRowParams<Book>) => {
      setSelectedBook(params.row);
      setRowModalOpen(true);
    },
    []
  );

  const handleCloseRowModal = useCallback((): void => {
    setRowModalOpen(false);
  }, []);

  const getRowHeight = useCallback((params: GridRowHeightParams): number => {
    return calculateRowHeight(getBookFromParams(params));
  }, []);

  const columns: GridColDef<Book>[] = useMemo(
    () => [
      {
        field: "coverUrl",
        headerName: "Cover",
        width: 130,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
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
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                boxShadow: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
        minWidth: 280,
        sortable: true,
        filterable: true,
        valueGetter: (_value, row) => `${row.title} ${row.author}`,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              whiteSpace: "normal",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {params.row.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary", mt: 0.5 }}
            >
              {params.row.author}
            </Typography>
          </Box>
        ),
      },
      {
        field: "publishYear",
        headerName: "Published",
        width: 170,
        type: "number",
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Typography
            sx={{
              fontFamily: "monospace",
              color: "success.main",
              fontWeight: 500,
            }}
          >
            {params.value ?? "—"}
          </Typography>
        ),
      },
      {
        field: "pages",
        headerName: "Pages",
        width: 160,
        type: "number",
        sortable: true,
        filterable: true,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => (
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "warning.main",
              width: "100%",
              textAlign: "right",
            }}
          >
            {params.value ?? "—"}
          </Typography>
        ),
      },
    ],
    [handleImageClick]
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Chip
          label={`${books.length} books`}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>

      <Box
        sx={{
          height: 650,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
        }}
      >
        <DataGrid
          apiRef={apiRef}
          rows={books}
          columns={columns}
          loading={loading}
          getRowHeight={getRowHeight}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
          filterModel={filterModel}
          onFilterModelChange={onFilterModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{
            loadingOverlay: BooksGridLoadingOverlay,
          }}
          sx={{
            border: "none",
            "--DataGrid-rowBorderColor": "transparent",
            "& .MuiDataGrid-row": {
              cursor: "pointer",
              borderBottom: 1,
              borderColor: "divider",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "flex-start",
              py: 2,
              px: 2.5,
              whiteSpace: "normal",
              lineHeight: 1.5,
              outline: "none !important",
              borderTop: "none",
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              px: 2.5,
              py: 1.5,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
            "& .MuiDataGrid-overlay": {
              width: "100%",
              height: "100%",
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
