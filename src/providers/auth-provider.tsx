"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { TOKEN_NAME } from "@/lib/settings";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const PUBLIC_ROUTES = [routes.auth.login, routes.auth.register, routes.root];

const PROTECTED_ROUTES = [routes.dashboard.root];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!user;

  const fetchUser = async (token: string): Promise<User | null> => {
    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      setCookie(null, TOKEN_NAME, token, {
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setUser(userData);

      router.push(routes.dashboard.root);
      return { success: true };
    } catch (error: any) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Erro interno do servidor",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const signOut = () => {
    try {
      // Remover token dos cookies
      destroyCookie(null, TOKEN_NAME);

      // Limpar estado do usuário
      setUser(null);

      // Redirecionar para login
      router.push(routes.auth.login);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  // Função para atualizar dados do usuário
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  // Verificar se a rota é pública
  const isPublicRoute = (path: string): boolean => {
    return PUBLIC_ROUTES.some((route) => path.startsWith(route));
  };

  // Verificar se a rota é protegida
  const isProtectedRoute = (path: string): boolean => {
    return PROTECTED_ROUTES.some((route) => path.startsWith(route));
  };

  // Efeito para verificar autenticação na inicialização
  useEffect(() => {
    const initializeAuth = async () => {
      const cookies = parseCookies();
      const token = cookies[TOKEN_NAME];

      if (token) {
        const userData = await fetchUser(token);
        if (userData) {
          setUser(userData);
        } else {
          // Token inválido, remover dos cookies
          destroyCookie(null, TOKEN_NAME);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Efeito para proteção de rotas
  useEffect(() => {
    if (isLoading) return;

    const currentPath = pathname;

    // Se não está autenticado e tenta acessar rota protegida
    if (!isAuthenticated && isProtectedRoute(currentPath)) {
      router.push(routes.auth.login);
      return;
    }

    // Se está autenticado e tenta acessar rota pública (exceto root)
    if (
      isAuthenticated &&
      isPublicRoute(currentPath) &&
      currentPath !== routes.root
    ) {
      router.push(routes.dashboard.root);
      return;
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
