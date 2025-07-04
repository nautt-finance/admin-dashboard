"use client";

import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/LoginForm";
import { useLogin } from "./_hooks/useLogin";

const LoginScreen = () => {
  const { handleLogin } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LanguageSelector />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginScreen };
