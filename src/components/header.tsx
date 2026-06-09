import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { Sidebar } from "./sidebar";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { desconectar } = useAuth()

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "60rem",
        px: 3,
        py: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
        ZB House
      </Typography>

      <IconButton
        onClick={(e) => {
          setMenuOpen(true);
          e.currentTarget.blur();
        }}
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>

      <Sidebar open={menuOpen} onOpenChange={setMenuOpen} logout={() => desconectar()}/>

    </Box>
  );
}
