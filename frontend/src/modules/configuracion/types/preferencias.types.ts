import type { PerfilId } from "@/types/perfil.types";

export type TemaPreferido = "light" | "dark";

export type TamanoTexto = "sm" | "md" | "lg";

/**
 * Preferencia de movimiento.
 * - `sistema`: respeta `prefers-reduced-motion`.
 * - `reducido`: desactiva animaciones no esenciales.
 * - `completo`: habilita las animaciones aunque el sistema pida reducirlas.
 */
export type MovimientoPreferido = "sistema" | "reducido" | "completo";

export type MovimientoResuelto = "full" | "reduced";

export interface Preferencias {
  perfil: PerfilId;
  tamanoTexto: TamanoTexto;
  movimiento: MovimientoPreferido;
}

export interface OpcionTamanoTexto {
  id: TamanoTexto;
  etiqueta: string;
  descripcion: string;
  muestra: string;
}

export interface OpcionTema {
  id: TemaPreferido;
  etiqueta: string;
  descripcion: string;
}
