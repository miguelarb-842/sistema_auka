import { Landmark } from "lucide-react";

import { getSalas } from "../services/salas.service";
import { SalasCatalogo } from "../components/SalasCatalogo";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

export function SalasPage() {
  const salas = getSalas();

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Salas" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description="Un recorrido introductorio por tres temas de la historia y la cultura de Nicaragua. Entrá a cada sala para encontrar contexto, personajes, retos y un asistente Xila."
          eyebrow="Museo digital"
          title="Salas para mirar de cerca"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<Landmark aria-hidden="true" className="size-4" />}
          title="Tres salas, tres preguntas"
          tono="accent"
        >
          Fiestas Patronales de Managua, los caciques de Nicaragua y Diriangén
          con la resistencia indígena. Todas son demostrativas y están pensadas
          para edades distintas.
        </InfoCallout>
      </div>

      <div className="mt-10">
        <SalasCatalogo salas={salas} />
      </div>
    </div>
  );
}
