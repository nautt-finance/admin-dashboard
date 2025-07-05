export interface ApiError {
  message: string;
  status: number;
}

export type ErrorMap = Record<string, ApiError>;
