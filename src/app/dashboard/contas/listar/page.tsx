import { Metadata } from "next";
import { ListarContasScreen } from "@/features/bills/screens/listarContas";

export const metadata: Metadata = {
  title: "Contas à Pagar - Nautt",
};

const ListarContas = () => {
  return <ListarContasScreen />;
};

export default ListarContas;
