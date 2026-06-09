import { Drawer } from "@base-ui/react/drawer";
import styles from "../index.module.css";
import type { Dispatch, SetStateAction } from "react";

interface SidebarProps{
    open: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    logout: () => void
}

export function Sidebar({open: menuOpen, onOpenChange, logout}: SidebarProps){
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
                <Drawer.Title className={styles.Title}>Navegação</Drawer.Title>
                <Drawer.Description className={styles.Description}>
                  Rotas do Sistema
                </Drawer.Description>

                <div className={styles.Actions}>
                  <Drawer.Close
                    className={styles.Button}
                    onClick={logout}
                  >
                    Logout
                  </Drawer.Close>
                </div>
                <div className={styles.Actions}>
                  <Drawer.Close
                    className={styles.Button}
                    onClick={() => onOpenChange}
                  >
                    Fechar
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    )
}