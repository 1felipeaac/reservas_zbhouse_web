import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../services/api";


interface UserData {
  login: string;
  nome?: string;
}

interface AuthContextType {
  autenticar: (credentials: { login: string; senha: string }) => Promise<void>;
  desconectar: () => void;
  user: UserData | null;
  isLoading: boolean; 
}

// 2. Inicialização segura do Contexto
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    const storagedUser = localStorage.getItem("@zbHouse:user");

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    
    
    setIsLoading(false); 
  }, []);

  async function autenticar({ login, senha }: { login: string; senha: string }) {
    try {
      
      const response = await api.post("/login", { login, senha });

    
      const userData = response.data; 

      localStorage.setItem("@zbHouse:user", JSON.stringify(userData));
      setUser(userData);

    } catch (error: any) {
      console.error(error);
      const mensagemErro = error.response?.data?.message || "Erro ao autenticar. Verifique as suas credenciais.";
      alert(mensagemErro);
      throw error; 
    }
  }

  function desconectar() {
    localStorage.removeItem("@zbHouse:user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ autenticar, desconectar, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (Object.keys(context).length === 0) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}