import { LoginScreen } from "@/features/auth/screens/loginScreen";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("LoginPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function LoginPage() {
  return <LoginScreen />;
}
