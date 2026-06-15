import { forwardRef } from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { GridOverlay, type GridLoadingOverlayProps } from "@mui/x-data-grid";

export const BooksGridLoadingOverlay = forwardRef<
  HTMLDivElement,
  GridLoadingOverlayProps
>(function BooksGridLoadingOverlay(props, ref) {
  return (
    <GridOverlay
      ref={ref}
      {...props}
      sx={{
        zIndex: 4,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          px: 3,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress size={56} thickness={4} />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoStoriesIcon color="primary" fontSize="small" />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Loading books
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Fetching catalog from Open Library…
          </Typography>
        </Box>
      </Box>
    </GridOverlay>
  );
});
