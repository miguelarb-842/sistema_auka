import type { ClassValue } from "clsx";

import clsx from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function crearId(prefijo = "id"): string {
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatearHora(timestamp: number): string {
  return new Intl.DateTimeFormat("es-NI", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function truncar(texto: string, maximo: number): string {
  if (texto.length <= maximo) {
    return texto;
  }

  return `${texto.slice(0, maximo).trimEnd()}…`;
}
