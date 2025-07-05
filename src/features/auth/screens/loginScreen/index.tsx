"use client";

import { LanguageSelector } from "@/components/LanguageSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/LoginForm";
import { useLogin } from "./_hooks/useLogin";
import { useTranslations } from "next-intl";

const LoginScreen = () => {
  const { handleLogin } = useLogin();
  const t = useTranslations("LoginPage");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="w-72">
          <CardTitle>{t("heading")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginScreen };
