import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { getMuseo } from "@/modules/museo/services/museo.service";
import { SalaCard } from "@/modules/salas/components/SalaCard";
import { getSalasDestacadas } from "@/modules/salas/services/salas.service";

export function HomeSalas() {
  const salas = getSalasDestacadas();
  const museo = getMuseo();

  return (
    <section className="auka-container py-16 sm:py-20">
      <SectionHeading
        action={
          <ButtonLink href="/salas" variant="outline">
            Ver todas las salas
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        }
        description={`Una selección de ${salas.length} salas de la instalación simulada del Sistema Auka en el ${museo.nombre}. Cada ficha indica qué está por verificar y en cuáles salas encontrás un Agente Xila.`}
        eyebrow="Salas del museo"
        title="Un recorrido para empezar"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {salas.map((sala, index) => (
          <MotionReveal
            key={sala.id}
            interactive
            className="h-full"
            index={index}
          >
            <SalaCard sala={sala} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
