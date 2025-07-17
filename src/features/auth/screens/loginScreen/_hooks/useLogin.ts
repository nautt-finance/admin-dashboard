import { LoginFormData } from "../_schema/login.schema";
import { useState } from "react";
import { useHandleError } from "@/hooks/useHandleError";
import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";
import { TOKEN_NAME } from "@/lib/settings";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { cookieOptions } from "@/constants/cookieOptions";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  const router = useRouter();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post(endpoints.auth.login, {
        ...formData,
      });
      const { data } = response;
      const { dados } = data;
      setCookie(
        null,
        TOKEN_NAME,
        encodeURIComponent(dados.token),
        cookieOptions
      );
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
