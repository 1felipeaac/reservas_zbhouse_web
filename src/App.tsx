import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import  { AuthProvider } from './hooks/auth'
import { Login } from './pages/login'
import { ProtectedRoute } from './routes/protected-route'
import { LayoutMain } from './components/layout-main'
import { Dashboard } from './pages/dashboard'


function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            
            
            <Route element={<LayoutMain />}>
              <Route path="/" element={<Dashboard/>} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
