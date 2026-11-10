import type { AgrupacionInvitada } from "../types/personaje.types";

import Link from "next/link";
import { ArrowRight, MessageCircleQuestion, UsersRound } from "lucide-react";
import { Chip } from "@heroui/react";

import {
  HoloCard,
  HoloCardFrame,
  HoloCardImage,
  HoloCardInset,
  HoloCardRotator,
  HoloCardShine,
  HoloCardSurface,
} from "@/components/ui/molecules/HoloCard";
import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { cn } from "@/lib/utils";
import { getSalaById } from "@/modules/salas/services/salas.service";

interface AgrupacionCardProps {
  agrupacion: AgrupacionInvitada;
  className?: string;
  compacta?: boolean;
}

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function AgrupacionCard({
  agrupacion,
  className,
  compacta = false,
}: AgrupacionCardProps) {
  const sala = getSalaById(agrupacion.salaRelacionada);

  return (
    <HoloCard
      activateOnHover
      className={cn("group h-full", className)}
      hoverScale={1.02}
      maxTilt={7}
      role="article"
      shineOpacity={0.55}
    >
      <HoloCardRotator>
        <HoloCardFrame>
          <HoloCardSurface className="flex h-full flex-col border border-border transition-colors group-hover:border-foreground/25">
            <div
              className={cn(
                "relative overflow-hidden border-b border-border bg-[#0b0b0e]",
                compacta ? "aspect-[5/4]" : "aspect-[4/5]",
              )}
            >
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
                  <HoloCardImage
                    alt={agrupacion.retrato.alt}
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={agrupacion.retrato.src}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10"
                  />
                </>
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-24 place-items-center rounded-full border border-white/15 bg-white/5 text-3xl font-semibold tracking-tight text-white/80 shadow-sm backdrop-blur">
                    {iniciales(agrupacion.nombre)}
                  </span>
                </span>
              )}

              <HoloCardShine />
              <HoloCardInset />

              <span className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75">
                <UsersRound aria-hidden="true" className="size-3.5" />
                {agrupacion.retrato
                  ? "Imagen de referencia"
                  : "Agrupación sin imagen verificada"}
              </span>
            </div>

            <div className="relative z-10 flex flex-1 flex-col bg-surface p-5">
              <div className="flex flex-wrap gap-2">
                <Chip color="warning" size="sm" variant="soft">
                  {agrupacion.etiquetaVisible}
                </Chip>
                <VerificacionBadge />
              </div>

              <h3 className="mt-4 text-balance text-lg font-semibold tracking-tight">
                <Link
                  className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-accent"
                  href={`/agrupaciones/${agrupacion.id}`}
                >
                  {agrupacion.nombre}
                </Link>
              </h3>

              <TextoAdaptado
                className={cn(
                  "mt-3 text-sm leading-relaxed text-muted",
                  compacta ? "line-clamp-3" : "flex-1",
                )}
                contenido={agrupacion.descripcion}
              />

              {sala ? (
                <p className="mt-4 text-xs font-medium text-muted">
                  Sala relacionada: {sala.nombre}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-separator pt-4">
                <Link
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-accent"
                  href={`/agrupaciones/${agrupacion.id}`}
                >
                  Ver ficha
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                  href={`/chat/agrupacion/${agrupacion.id}`}
                >
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-3.5"
                  />
                  Conversar
                </Link>
              </div>
            </div>
          </HoloCardSurface>
        </HoloCardFrame>
      </HoloCardRotator>
    </HoloCard>
  );
}
