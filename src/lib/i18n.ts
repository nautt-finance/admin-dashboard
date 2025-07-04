import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["pt", "en", "es"] as const;
export const defaultLocale = "pt" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const validLocale = locale as Locale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
