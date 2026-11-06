import type { PerfilId } from "@/types/perfil.types";

export type TemaPreferido = "light" | "dark";

export type TamanoTexto = "sm" | "md" | "lg";

export interface Preferencias {
  perfil: PerfilId;
  tamanoTexto: TamanoTexto;
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
