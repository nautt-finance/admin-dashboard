import { toast } from "sonner";
import AUTH_ERRORS from "@/features/auth/errors";

export const useHandleError = () => {
  const handleError = (error: any) => {
    const knownError = AUTH_ERRORS[error.code] || AUTH_ERRORS[error.message];

    let errorMessage: string;
    let status: number;

    if (knownError) {
      errorMessage = knownError.message;
      status = knownError.status;
    } else {
      errorMessage = error.message || "Erro inesperado";
      status = error.status || 500;
    }
    toast.error(errorMessage, {
      description: `Código: ${status}`,
      duration: 4000,
    });

    return {
      message: errorMessage,
      status,
    };
  };

  return { handleError };
};
