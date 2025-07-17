"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { routes } from "@/lib/routes";
import { TOKEN_NAME } from "@/lib/settings";
import { cookieOptions } from "@/constants/cookieOptions";

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
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // const fetchUser = async (token: string): Promise<User | null> => {
  //   try {
  //     const response = await api.get("/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data.user;
  //   } catch (error) {
  //     console.error("Erro ao buscar dados do usuário:", error);
  //     return null;
  //   }
  // };

  const signOut = () => {
    try {
      destroyCookie(null, TOKEN_NAME, cookieOptions);
      setUser(null);
      router.push(routes.auth.login);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     const cookies = parseCookies();
  //     const token = cookies[TOKEN_NAME];

  //     if (token) {
  //       const userData = await fetchUser(token);
  //       if (userData) {
  //         setUser(userData);
  //       } else {
  //         destroyCookie(null, TOKEN_NAME);
  //       }
  //     }

  //     setIsLoading(false);
  //   };

  //   initializeAuth();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
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
