"use client";

import type { Personaje } from "../types/personaje.types";

import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

export function BiografiaPersonaje({ personaje }: { personaje: Personaje }) {
  const { perfil } = usePreferencias();
  const parrafos = personaje.biografia[perfil];

  return (
    <ol className="space-y-4">
      {parrafos.map((parrafo, index) => (
        <li key={`${personaje.id}-bio-${index}`} className="flex gap-4">
          <span
            aria-hidden="true"
            className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-border bg-surface-secondary font-mono text-[0.68rem] font-semibold text-muted"
          >
            {index + 1}
          </span>
          <p className="text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {parrafo}
          </p>
        </li>
      ))}
    </ol>
  );
}
