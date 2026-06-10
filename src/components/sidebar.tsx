import { Drawer } from "@base-ui/react/drawer";
import styles from "../index.module.css";
import type { Dispatch, SetStateAction } from "react";
import { Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export function Sidebar({
  open: menuOpen,
  onOpenChange,
  logout,
}: SidebarProps) {
  return (
    <Drawer.Root
      open={menuOpen}
      onOpenChange={onOpenChange}
      swipeDirection="right"
    >
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Viewport className={styles.Viewport}>
          <Drawer.Popup className={styles.Popup}>
            <Drawer.Content className={styles.Content}>
              <div className={styles.Header}>
                <Drawer.Title className={styles.Title}>Navegação</Drawer.Title>
                <div className={styles.Logout}>
                  <Drawer.Close className={styles.Button} onClick={logout}>
                    Logout
                    <LogoutIcon />
                  </Drawer.Close>
                </div>
              </div>
              <Drawer.Description className={styles.Description}>
                <Link href="/">Dashboard</Link>
                <Link href="/reservas">Reservas</Link>
              </Drawer.Description>

              <div className={styles.Actions}>
                <Drawer.Close
                  className={styles.Button}
                  onClick={() => onOpenChange}
                >
                  Fechar
                </Drawer.Close>
              </div>
            </Drawer.Content>
            {/* <div>
              <Drawer.Close className={styles.Button} onClick={logout}>
                Logout
              </Drawer.Close>
            </div> */}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
