import { LoginFormData } from "../_schema/login.schema";
import { useState } from "react";
import { useHandleError } from "@/hooks/useHandleError";
import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post(endpoints.auth.login, {
        ...formData,
      });
      const { data } = response;
      const { dados } = data;

      signIn(dados);
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
