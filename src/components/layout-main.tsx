import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./header"; // Agora importando o Header

export function LayoutMain() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f8fafc",
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: "#0f172a",
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: 3,
        }}
      >
        <Header />
      </Box>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          mx: "auto",
          height:"100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
