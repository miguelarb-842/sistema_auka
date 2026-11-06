"use client";

import type { PerfilId } from "@/types/perfil.types";

import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";
import { cn } from "@/lib/utils";

interface TextoAdaptadoProps {
  contenido: Record<PerfilId, string>;
  as?: "p" | "span" | "div";
  className?: string;
}

export function TextoAdaptado({
  contenido,
  as = "p",
  className,
}: TextoAdaptadoProps) {
  const { perfil } = usePreferencias();
  const Etiqueta = as;

  return <Etiqueta className={cn(className)}>{contenido[perfil]}</Etiqueta>;
}
