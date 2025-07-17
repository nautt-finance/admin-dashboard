import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth-provider";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export { GlobalProvider };
