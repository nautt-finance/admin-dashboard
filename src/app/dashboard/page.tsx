import { DashboardScreen } from "@/features/dashboard/screens";
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
  return <DashboardScreen />;
}
