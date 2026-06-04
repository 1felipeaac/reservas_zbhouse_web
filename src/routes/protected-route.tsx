import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth(); 

  
  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center">Carregando...</div>; 
  }


  return user ? <Outlet /> : <Navigate to="/login" replace />;
}