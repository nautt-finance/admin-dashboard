import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("Common");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t("welcome")}</h1>
          <ThemeToggle />
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-card text-card-foreground rounded-lg border">
              <h2 className="text-xl font-semibold mb-2">Card 1</h2>
              <p className="text-muted-foreground">
                Este é um exemplo de card para demonstrar as cores do tema.
              </p>
            </div>

            <div className="p-6 bg-card text-card-foreground rounded-lg border">
              <h2 className="text-xl font-semibold mb-2">Card 2</h2>
              <p className="text-muted-foreground">
                As cores se ajustam automaticamente entre modo claro e escuro.
              </p>
            </div>

            <div className="p-6 bg-card text-card-foreground rounded-lg border">
              <h2 className="text-xl font-semibold mb-2">Card 3</h2>
              <p className="text-muted-foreground">
                Teste o botão de alternância de tema no canto superior direito.
              </p>
              <Button>Click me</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
