import { Metadata } from "next";
import { ListarBancosScreen } from "@/features/banks";

export const metadata: Metadata = {
  title: "Bancos - Nautt",
};

const ListarBancos = () => {
  return <ListarBancosScreen />;
};

export default ListarBancos;
