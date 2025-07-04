import { endpoints } from "@/lib/endpoints";
import { api } from "@/lib/api";
import { LoginFormData } from "../_schema/login.schema";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post(endpoints.auth.login, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
