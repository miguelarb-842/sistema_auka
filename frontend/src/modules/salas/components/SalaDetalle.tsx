import type { Sala } from "../types/sala.types";

import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CircleHelp,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import { Chip } from "@heroui/react";

import { iconosElementos } from "../utils/iconos";

import { RetoCard } from "./RetoCard";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { PersonajeCard } from "@/modules/personajes/components/PersonajeCard";
import { getPersonajesPorSala } from "@/modules/personajes/services/personajes.service";
import { getAsistentePorSala } from "@/modules/chat-xila/services/asistentes.service";

const tonos = {
  accent: "accent" as const,
  warning: "warning" as const,
  success: "success" as const,
  danger: "danger" as const,
};

export function SalaDetalle({ sala }: { sala: Sala }) {
  const personajes = getPersonajesPorSala(sala.id);
  const asistente = getAsistentePorSala(sala.id);
  const color = tonos[sala.tono];

  return (
    <article>
      <div className="auka-container pt-6">
        <Breadcrumbs
          items={[{ href: "/salas", label: "Salas" }, { label: sala.nombre }]}
        />
      </div>

      <header className="auka-container py-8 sm:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip color={color} size="sm" variant="soft">
                {sala.tema}
              </Chip>
              <Chip size="sm" variant="soft">
                Sala demostrativa
              </Chip>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {sala.nombre}
            </h1>
            <p className="mt-3 text-lg font-medium italic text-muted">
              «{sala.lema}»
            </p>
            <TextoAdaptado
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
              contenido={sala.descripcion}
            />

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock aria-hidden="true" className="size-4" />
                {sala.duracion}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen aria-hidden="true" className="size-4" />
                {sala.bloques.length} bloques de contenido
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles aria-hidden="true" className="size-4" />
                {sala.retos.length} retos
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/chat/${sala.id}`} size="lg">
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Conversar con {asistente?.nombre ?? "Xila"}
              </ButtonLink>
              <ButtonLink href="/personajes" size="lg" variant="outline">
                Ver personajes
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.5rem] border border-border/70 bg-surface/30"
            />
            <div className="auka-image-frame relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-black/5">
              <Image
                fill
                priority
                alt={sala.portadaAlt}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
                src={sala.portada}
              />
              <span
                aria-hidden="true"
                className="auka-gradient-overlay absolute inset-0 opacity-50"
              />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/85 backdrop-blur">
                Ilustración conceptual
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-separator bg-surface/40">
        <div className="auka-container grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <p className="auka-eyebrow">La sala en pocas palabras</p>
            <TextoAdaptado
              as="p"
              className="mt-4 text-pretty text-xl leading-relaxed tracking-[-0.01em] sm:text-2xl"
              contenido={sala.introduccion}
            />

            <div className="mt-7">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CircleHelp aria-hidden="true" className="size-4 text-accent" />
                Preguntas que abre esta sala
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {sala.preguntasClave.map((pregunta) => (
                  <li
                    key={pregunta}
                    className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm leading-snug text-muted"
                  >
                    {pregunta}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InfoCallout
            className="self-start"
            icon={<BookOpen aria-hidden="true" className="size-4" />}
            title="Aviso de contenido"
            tono="warning"
          >
            {sala.avisoContenido}
          </InfoCallout>
        </div>
      </section>

      <section className="auka-container py-14 sm:py-16">
        <SectionHeading
          description="Cada bloque indica si su contenido está documentado, si es una interpretación o si forma parte de la demostración. Las fuentes específicas deberán completarse en la versión final."
          eyebrow="Recorrido"
          title="Tres paradas dentro de la sala"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {sala.bloques.map((bloque, index) => (
            <article
              key={bloque.id}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-semibold text-muted">
                  0{index + 1}
                </span>
                <ContentBadge estado={bloque.estado} />
              </div>
              <h3 className="mt-5 text-balance text-xl font-semibold tracking-tight">
                {bloque.titulo}
              </h3>
              <TextoAdaptado
                className="mt-3 flex-1 text-sm leading-relaxed text-muted"
                contenido={bloque.contenido}
              />
              {bloque.fuente ? (
                <p className="mt-4 border-t border-separator pt-4 text-xs leading-relaxed text-muted">
                  {bloque.fuente}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-separator bg-surface/40">
        <div className="auka-container py-14 sm:py-16">
          <SectionHeading
            description="Objetos, lugares y prácticas que ayudan a entrar en el tema. Son puntos de partida para conversar, no piezas de una colección real."
            eyebrow="Detalles para mirar"
            title="Lo que compone esta sala"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {sala.elementos.map((elemento) => {
              const Icono = iconosElementos[elemento.icono];

              return (
                <div
                  key={elemento.id}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-secondary text-foreground">
                    <Icono aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">
                      {elemento.titulo}
                    </h3>
                    <TextoAdaptado
                      className="mt-1 text-sm leading-relaxed text-muted"
                      contenido={elemento.descripcion}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {personajes.length > 0 ? (
        <section className="auka-container py-14 sm:py-16">
          <SectionHeading
            action={
              <ButtonLink href="/personajes" variant="outline">
                Ver todos los personajes
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            }
            description="Las fichas distinguen entre figura histórica, pueblo originario y figura cultural. Las ilustraciones son representaciones artísticas, no retratos verificados."
            eyebrow="Quiénes aparecen"
            title="Personajes y pueblos de esta sala"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personajes.map((personaje) => (
              <PersonajeCard
                key={personaje.id}
                compacta
                personaje={personaje}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-y border-separator bg-surface/40">
        <div className="auka-container py-14 sm:py-16">
          <SectionHeading
            description="Los retos cambian según el perfil elegido. Podés ver una pista o el cierre, pero la idea es intentarlo primero."
            eyebrow="Para pensar"
            title="Retos de la sala"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sala.retos.map((reto, index) => (
              <RetoCard key={reto.id} indice={index} reto={reto} />
            ))}
          </div>
        </div>
      </section>

      {asistente ? (
        <section className="auka-container py-14 sm:py-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-1/2 auka-glow opacity-70"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
              <div className="relative size-24 overflow-hidden rounded-3xl border border-border bg-background">
                <Image
                  fill
                  alt={asistente.avatarAlt}
                  className="object-cover"
                  sizes="96px"
                  src={asistente.avatar}
                />
              </div>
              <div>
                <p className="auka-eyebrow">Asistente de la sala</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {asistente.nombre}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {asistente.biografia}
                </p>
                <p className="mt-3 text-xs font-medium text-muted">
                  Simulación local con respuestas preparadas. No es una IA real.
                </p>
              </div>
              <ButtonLink href={`/chat/${sala.id}`} size="lg">
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Iniciar chat
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
