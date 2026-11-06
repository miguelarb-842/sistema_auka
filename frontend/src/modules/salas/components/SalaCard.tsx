import type { Sala } from "../types/sala.types";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, UsersRound } from "lucide-react";
import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";

const tonos = {
  accent: {
    chip: "accent" as const,
    halo: "from-accent/25 via-accent/5",
    bar: "bg-accent",
  },
  warning: {
    chip: "warning" as const,
    halo: "from-warning/25 via-warning/5",
    bar: "bg-warning",
  },
  success: {
    chip: "success" as const,
    halo: "from-success/25 via-success/5",
    bar: "bg-success",
  },
  danger: {
    chip: "danger" as const,
    halo: "from-danger/25 via-danger/5",
    bar: "bg-danger",
  },
} satisfies Record<
  Sala["tono"],
  {
    chip: "accent" | "warning" | "success" | "danger";
    halo: string;
    bar: string;
  }
>;

interface SalaCardProps {
  sala: Sala;
  priority?: boolean;
  className?: string;
}

export function SalaCard({ sala, priority = false, className }: SalaCardProps) {
  const tono = tonos[sala.tono];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-foreground/25",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent opacity-70",
          tono.halo,
        )}
      />
      <Link
        aria-label={`Explorar la sala ${sala.nombre}`}
        className="auka-image-frame auka-image-hover relative block aspect-[16/10] overflow-hidden"
        href={`/salas/${sala.id}`}
      >
        <Image
          fill
          alt={sala.portadaAlt}
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={sala.portada}
        />
        <span
          aria-hidden="true"
          className="auka-gradient-overlay absolute inset-0 opacity-60"
        />
        <span className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Chip color={tono.chip} size="sm" variant="soft">
            {sala.tema}
          </Chip>
        </span>
      </Link>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-balance text-xl font-semibold tracking-tight">
          <Link
            className="rounded-md transition-colors hover:text-accent"
            href={`/salas/${sala.id}`}
          >
            {sala.nombre}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium italic text-muted">
          «{sala.lema}»
        </p>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
          {sala.resumen}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-3.5" />
            {sala.duracion}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersRound aria-hidden="true" className="size-3.5" />
            {sala.personajesIds.length}{" "}
            {sala.personajesIds.length === 1 ? "personaje" : "personajes"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", tono.bar)}
            />
            {sala.bloques.length} bloques
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-separator pt-4">
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
          <Link
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            href={`/chat/${sala.id}`}
          >
            Hablar con Xila
          </Link>
        </div>
      </div>
    </article>
  );
}
