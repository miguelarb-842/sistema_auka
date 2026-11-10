import { Landmark } from "lucide-react";

import { getSalas } from "../services/salas.service";
import { SalasCatalogo } from "../components/SalasCatalogo";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { getMuseo } from "@/modules/museo/services/museo.service";

export function SalasPage() {
  const salas = getSalas();
  const museo = getMuseo();

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Salas" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description={`Recorré las ${salas.length} salas de la instalación simulada del Sistema Auka en el ${museo.nombre}. Cada ficha indica qué está por verificar y en cuáles salas encontrás un Agente Xila.`}
          eyebrow="Instalación simulada"
          title="Un museo para recorrer sala por sala"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<Landmark aria-hidden="true" className="size-4" />}
          title="Contenido por verificar"
          tono="accent"
        >
          La información de cada sala será entregada por el equipo del museo. En
          esta simulación no se inventan biografías, fechas, obras, repertorios,
          horarios ni precios.
        </InfoCallout>
      </div>

      <div data-intro-contenido className="mt-10">
        <SalasCatalogo salas={salas} />
      </div>
    </div>
  );
}
