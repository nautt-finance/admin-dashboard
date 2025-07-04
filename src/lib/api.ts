// services/api.ts
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import { BASE_URL, TOKEN_NAME } from "./settings";

const createAPI = (): AxiosInstance => {
  const token = parseCookies()[TOKEN_NAME];

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};

export const api = createAPI();
