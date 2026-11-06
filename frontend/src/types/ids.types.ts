export const SALA_IDS = [
  "fiestas-patronales",
  "caciques-nicaragua",
  "diriangen-resistencia",
] as const;

export type SalaId = (typeof SALA_IDS)[number];

export const PERSONAJE_IDS = [
  "nicarao",
  "diriangen",
  "pueblos-chorotegas",
  "santo-domingo",
] as const;

export type PersonajeId = (typeof PERSONAJE_IDS)[number];

export const ASISTENTE_IDS = [
  "xila-tradiciones",
  "xila-nicarao",
  "xila-diriangen",
] as const;

export type AsistenteId = (typeof ASISTENTE_IDS)[number];

export function esSalaId(valor: string): valor is SalaId {
  return SALA_IDS.includes(valor as SalaId);
}

export function esPersonajeId(valor: string): valor is PersonajeId {
  return PERSONAJE_IDS.includes(valor as PersonajeId);
}
