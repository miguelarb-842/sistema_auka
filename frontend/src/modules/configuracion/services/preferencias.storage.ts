import type { PerfilId } from "@/types/perfil.types";
import type {
  MovimientoPreferido,
  MovimientoResuelto,
  TamanoTexto,
} from "../types/preferencias.types";

export const STORAGE_KEYS = {
  perfil: "auka:perfil",
  tipografia: "auka:tipografia",
  tema: "auka:tema",
  movimiento: "auka:movimiento",
} as const;

function puedeUsarStorage(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function leerPerfil(): PerfilId | null {
  if (!puedeUsarStorage()) {
    return null;
  }

  try {
    const valor = window.localStorage.getItem(STORAGE_KEYS.perfil);

    if (valor === "nino" || valor === "adolescente" || valor === "adulto") {
      return valor;
    }

    return null;
  } catch {
    return null;
  }
}

export function guardarPerfil(perfil: PerfilId): void {
  if (!puedeUsarStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEYS.perfil, perfil);
  } catch {
    // El almacenamiento puede estar deshabilitado; la sesión sigue funcionando.
  }
}

export function leerTamanoTexto(): TamanoTexto | null {
  if (!puedeUsarStorage()) {
    return null;
  }

  try {
    const valor = window.localStorage.getItem(STORAGE_KEYS.tipografia);

    if (valor === "sm" || valor === "md" || valor === "lg") {
      return valor;
    }

    return null;
  } catch {
    return null;
  }
}

export function guardarTamanoTexto(tamano: TamanoTexto): void {
  if (!puedeUsarStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEYS.tipografia, tamano);
  } catch {
    // El almacenamiento puede estar deshabilitado; la sesión sigue funcionando.
  }
}

export function leerMovimiento(): MovimientoPreferido | null {
  if (!puedeUsarStorage()) {
    return null;
  }

  try {
    const valor = window.localStorage.getItem(STORAGE_KEYS.movimiento);

    if (valor === "sistema" || valor === "reducido" || valor === "completo") {
      return valor;
    }

    return null;
  } catch {
    return null;
  }
}

export function guardarMovimiento(movimiento: MovimientoPreferido): void {
  if (!puedeUsarStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEYS.movimiento, movimiento);
  } catch {
    // El almacenamiento puede estar deshabilitado; la sesión sigue funcionando.
  }
}

export function resolverMovimiento(
  preferencia: MovimientoPreferido,
): MovimientoResuelto {
  if (preferencia === "reducido") {
    return "reduced";
  }

  if (preferencia === "completo") {
    return "full";
  }

  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "reduced";
  }

  return "full";
}

export function aplicarMovimientoEnDocumento(
  preferencia: MovimientoPreferido,
): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.motion = resolverMovimiento(preferencia);
}

export function aplicarPerfilEnDocumento(perfil: PerfilId): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.perfil = perfil;
}

export function aplicarTamanoTextoEnDocumento(tamano: TamanoTexto): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.fontSize = tamano;
}

export function limpiarPreferencias(): void {
  if (!puedeUsarStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEYS.perfil);
    window.localStorage.removeItem(STORAGE_KEYS.tipografia);
    window.localStorage.removeItem(STORAGE_KEYS.movimiento);
  } catch {
    // El almacenamiento puede estar deshabilitado; no hay nada más que limpiar.
  }
}
