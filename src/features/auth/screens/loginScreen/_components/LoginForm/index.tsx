"use client";

import { LoginFormData, loginSchema } from "../../_schema/login.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const t = useTranslations("LoginPage");
  const tCommon = useTranslations("Common");
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
              label={t("username")}
              name="username"
              type="text"
              placeholder={t("usernamePlaceholder")}
              required
            />
          </div>
          <Form.TextPasswordField
            label={tCommon("password")}
            name="password"
            required
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Button type="submit" className="w-full">
            {t("submitButton")}
          </Button>
          <Button variant="ghost" className="w-full">
            {t("forgotPasswordButton")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export { LoginForm };
