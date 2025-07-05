import { LoginFormData } from "../_schema/login.schema";
import { useState } from "react";
import { useHandleError } from "@/hooks/useHandleError";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // const response = await api.post(endpoints.auth.login, data);
      console.log(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
