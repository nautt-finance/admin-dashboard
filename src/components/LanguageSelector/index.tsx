"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FC, useTransition } from "react";

const languages = [
  { code: "pt", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

const LanguageSelector: FC = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (locale: string) => {
    startTransition(() => {
      document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        Idioma:
      </label>
      <select
        id="language-select"
        disabled={isPending}
        value={localActive}
        onChange={(e) => onSelectChange(e.target.value)}
        className="px-3 py-1 border rounded-md bg-white text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      {isPending && (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export { LanguageSelector };
