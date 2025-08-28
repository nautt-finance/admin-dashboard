export interface User {
  id: number;
  token: string;
  name: string;
  email: string;
  role: "admin" | "user";
  dark_mode: boolean;
  cod_afiliado: string;
  needs_2fa: boolean;
  kyb_id: number;
  kyc_id: number;
  limite: {
    entradas: number;
    saidas: number;
  };
  webhook: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
