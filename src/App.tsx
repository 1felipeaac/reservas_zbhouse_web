import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import  { AuthProvider } from './hooks/auth'
import { Login } from './pages/login'
import { ProtectedRoute } from './routes/protected-route'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            
              <Route path="/" element={<div>Dashboard Temporário</div>} />
            
            {/* <Route element={<LayoutMain />}>
            </Route> */}

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
