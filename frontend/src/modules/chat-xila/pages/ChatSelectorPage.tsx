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

import { ChatOpcionCard } from "../components/ChatOpcionCard";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import {
  getFichasConChat,
  getGuiaGeneral,
  getMuseo,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";
import { AgrupacionCard } from "@/modules/personajes/components/AgrupacionCard";
import { PersonajeCard } from "@/modules/personajes/components/PersonajeCard";

const claves = [
  {
    icono: CircleHelp,
    titulo: "Preguntas sugeridas",
    descripcion:
      "Podés elegir una sugerencia o escribir tu propia pregunta. Si el tema no está disponible, se indica como por verificar.",
  },
  {
    icono: Trophy,
    titulo: "Retos con pistas",
    descripcion:
      "Cada conversación propone retos adaptados a tu perfil. Podés pedir una pista sin recibir la respuesta de inmediato.",
  },
  {
    icono: ShieldCheck,
    titulo: "Contenido identificado",
    descripcion:
      "Las voces están identificadas como representación educativa o agrupación invitada. No se presentan como citas reales.",
  },
  {
    icono: Lightbulb,
    titulo: "Límites claros",
    descripcion:
      "No se inventan biografías, fechas, obras, repertorios, integrantes, horarios ni precios. La información está por verificar.",
  },
] as const;

export function ChatSelectorPage() {
  const guia = getGuiaGeneral();
  const salasConAgente = getSalasConAgente();
  const fichas = getFichasConChat();
  const museo = getMuseo();

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Conversaciones" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description={`La guía general, los agentes de sala y las voces con conversación propia de la instalación simulada del Sistema Auka en el ${museo.nombre}. Elegí una conversación para empezar.`}
          eyebrow="Conversación educativa"
          title="¿Con quién querés conversar?"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<Sparkles aria-hidden="true" className="size-4" />}
          title="Una simulación identificada"
          tono="accent"
        >
          Esta app simula la instalación del Sistema Auka en el {museo.nombre}.
          Todo el contenido está marcado como demostrativo y por verificar. Las
          respuestas se apoyan en el conocimiento local de cada conversación y
          en el agente configurado.
        </InfoCallout>
      </div>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Guía general"
          title="Empezá por el panorama completo"
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ChatOpcionCard
            config={guia}
            contexto="Orientación por todas las salas del museo"
            href="/chat/guia-general"
          />
          <InfoCallout
            className="self-start"
            icon={<Bot aria-hidden="true" className="size-4" />}
            title="Qué puede hacer la guía"
            tono="info"
          >
            Orientarte por las salas, explicar dónde está el Agente Xila y
            derivarte a los personajes y a la agrupación invitada. La guía no
            encarna a ningún personaje y no inventa datos sobre el museo.
          </InfoCallout>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description={`${salasConAgente.length} salas tienen un Agente Xila con conversación propia. En las demás salas no se muestra indicador de robot.`}
          eyebrow="Agentes de sala"
          title="Agente Xila · una voz por sala"
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {salasConAgente.map((sala) =>
            sala.agenteXilaUbicado ? (
              <ChatOpcionCard
                key={sala.id}
                config={sala.agenteXilaUbicado}
                contexto={`Sala: ${sala.nombre}`}
                href={`/chat/sala/${sala.id}`}
              />
            ) : null,
          )}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="Personajes y agrupación invitada con conversación propia. Cada ficha indica su etiqueta de representación y el estado de su contenido."
          eyebrow="Voces del museo"
          title="Personajes y agrupación invitada"
        />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {fichas.map((ficha) =>
            ficha.tipo === "agrupacion" ? (
              <AgrupacionCard key={ficha.id} agrupacion={ficha} />
            ) : (
              <PersonajeCard key={ficha.id} personaje={ficha} />
            ),
          )}
        </div>
      </section>

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
              <p className="text-sm font-semibold">Adaptá el tono</p>
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
