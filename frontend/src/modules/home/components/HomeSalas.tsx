import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { SalaCard } from "@/modules/salas/components/SalaCard";
import { getSalasDestacadas } from "@/modules/salas/services/salas.service";

export function HomeSalas() {
  const salas = getSalasDestacadas();

  return (
    <section className="auka-container py-16 sm:py-20">
      <SectionHeading
        action={
          <ButtonLink href="/salas" variant="outline">
            Ver todas las salas
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        }
        description="Cada sala propone un tema, unos personajes y una pregunta para llevarte a casa. Están marcadas como demostrativas: son una invitación a seguir investigando."
        eyebrow="Salas demostrativas"
        title="Tres puertas para entrar a la historia"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {salas.map((sala, index) => (
          <SalaCard
            key={sala.id}
            className="animate-auka-rise"
            priority={index === 0}
            sala={sala}
          />
        ))}
      </div>
    </section>
  );
}
