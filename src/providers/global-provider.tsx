import { ThemeProvider } from "./theme-provider";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { GlobalProvider };
