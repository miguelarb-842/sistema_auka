import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CircleHelp,
  Lightbulb,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import { AsistenteCard } from "../components/AsistenteCard";
import { getAsistentes } from "../services/asistentes.service";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

const claves = [
  {
    icono: Bot,
    titulo: "Respuestas locales",
    descripcion:
      "Xila no consulta internet ni un modelo de lenguaje. Sus respuestas están escritas y organizadas para cada sala.",
  },
  {
    icono: CircleHelp,
    titulo: "Preguntas sugeridas",
    descripcion:
      "Podés empezar con una sugerencia o escribir tu propia pregunta. Si el tema no está en la sala, Xila lo dice.",
  },
  {
    icono: Trophy,
    titulo: "Retos con pistas",
    descripcion:
      "Cada asistente propone retos adaptados a tu perfil. Podés pedir una pista sin recibir la respuesta de inmediato.",
  },
  {
    icono: ShieldCheck,
    titulo: "Límites visibles",
    descripcion:
      "La conversación está marcada como simulación. No se guarda en un servidor ni se presenta como una fuente histórica.",
  },
] as const;

export function ChatSelectorPage() {
  const asistentes = getAsistentes();

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Chat Xila" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description="Tres versiones de Xila, una por sala. Cada una tiene su propio tono, sus preguntas sugeridas y sus retos. Elegí una para empezar la conversación."
          eyebrow="Conversación educativa"
          title="¿Con quién querés conversar?"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<Sparkles aria-hidden="true" className="size-4" />}
          title="Una simulación, no una IA"
          tono="accent"
        >
          Xila funciona con un motor local de respuestas predefinidas. No hay
          inteligencia artificial real, ni backend, ni envío de datos. Si algo
          no está en la sala, prefiere decirlo antes que inventarlo.
        </InfoCallout>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {asistentes.map((asistente) => (
          <AsistenteCard key={asistente.id} asistente={asistente} />
        ))}
      </div>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Lo que podés esperar de la conversación"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {claves.map((clave) => {
            const Icono = clave.icono;

            return (
              <div
                key={clave.titulo}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-surface-secondary">
                  <Icono aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{clave.titulo}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {clave.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Link
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-foreground/25"
          href="/configuracion"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-soft-foreground">
              <Lightbulb aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Adaptá el tono de Xila</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Cambiá tu perfil para recibir explicaciones y retos adecuados a
                tu edad. La conversación se reinicia con el nuevo tono.
              </p>
            </div>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        <Link
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-foreground/25"
          href="/salas"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-warning-soft text-warning-soft-foreground">
              <MessageCircleQuestion aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Primero recorré una sala</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Si preferís tener contexto antes de preguntar, entrá a una sala
                y volvé al chat cuando tengas una pregunta en mente.
              </p>
            </div>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
