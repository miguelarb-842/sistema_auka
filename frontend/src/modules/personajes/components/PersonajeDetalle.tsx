import type { Personaje } from "../types/personaje.types";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CircleHelp,
  MapPin,
  MessageCircleQuestion,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Chip } from "@heroui/react";

import { getPersonajes } from "../services/personajes.service";
import { iconosValores } from "../utils/iconos";

import { BiografiaPersonaje } from "./BiografiaPersonaje";
import { PersonajeCard } from "./PersonajeCard";
import { PersonificacionPersonaje } from "./PersonificacionPersonaje";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { getAsistentePorSala } from "@/modules/chat-xila/services/asistentes.service";
import { getSalaById } from "@/modules/salas/services/salas.service";

const tipos = {
  historico: {
    etiqueta: "Figura histórica",
    color: "accent" as const,
    descripcion:
      "Persona mencionada en fuentes históricas. La información disponible es parcial y mediada por quienes la registraron.",
  },
  colectivo: {
    etiqueta: "Pueblo originario",
    color: "success" as const,
    descripcion:
      "Entrada colectiva. No representa a una sola persona ni pretende homogenizar a comunidades diversas.",
  },
  cultural: {
    etiqueta: "Figura cultural",
    color: "warning" as const,
    descripcion:
      "Figura vinculada a una tradición religiosa o cultural. Su historia local requiere fuentes específicas.",
  },
} satisfies Record<
  Personaje["tipo"],
  {
    etiqueta: string;
    color: "accent" | "success" | "warning";
    descripcion: string;
  }
>;

export function PersonajeDetalle({ personaje }: { personaje: Personaje }) {
  const tipo = tipos[personaje.tipo];
  const sala = getSalaById(personaje.salaId);
  const asistente = sala ? getAsistentePorSala(sala.id) : undefined;
  const otros = getPersonajes()
    .filter((item) => item.id !== personaje.id)
    .slice(0, 3);

  return (
    <article>
      <div className="auka-container pt-6">
        <Breadcrumbs
          items={[
            { href: "/personajes", label: "Personajes" },
            { label: personaje.nombre },
          ]}
        />
      </div>

      <header className="auka-container py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="auka-image-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-black/5">
              <Image
                fill
                priority
                alt={personaje.ilustracionAlt}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 380px"
                src={personaje.ilustracion}
              />
              <span
                aria-hidden="true"
                className="auka-gradient-overlay absolute inset-0 opacity-55"
              />
              <span className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.1em] text-white/85 backdrop-blur">
                Representación artística conceptual
              </span>
            </div>
          </div>

          <div className="self-center">
            <div className="flex flex-wrap items-center gap-2">
              <Chip color={tipo.color} size="sm" variant="soft">
                {tipo.etiqueta}
              </Chip>
              <Chip size="sm" variant="soft">
                Ficha demostrativa
              </Chip>
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {personaje.nombre}
            </h1>
            {personaje.alias ? (
              <p className="mt-2 text-sm font-medium italic text-muted">
                {personaje.alias}
              </p>
            ) : null}

            <TextoAdaptado
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
              contenido={personaje.descripcion}
            />

            <dl className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface px-4 py-3">
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  Época
                </dt>
                <dd className="mt-1.5 leading-snug">{personaje.epoca}</dd>
              </div>
              <div className="rounded-xl border border-border bg-surface px-4 py-3">
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  Lugar
                </dt>
                <dd className="mt-1.5 leading-snug">{personaje.lugar}</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {sala ? (
                <ButtonLink href={`/salas/${sala.id}`} size="lg">
                  <BookOpen aria-hidden="true" className="size-4" />
                  Ir a la sala
                </ButtonLink>
              ) : null}
              {sala ? (
                <ButtonLink
                  href={`/chat/${sala.id}`}
                  size="lg"
                  variant="outline"
                >
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-4"
                  />
                  Preguntarle a Xila
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="border-y border-separator bg-surface/40">
        <div className="auka-container py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="space-y-12">
              <section>
                <p className="auka-eyebrow">Biografía adaptada</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Quién fue, contado para tu perfil
                </h2>
                <div className="mt-5">
                  <BiografiaPersonaje personaje={personaje} />
                </div>
              </section>

              <section>
                <p className="auka-eyebrow">Contexto</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  El mundo alrededor de esta historia
                </h2>
                <TextoAdaptado
                  className="mt-4 text-pretty text-base leading-relaxed text-muted"
                  contenido={personaje.contexto}
                />
              </section>

              <section>
                <p className="auka-eyebrow">Línea de acontecimientos</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Lo que las fuentes permiten sostener
                </h2>
                <ol className="mt-6 space-y-5 border-l border-border pl-6">
                  {personaje.acontecimientos.map((acontecimiento) => (
                    <li
                      key={`${personaje.id}-${acontecimiento.id}`}
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.92rem] top-1 size-3 rounded-full border-2 border-background bg-accent"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold">
                          {acontecimiento.titulo}
                        </h3>
                        <ContentBadge estado={acontecimiento.estado} />
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {acontecimiento.descripcion}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <p className="auka-eyebrow">Personificación</p>
                <h2 className="mt-2 mb-5 text-2xl font-semibold tracking-tight">
                  Una voz imaginada, nunca una cita
                </h2>
                <PersonificacionPersonaje personaje={personaje} />
              </section>

              <section>
                <p className="auka-eyebrow">Para conversar</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Preguntas que deja esta ficha
                </h2>
                <ul className="mt-5 grid gap-3">
                  {personaje.preguntasReflexion.map((pregunta) => (
                    <li
                      key={pregunta}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed"
                    >
                      <CircleHelp
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-accent"
                      />
                      {pregunta}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border bg-background p-5">
                <p className="auka-eyebrow">Cómo leer esta ficha</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {tipo.descripcion}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-separator pt-4">
                  <ContentBadge estado="documentado" />
                  <ContentBadge estado="interpretacion" />
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-5">
                <p className="auka-eyebrow">Valores para pensar</p>
                <ul className="mt-4 space-y-4">
                  {personaje.valores.map((valor) => {
                    const Icono = iconosValores[valor.icono];

                    return (
                      <li key={valor.titulo} className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-secondary">
                          <Icono aria-hidden="true" className="size-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">
                            {valor.titulo}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted">
                            {valor.descripcion}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <InfoCallout
                icon={<ShieldAlert aria-hidden="true" className="size-4" />}
                title="Sobre la representación"
                tono="warning"
              >
                {personaje.notaRepresentacion}
              </InfoCallout>

              <InfoCallout
                icon={<BookOpen aria-hidden="true" className="size-4" />}
                title="Sobre las fuentes"
              >
                {personaje.notaFuentes}
              </InfoCallout>

              {sala ? (
                <Link
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-border bg-background p-5 transition-colors hover:border-foreground/25"
                  href={`/salas/${sala.id}`}
                >
                  <div>
                    <p className="auka-eyebrow">Sala relacionada</p>
                    <p className="mt-1 text-sm font-semibold">{sala.nombre}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {sala.resumen}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </Link>
              ) : null}

              {asistente ? (
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="auka-eyebrow">Asistente</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                    <Sparkles
                      aria-hidden="true"
                      className="size-4 text-warning"
                    />
                    {asistente.nombre}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Respuestas locales preparadas para esta sala. No es una IA
                    real.
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      <section className="auka-container py-14 sm:py-16">
        <SectionHeading
          action={
            <ButtonLink href="/personajes" variant="outline">
              Ver todas las fichas
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          }
          eyebrow="Seguir explorando"
          title="Otras historias para conocer"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otros.map((item) => (
            <PersonajeCard key={item.id} compacta personaje={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
