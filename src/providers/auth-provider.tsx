"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { routes } from "@/lib/routes";
import { TOKEN_NAME } from "@/lib/settings";
import { cookieOptions } from "@/constants/cookieOptions";
import { User } from "@/types/user";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  signIn: (userData: User) => void;
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

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const cookies = parseCookies();
        const userCookie = cookies[TOKEN_NAME];

        if (userCookie) {
          const userData = JSON.parse(userCookie);
          setUser(userData);
        }
      } catch (error) {
        destroyCookie(null, TOKEN_NAME, cookieOptions);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = (userData: User) => {
    setCookie(null, TOKEN_NAME, JSON.stringify(userData), cookieOptions);
    setUser(userData);
  };

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
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      setCookie(null, TOKEN_NAME, JSON.stringify(updatedUser), cookieOptions);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signOut,
        updateUser,
        signIn,
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
