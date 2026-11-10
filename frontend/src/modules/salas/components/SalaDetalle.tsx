import type { Sala } from "../types/sala.types";

import {
  ArrowRight,
  Landmark,
  MessageCircleQuestion,
  UsersRound,
} from "lucide-react";
import { Chip } from "@heroui/react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { getMuseo } from "@/modules/museo/services/museo.service";
import { AgrupacionCard } from "@/modules/personajes/components/AgrupacionCard";
import { PersonajeCard } from "@/modules/personajes/components/PersonajeCard";
import {
  getAgrupacionesPorSala,
  getPersonajesPorSala,
} from "@/modules/personajes/services/personajes.service";

export function SalaDetalle({ sala }: { sala: Sala }) {
  const museo = getMuseo();
  const personajes = getPersonajesPorSala(sala.id);
  const agrupaciones = getAgrupacionesPorSala(sala.id);
  const agente = sala.agenteXilaUbicado;
  const totalVinculos = personajes.length + agrupaciones.length;

  return (
    <article>
      <div className="auka-container pt-6">
        <Breadcrumbs
          items={[{ href: "/salas", label: "Salas" }, { label: sala.nombre }]}
        />
      </div>

      <header className="auka-container py-8 sm:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <VerificacionBadge />
              <ContentBadge estado={sala.estado} />
              {agente ? (
                <Chip color="accent" size="sm" variant="soft">
                  Agente Xila · {sala.nombre}
                </Chip>
              ) : null}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {sala.nombre}
            </h1>

            <TextoAdaptado
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
              contenido={sala.descripcion}
            />

            <p className="mt-4 text-sm font-medium text-muted">
              {museo.nombre} · Instalación del Sistema Auka representada en esta
              simulación
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {agente ? (
                <ButtonLink href={`/chat/sala/${sala.id}`} size="lg">
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-4"
                  />
                  Conversar con el Agente Xila
                </ButtonLink>
              ) : null}
              <ButtonLink
                href="/chat/guia-general"
                size="lg"
                variant={agente ? "outline" : "primary"}
              >
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Hablar con la guía general
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.5rem] border border-border/70 bg-surface/30"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-foreground/[0.03] shadow-xl shadow-black/5">
              <span className="auka-pattern absolute inset-0 opacity-40" />
              <span className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-warning/10" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-24 place-items-center rounded-3xl border border-border bg-surface/80 text-foreground shadow-sm backdrop-blur">
                  <Landmark className="size-10" />
                </span>
              </span>
              <span className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur">
                  Sala de la instalación
                </span>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur">
                  Sin imagen verificada
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <section
        data-intro-contenido
        className="border-y border-separator bg-surface/40"
      >
        <div className="auka-container grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <p className="auka-eyebrow">Estado de la información</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Qué se puede afirmar sobre esta sala
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
              Esta simulación solo presenta el nombre y la existencia de la sala
              dentro de la instalación. La descripción de su exhibición, sus
              objetos, sus obras, sus fechas y sus actividades está por
              verificar y será entregada por el equipo del museo.
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
              Las relaciones con personajes y agrupaciones son provisionales.
              Cuando no hay vínculos asignados, la ficha lo indica en lugar de
              inventarlos.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <UsersRound aria-hidden="true" className="size-4" />
                {totalVinculos === 0
                  ? "Sin vínculos asignados"
                  : `${totalVinculos} ${totalVinculos === 1 ? "vínculo provisional" : "vínculos provisionales"}`}
              </span>
              {agente ? (
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-4"
                  />
                  Conversación de sala disponible
                </span>
              ) : null}
            </div>
          </div>

          <InfoCallout
            className="self-start"
            icon={<Landmark aria-hidden="true" className="size-4" />}
            title="Contenido por verificar"
            tono="warning"
          >
            No se presentan biografías, fechas, obras, repertorios, integrantes,
            horarios ni precios. Toda la información de esta sala está marcada
            como demostrativa y pendiente de verificación.
          </InfoCallout>
        </div>
      </section>

      {agente ? (
        <section className="auka-container py-14 sm:py-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-1/2 auka-glow opacity-70"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip color="accent" size="sm" variant="soft">
                    Agente Xila
                  </Chip>
                  <VerificacionBadge />
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {agente.nombreVisible}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {agente.etiquetaVisible}
                </p>
                <TextoAdaptado
                  className="mt-4 max-w-2xl text-sm leading-relaxed text-muted"
                  contenido={agente.bienvenida}
                />
              </div>
              <ButtonLink href={`/chat/sala/${sala.id}`} size="lg">
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Iniciar conversación
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      {totalVinculos > 0 ? (
        <section className="auka-container py-14 sm:py-16">
          <SectionHeading
            action={
              <ButtonLink href="/personajes" variant="outline">
                Ver todas las voces
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            }
            description="Las relaciones son provisionales y están marcadas como por verificar. Cada voz tiene su propia conversación."
            eyebrow="Voces relacionadas"
            title="Personajes y agrupaciones de esta sala"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personajes.map((personaje) => (
              <PersonajeCard
                key={personaje.id}
                compacta
                personaje={personaje}
              />
            ))}
            {agrupaciones.map((agrupacion) => (
              <AgrupacionCard
                key={agrupacion.id}
                compacta
                agrupacion={agrupacion}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="auka-container py-14 sm:py-16">
          <SectionHeading
            description="La relación provisional de esta simulación no asigna personajes ni agrupaciones a esta sala. Esa vinculación está por verificar."
            eyebrow="Voces relacionadas"
            title="Sin voces asignadas por ahora"
          />
        </section>
      )}

      <section className="border-t border-separator bg-surface/40">
        <div className="auka-container py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="auka-eyebrow">Guía general</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                ¿Querés orientarte por todo el museo?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                La guía general puede contarte qué salas existen, dónde está el
                Agente Xila y con qué personajes o agrupaciones podés conversar.
                No inventa información sobre esta sala.
              </p>
            </div>
            <ButtonLink href="/chat/guia-general" size="lg" variant="outline">
              <MessageCircleQuestion aria-hidden="true" className="size-4" />
              Abrir la guía general
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
