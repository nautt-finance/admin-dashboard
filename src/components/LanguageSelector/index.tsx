"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FC, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
      <Label htmlFor="language-select" className="text-sm font-medium">
        Idioma:
      </Label>
      <Select
        value={localActive}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { LanguageSelector };
