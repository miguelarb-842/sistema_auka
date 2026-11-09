/**
 * Contrato de los prompts individuales por conversación.
 *
 * Cada configuración de chat tiene su propio módulo. El prompt resultante
 * distingue tres capas para reducir alucinaciones:
 *
 * 1. `hechos`: datos documentados que la voz puede afirmar.
 * 2. `contexto`: interpretación histórica o cultural; se presenta como
 *    contexto, nunca como recuerdo personal.
 * 3. `porVerificar`: datos que deben señalarse explícitamente como pendientes.
 *
 * Los límites impiden inventar relaciones, familia, experiencias, fechas,
 * obras o encuentros que no estén documentados.
 */
export interface FuentePrompt {
  titulo: string;
  detalle: string;
}

export interface PromptChat {
  /** Identificador de la configuración de chat a la que pertenece. */
  id: string;
  /** Identidad y persona gramatical de la voz. */
  rol: string;
  /** Hechos documentados que puede afirmar sin rodeos. */
  hechos: readonly string[];
  /** Contexto histórico o interpretativo, sin convertirlo en memoria personal. */
  contexto: readonly string[];
  /** Datos que deben marcarse como por verificar. */
  porVerificar: readonly string[];
  /** Prohibiciones específicas de esta voz. */
  limites: readonly string[];
  /** Fuentes de referencia usadas para redactar el módulo. */
  fuentes: readonly FuentePrompt[];
  /** Indicaciones de estilo adicionales. */
  estilo?: string;
}
