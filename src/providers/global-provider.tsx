import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth-provider";
import { ModalProvider } from "@/hooks/useModal";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export { GlobalProvider };
