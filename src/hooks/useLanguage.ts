"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function useLanguage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();

  const changeLanguage = (locale: string) => {
    startTransition(() => {
      // Define o cookie com o novo idioma
      document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;

      // Recarrega a página para aplicar o novo idioma
      router.refresh();
    });
  };

  return {
    currentLocale,
    changeLanguage,
    isPending,
  };
}
