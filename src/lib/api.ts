// services/api.ts
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import { BASE_URL, TOKEN_NAME } from "./settings";

const createAPI = (): AxiosInstance => {
  const cookies = parseCookies();
  const userCookie = cookies[TOKEN_NAME];

  let authToken = "";

  if (userCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      authToken = userData.token || "";
    } catch (error) {
      console.error("Erro ao fazer parse do token:", error);
    }
  }

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
  });

  return api;
};

export const api = createAPI();
