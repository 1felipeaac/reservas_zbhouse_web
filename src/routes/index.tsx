import Login from "@mui/icons-material/Login";
import { Routes, Route } from "react-router-dom";
import { LayoutMain } from "../components/layout-main";
import { Dashboard } from "../pages/dashboard";
import { ProtectedRoute } from "./protected-route";
import { Form } from "../pages/form";

export function AppRoutes(){

    return(
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            
            <Route element={<LayoutMain />}>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/reservas" element={<Form/>}/>
            </Route>

          </Route>

        </Routes>
    )
}