import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  MessageCircleQuestion,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

const pasos = [
  {
    icono: Sparkles,
    titulo: "Elegí cómo mirar",
    descripcion:
      "El perfil de niño, adolescente o adulto cambia el tono de Xila, la profundidad de los textos y los retos.",
  },
  {
    icono: ScanSearch,
    titulo: "Recorré una sala",
    descripcion:
      "Cada sala separa lo documentado, lo interpretativo y lo demostrativo. No hay citas inventadas ni fechas decorativas.",
  },
  {
    icono: MessageCircleQuestion,
    titulo: "Conversá y preguntá",
    descripcion:
      "Xila responde con un motor local de respuestas preparadas. Si no sabe algo, lo dice. La conversación no se envía a ningún servidor.",
  },
] as const;

export function HomeExperiencia() {
  return (
    <section className="border-y border-separator bg-surface/40">
      <div className="auka-container py-16 sm:py-20">
        <SectionHeading
          description="Sistema Auka no es un curso ni una enciclopedia. Es una experiencia breve para practicar la curiosidad histórica y aprender a distinguir lo que sabemos de lo que interpretamos."
          eyebrow="Cómo funciona"
          title="Una visita guiada por tus propias preguntas"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pasos.map((paso, index) => {
            const Icono = paso.icono;

            return (
              <div
                key={paso.titulo}
                className="relative rounded-3xl border border-border bg-background p-6"
              >
                <span className="absolute right-5 top-5 font-mono text-xs font-semibold text-muted">
                  0{index + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
                  <Icono aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {paso.descripcion}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <InfoCallout
            icon={<Boxes aria-hidden="true" className="size-4" />}
            title="Arquitectura de la demostración"
            tono="accent"
          >
            Next.js con App Router, React, TypeScript, HeroUI y Tailwind CSS 4.
            No hay backend, base de datos, autenticación ni servicios externos:
            las preferencias viven en tu navegador y el chat funciona con
            respuestas predefinidas.
          </InfoCallout>

          <Link
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-foreground/25"
            href="/acerca"
          >
            <div>
              <p className="text-sm font-semibold">Conocé el proyecto</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Misión, alcance, límites y criterios de contenido.
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
