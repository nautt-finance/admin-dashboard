import { LoginFormData } from "../_schema/login.schema";

export const useLogin = () => {
  const handleLogin = (data: LoginFormData) => {
    console.log("Login data: ", data);
  };

  return { handleLogin };
};
