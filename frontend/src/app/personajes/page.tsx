import type { Metadata } from "next";

import { PersonajesPage } from "@/modules/personajes/pages/PersonajesPage";
import {
  getFichasConChat,
  getMuseo,
} from "@/modules/museo/services/museo.service";

const museo = getMuseo();
const fichas = getFichasConChat();

export const metadata: Metadata = {
  title: "Personajes y agrupación invitada",
  description: `Conocé las ${fichas.length} voces con conversación propia de la instalación simulada del Sistema Auka en el ${museo.nombre}. Representaciones educativas y contenido por verificar.`,
};

export default function Page() {
  return <PersonajesPage />;
}
