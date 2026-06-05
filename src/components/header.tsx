import { Box, Typography, IconButton } from "@mui/material";
import { Drawer } from "@base-ui/react/drawer";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../index.module.css";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

      {/* Menu Drawer à Direita */}
      <Drawer.Root
        open={menuOpen}
        onOpenChange={setMenuOpen}
        swipeDirection="right"
      >
        <Drawer.Portal>
          <Drawer.Backdrop className={styles.Backdrop} />
          <Drawer.Viewport className={styles.Viewport}>
            <Drawer.Popup className={styles.Popup}>
              <Drawer.Content className={styles.Content}>
                <Drawer.Title className={styles.Title}>Navegação</Drawer.Title>
                <Drawer.Description className={styles.Description}>
                  Rotas do Sistema
                </Drawer.Description>

                <div className={styles.Actions}>
                  <Drawer.Close
                    className={styles.Button}
                    onClick={() => setMenuOpen(false)}
                  >
                    Fechar
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </Box>
  );
}
