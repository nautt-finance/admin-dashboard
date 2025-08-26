export const formatDateForInput = (isoDate: string): string => {
  if (!isoDate) return "";
  try {
    return new Date(isoDate).toISOString().split("T")[0];
  } catch {
    return "";
  }
};

export const formatDateForApi = (dateString: string): string => {
  if (!dateString) return "";
  try {
    return new Date(dateString + "T00:00:00.000Z").toISOString();
  } catch {
    return dateString;
  }
};

export const formatCurrency = (value: string, currency: string = "BRL") => {
  const numericValue = parseFloat(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(numericValue);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};
