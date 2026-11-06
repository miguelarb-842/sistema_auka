export const PERFILES = ["nino", "adolescente", "adulto"] as const;

export type PerfilId = (typeof PERFILES)[number];

export interface PerfilVisitante {
  id: PerfilId;
  nombre: string;
  etiquetaCorta: string;
  descripcion: string;
  detalle: string;
  edadSugerida: string;
}

export function esPerfilId(valor: unknown): valor is PerfilId {
  return typeof valor === "string" && PERFILES.includes(valor as PerfilId);
}
