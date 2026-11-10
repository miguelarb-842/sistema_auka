import type { AgrupacionInvitada } from "../types/personaje.types";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircleQuestion,
  ShieldAlert,
  UsersRound,
} from "lucide-react";
import { Chip } from "@heroui/react";

import { getAgrupacionesInvitadas } from "../services/personajes.service";

import { AgrupacionCard } from "./AgrupacionCard";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { getSalaById } from "@/modules/salas/services/salas.service";

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function AgrupacionDetalle({
  agrupacion,
}: {
  agrupacion: AgrupacionInvitada;
}) {
  const sala = getSalaById(agrupacion.salaRelacionada);
  const otras = getAgrupacionesInvitadas()
    .filter((item) => item.id !== agrupacion.id)
    .slice(0, 3);

  return (
    <article>
      <div className="auka-container pt-6">
        <Breadcrumbs
          items={[
            { href: "/personajes", label: "Personajes" },
            { label: agrupacion.nombre },
          ]}
        />
      </div>

      <header className="auka-container py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-[#0b0b0e] shadow-xl shadow-black/10">
              <span
                aria-hidden="true"
                className="auka-pattern-light absolute inset-0 opacity-70"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-warning/25 via-transparent to-accent/15"
              />
              {agrupacion.retrato ? (
                <>
                  <Image
                    fill
                    preload
                    alt={agrupacion.retrato.alt}
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 24rem"
                    src={agrupacion.retrato.src}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
                  />
                </>
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-32 place-items-center rounded-full border border-white/15 bg-white/5 text-4xl font-semibold tracking-tight text-white/80 shadow-sm backdrop-blur">
                    {iniciales(agrupacion.nombre)}
                  </span>
                </span>
              )}
              <span className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/55 px-3 py-2 text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.1em] text-white/80 backdrop-blur">
                <UsersRound aria-hidden="true" className="size-3.5" />
                {agrupacion.retrato
                  ? "Imagen de referencia"
                  : "Sin imagen verificada"}
              </span>
            </div>
          </div>

          <div className="self-center">
            <div className="flex flex-wrap items-center gap-2">
              <Chip color="warning" size="sm" variant="soft">
                {agrupacion.etiquetaVisible}
              </Chip>
              <VerificacionBadge />
              <ContentBadge estado={agrupacion.estado} />
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {agrupacion.nombre}
            </h1>

            <TextoAdaptado
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
              contenido={agrupacion.descripcion}
            />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/chat/agrupacion/${agrupacion.id}`} size="lg">
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Conversar con la agrupación
              </ButtonLink>
              {sala ? (
                <ButtonLink
                  href={`/salas/${sala.id}`}
                  size="lg"
                  variant="outline"
                >
                  <BookOpen aria-hidden="true" className="size-4" />
                  Ir a {sala.nombre}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div
        data-intro-contenido
        className="border-y border-separator bg-surface/40"
      >
        <div className="auka-container py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="space-y-10">
              <section>
                <p className="auka-eyebrow">Alcance de la ficha</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Una agrupación invitada a la demostración
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
                  {agrupacion.nombre} figura como agrupación invitada en esta
                  simulación del museo. La conversación asociada es una
                  representación educativa y no una cita real de la agrupación.
                </p>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
                  La historia de la agrupación, sus integrantes, su repertorio,
                  sus fechas de presentación y cualquier otro dato están por
                  verificar. El equipo del museo entregará la información
                  definitiva.
                </p>
              </section>

              <section>
                <p className="auka-eyebrow">Sala relacionada</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Dónde se presenta la agrupación
                </h2>
                {sala ? (
                  <Link
                    className="group mt-5 flex items-start justify-between gap-4 rounded-3xl border border-border bg-background p-5 transition-colors hover:border-foreground/25"
                    href={`/salas/${sala.id}`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{sala.nombre}</p>
                        <VerificacionBadge />
                      </div>
                      <TextoAdaptado
                        className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted"
                        contenido={sala.descripcion}
                      />
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </Link>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    La relación provisional no asigna una sala a esta
                    agrupación.
                  </p>
                )}
              </section>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <InfoCallout
                icon={<ShieldAlert aria-hidden="true" className="size-4" />}
                title="Sobre la representación"
                tono="warning"
              >
                {agrupacion.etiquetaVisible}. La conversación no es una cita
                real de la agrupación. Su contenido está marcado como
                demostrativo y por verificar.
              </InfoCallout>

              <div className="rounded-3xl border border-border bg-background p-5">
                <p className="auka-eyebrow">Conversación disponible</p>
                <p className="mt-2 text-sm font-semibold">
                  {agrupacion.chat.nombreVisible}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {agrupacion.chat.etiquetaVisible}
                </p>
                <ButtonLink
                  className="mt-4 w-full"
                  href={`/chat/agrupacion/${agrupacion.id}`}
                  variant="outline"
                >
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-4"
                  />
                  Abrir conversación
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {otras.length > 0 ? (
        <section className="auka-container py-14 sm:py-16">
          <SectionHeading
            action={
              <ButtonLink href="/personajes" variant="outline">
                Ver todas las fichas
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            }
            eyebrow="Seguir explorando"
            title="Otras agrupaciones invitadas"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otras.map((item) => (
              <AgrupacionCard key={item.id} compacta agrupacion={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
