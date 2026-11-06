import type { Personaje } from "../types/personaje.types";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";

const tipos = {
  historico: { etiqueta: "Figura histórica", color: "accent" as const },
  colectivo: { etiqueta: "Pueblo originario", color: "success" as const },
  cultural: { etiqueta: "Figura cultural", color: "warning" as const },
} satisfies Record<
  Personaje["tipo"],
  { etiqueta: string; color: "accent" | "success" | "warning" }
>;

interface PersonajeCardProps {
  personaje: Personaje;
  className?: string;
  compacta?: boolean;
}

export function PersonajeCard({
  personaje,
  className,
  compacta = false,
}: PersonajeCardProps) {
  const tipo = tipos[personaje.tipo];

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-foreground/25",
        className,
      )}
    >
      <Link
        aria-label={`Conocer a ${personaje.nombre}`}
        className={cn(
          "auka-image-frame auka-image-hover relative block overflow-hidden",
          compacta ? "aspect-[5/4]" : "aspect-[4/5]",
        )}
        href={`/personajes/${personaje.id}`}
      >
        <Image
          fill
          alt={personaje.ilustracionAlt}
          className="object-cover object-top"
          sizes={
            compacta
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          src={personaje.ilustracion}
        />
        <span
          aria-hidden="true"
          className="auka-gradient-overlay absolute inset-0 opacity-70"
        />
        <span className="absolute left-4 top-4">
          <Chip color={tipo.color} size="sm" variant="soft">
            {tipo.etiqueta}
          </Chip>
        </span>
        <span className="absolute bottom-4 left-4 right-4 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/75">
          Representación artística conceptual
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-balance text-lg font-semibold tracking-tight">
          <Link
            className="rounded-md transition-colors hover:text-accent"
            href={`/personajes/${personaje.id}`}
          >
            {personaje.nombre}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-muted">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
          {personaje.lugar}
        </p>
        {!compacta ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {personaje.resumen}
          </p>
        ) : null}
        <Link
          className="mt-4 inline-flex items-center gap-1.5 border-t border-separator pt-4 text-sm font-semibold transition-colors group-hover:text-accent"
          href={`/personajes/${personaje.id}`}
        >
          Ver ficha
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
