import { UsersRound } from "lucide-react";

import { getPersonajes } from "../services/personajes.service";
import { PersonajesCatalogo } from "../components/PersonajesCatalogo";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

export function PersonajesPage() {
  const personajes = getPersonajes();

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Personajes" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description="Fichas para acercarse a figuras históricas, pueblos originarios y personajes culturales. Cada entrada separa el contexto documentado de la interpretación y advierte cuando una imagen es una representación artística."
          eyebrow="Quiénes hacen la historia"
          title="Personajes y pueblos de Nicaragua"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<UsersRound aria-hidden="true" className="size-4" />}
          title="Una ficha, varias capas"
          tono="accent"
        >
          Vas a encontrar biografía adaptada a tu perfil, acontecimientos
          marcados, valores para conversar y, en algunos casos, una
          dramatización educativa claramente identificada.
        </InfoCallout>
      </div>

      <div className="mt-10">
        <PersonajesCatalogo personajes={personajes} />
      </div>
    </div>
  );
}
