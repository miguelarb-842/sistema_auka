import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  MessageCircleQuestion,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import {
  getFichasConChat,
  getMuseo,
  getSalas,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";

export function HomeExperiencia() {
  const museo = getMuseo();
  const salas = getSalas();
  const salasConAgente = getSalasConAgente();
  const fichas = getFichasConChat();

  const pasos = [
    {
      icono: Sparkles,
      titulo: "Elegí cómo mirar",
      descripcion:
        "El perfil de niño, adolescente o adulto cambia el tono de la guía, la profundidad de los textos y el tipo de retos.",
    },
    {
      icono: ScanSearch,
      titulo: "Recorré las salas",
      descripcion: `Las ${salas.length} salas están marcadas como demostrativas y por verificar. No vas a encontrar biografías, fechas, obras ni repertorios inventados.`,
    },
    {
      icono: MessageCircleQuestion,
      titulo: "Conversá y preguntá",
      descripcion: `La guía general, ${salasConAgente.length} agentes Xila y ${fichas.length} voces con chat responden a partir del conocimiento local de cada conversación. Si un dato no está disponible, lo indican en lugar de inventarlo.`,
    },
  ] as const;

  return (
    <section className="border-y border-separator bg-surface/40">
      <div className="auka-container py-16 sm:py-20">
        <SectionHeading
          description={`Sistema Auka no es un curso ni una enciclopedia. Es una experiencia breve para practicar la curiosidad y aprender a distinguir lo que sabemos de lo que todavía falta verificar en el ${museo.nombre}.`}
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
            icon={<CircleHelp aria-hidden="true" className="size-4" />}
            title="Una visita sin datos inventados"
            tono="warning"
          >
            Las {salas.length} salas y las {fichas.length} voces con chat de
            esta instalación están marcadas como demostrativas y por verificar.
            La información definitiva será entregada por el equipo del museo.
          </InfoCallout>

          <Link
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-foreground/25"
            href="/acerca"
          >
            <div>
              <p className="text-sm font-semibold">Conocé Sistema Auka</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Qué es el producto, qué representa esta instalación y cómo se
                marca el contenido.
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
