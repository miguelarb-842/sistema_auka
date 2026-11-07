import type { Metadata } from "next";

import { AcercaPage } from "@/modules/acerca/pages/AcercaPage";
import { getMuseo, getSalas } from "@/modules/museo/services/museo.service";

const museo = getMuseo();
const salas = getSalas();

export const metadata: Metadata = {
  title: "Acerca de la App",
  description: `Sistema Auka es un producto educativo instalable en museos. Esta aplicación simula su instalación en el ${museo.nombre}, con ${salas.length} salas y contenido demostrativo por verificar.`,
};

export default function Page() {
  return <AcercaPage />;
}
