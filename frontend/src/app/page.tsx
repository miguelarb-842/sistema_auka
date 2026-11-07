import type { Metadata } from "next";

import { HomePage } from "@/modules/home/pages/HomePage";
import {
  getMuseo,
  getSalas,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";

const museo = getMuseo();
const salas = getSalas();
const salasConAgente = getSalasConAgente();

export const metadata: Metadata = {
  title: "Inicio",
  description: `Recorré las ${salas.length} salas de la instalación simulada del Sistema Auka en el ${museo.nombre}, con ${salasConAgente.length} agentes Xila y conversaciones con personajes. Contenido demostrativo y por verificar.`,
};

export default function Page() {
  return <HomePage />;
}
