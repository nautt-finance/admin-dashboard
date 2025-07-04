"use client";

import { LoginFormData, loginSchema } from "../../_schema/login.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Form.TextField
              label="Nome de usuário"
              name="username"
              type="text"
              placeholder="Digite seu nome de usuário"
              required
            />
          </div>
          <Form.TextPasswordField
            label="Senha"
            name="password"
            required
            placeholder="Digite sua senha"
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <Button variant="ghost" className="w-full">
            Esqueci minha senha
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export { LoginForm };
