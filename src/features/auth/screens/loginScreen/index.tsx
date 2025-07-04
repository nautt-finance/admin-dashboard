"use client";

import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/LoginForm";
import { useLogin } from "./_hooks/useLogin";

const LoginScreen = () => {
  const { handleLogin } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="w-72">
          <CardTitle>Bem vindo de volta!</CardTitle>
          <CardDescription>
            Digite seu nome de usuário e senha para entrar em sua conta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginScreen };
