import { UsersRound } from "lucide-react";

import { getFichasConChat } from "../services/personajes.service";
import { PersonajesCatalogo } from "../components/PersonajesCatalogo";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { getMuseo } from "@/modules/museo/services/museo.service";

export function PersonajesPage() {
  const fichas = getFichasConChat();
  const museo = getMuseo();
  const personajes = fichas.filter((ficha) => ficha.tipo === "personaje");
  const agrupaciones = fichas.filter((ficha) => ficha.tipo === "agrupacion");

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Personajes" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description={`Las voces de la instalación simulada del Sistema Auka en el ${museo.nombre}. Cada ficha tiene su propia conversación y está identificada como representación educativa o agrupación invitada.`}
          eyebrow="Voces del museo"
          title="Personajes y agrupación invitada"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<UsersRound aria-hidden="true" className="size-4" />}
          title="Representaciones, no citas"
          tono="accent"
        >
          {personajes.length} personajes y {agrupaciones.length} agrupación
          invitada. La información biográfica, la trayectoria y el repertorio
          están por verificar. No se presentan como hechos ni como testimonios.
        </InfoCallout>
      </div>

      <div data-intro-contenido className="mt-10">
        <PersonajesCatalogo fichas={fichas} />
      </div>
    </div>
  );
}
