import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Obter o idioma dos cookies ou usar português como padrão
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "pt";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
