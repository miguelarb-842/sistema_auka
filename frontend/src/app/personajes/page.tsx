import type { Metadata } from "next";

import { PersonajesPage } from "@/modules/personajes/pages/PersonajesPage";

export const metadata: Metadata = {
  title: "Personajes y pueblos",
  description:
    "Fichas sobre Nicarao, Diriangén, los pueblos chorotegas y mangues, y Santo Domingo de Guzmán, con biografías adaptadas y advertencias de representación.",
};

export default function Page() {
  return <PersonajesPage />;
}
