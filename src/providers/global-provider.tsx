import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export { GlobalProvider };
