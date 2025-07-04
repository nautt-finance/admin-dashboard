"use client";

import { LoginFormData, loginSchema } from "../../_schema/login.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import { CardFooter } from "@/components/ui/card";
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
              label="Email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Form.Label htmlFor="password">Password</Form.Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Form.TextPasswordField name="password" type="password" required />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export { LoginForm };
