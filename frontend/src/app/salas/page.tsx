import type { Metadata } from "next";

import { SalasPage } from "@/modules/salas/pages/SalasPage";
import { getMuseo, getSalas } from "@/modules/museo/services/museo.service";

const museo = getMuseo();
const salas = getSalas();

export const metadata: Metadata = {
  title: "Salas del museo",
  description: `Recorré las ${salas.length} salas de la instalación simulada del Sistema Auka en el ${museo.nombre}. Contenido demostrativo y por verificar.`,
};

export default function Page() {
  return <SalasPage />;
}
