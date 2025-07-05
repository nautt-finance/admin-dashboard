import { ErrorMap } from "@/types/error";

const AUTH_ERRORS: ErrorMap = {
  AUTH_001: {
    message: "Credenciais inválidas",
    status: 401,
  },
  AUTH_002: {
    message: "Token inválido",
    status: 401,
  },
  AUTH_003: {
    message: "Token expirado",
    status: 401,
  },
  AUTH_004: {
    message: "Token não encontrado",
    status: 401,
  },
  AUTH_005: {
    message: "Token não é válido",
    status: 401,
  },
};

export default AUTH_ERRORS;
