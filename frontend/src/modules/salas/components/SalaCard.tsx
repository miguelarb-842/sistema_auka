import type { Sala } from "../types/sala.types";

import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  MessageCircleQuestion,
  UsersRound,
} from "lucide-react";
import { Chip } from "@heroui/react";

import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { cn } from "@/lib/utils";
import {
  getAgrupacionesPorSala,
  getPersonajesPorSala,
} from "@/modules/personajes/services/personajes.service";

interface SalaCardProps {
  sala: Sala;
  className?: string;
}

export function SalaCard({ sala, className }: SalaCardProps) {
  const personajes = getPersonajesPorSala(sala.id);
  const agrupaciones = getAgrupacionesPorSala(sala.id);
  const vinculos = personajes.length + agrupaciones.length;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-foreground/25",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative aspect-[16/9] overflow-hidden border-b border-border bg-foreground/[0.03]"
      >
        <span className="auka-pattern absolute inset-0 opacity-40" />
        <span className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-warning/10" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-3xl border border-border bg-surface/80 text-foreground shadow-sm backdrop-blur">
            <Landmark className="size-7" />
          </span>
        </span>
      </div>

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <VerificacionBadge />
        {sala.agenteXilaUbicado ? (
          <Chip color="accent" size="sm" variant="soft">
            Agente Xila · {sala.nombre}
          </Chip>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-balance text-xl font-semibold tracking-tight">
          <Link
            className="rounded-md transition-colors hover:text-accent"
            href={`/salas/${sala.id}`}
          >
            {sala.nombre}
          </Link>
        </h3>

        <TextoAdaptado
          className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted"
          contenido={sala.descripcion}
        />

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <UsersRound aria-hidden="true" className="size-3.5" />
            {vinculos === 0
              ? "Sin vínculos asignados"
              : `${vinculos} ${vinculos === 1 ? "vínculo" : "vínculos"}`}
          </span>
          {sala.agenteXilaUbicado ? (
            <span className="inline-flex items-center gap-1.5">
              <MessageCircleQuestion aria-hidden="true" className="size-3.5" />
              Chat de sala disponible
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-separator pt-4">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent"
            href={`/salas/${sala.id}`}
          >
            Explorar sala
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          {sala.agenteXilaUbicado ? (
            <Link
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              href={`/chat/sala/${sala.id}`}
            >
              Hablar con el Agente Xila
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
