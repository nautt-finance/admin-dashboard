import type { Metadata } from "next";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export const metadata: Metadata = {
  title: "Nautt - Financial Management",
  description:
    "Nautt is a financial management tool that helps you track your income and expenses.",
};

export default async function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
