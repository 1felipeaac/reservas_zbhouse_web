import { Box, Pagination } from "@mui/material";
import type { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  page?: number; // Total de páginas
  currentPage: number; // A página atual selecionada
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  empty?: boolean;
}

export function Carousel({
  children,
  page,
  currentPage,
  onChangePage,
  empty,
}: CarouselProps) {
  return (
    <Box
      sx={{
        // width: "100%",
        maxWidth: 1024,
        display: "flex",
        flexDirection: "column",
        // gap: 2,
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          px: 1,
          pt: 2,
          flexWrap: "wrap",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#94a3b8" },
        }}
      >
        {children}
      </Box>

      {empty === false && page !== undefined && page > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={page}
            page={currentPage}
            onChange={onChangePage}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
