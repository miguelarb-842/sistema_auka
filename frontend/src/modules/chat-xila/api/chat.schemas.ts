import type { PeticionChat } from "../types/chat-api.types";

import { esPerfilId } from "@/types/perfil.types";

const MAX_ID = 120;
const MAX_MENSAJE = 2_000;
const MAX_SESION_ID = 160;

export type ResultadoValidacion<T> =
  { ok: true; datos: T } | { ok: false; errores: readonly string[] };

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function leerTexto(valor: unknown): string {
  return typeof valor === "string" ? valor.trim() : "";
}

/**
 * Validación de entrada sin dependencias externas.
 *
 * Admite `conversacionId`, `salaId`, `personajeId`, `agrupacionId`, `chatId` o `agenteId`
 * para otorgar máxima flexibilidad al cliente HTTP.
 */
export function validarPeticionChat(
  payload: unknown,
  identificadorPredeterminado?: string,
): ResultadoValidacion<PeticionChat> {
  if (!esObjeto(payload)) {
    return {
      ok: false,
      errores: ["El cuerpo de la petición debe ser un objeto JSON."],
    };
  }

  const errores: string[] = [];

  const conversacionId = leerTexto(payload.conversacionId);
  const salaId = leerTexto(payload.salaId);
  const personajeId = leerTexto(payload.personajeId);
  const agrupacionId = leerTexto(payload.agrupacionId);
  const chatId = leerTexto(payload.chatId);
  const agenteId = leerTexto(payload.agenteId);

  const identificadorEfectivo =
    conversacionId ||
    salaId ||
    personajeId ||
    agrupacionId ||
    chatId ||
    agenteId ||
    identificadorPredeterminado ||
    "";

  if (!identificadorEfectivo) {
    errores.push(
      "Debés especificar al menos un identificador de destino: «conversacionId», «salaId», «personajeId» o «agrupacionId».",
    );
  } else if (identificadorEfectivo.length > MAX_ID) {
    errores.push(`El identificador no puede superar ${MAX_ID} caracteres.`);
  }

  const mensaje = leerTexto(payload.mensaje);

  if (!mensaje) {
    errores.push("El campo «mensaje» es obligatorio.");
  } else if (mensaje.length > MAX_MENSAJE) {
    errores.push(
      `El campo «mensaje» no puede superar ${MAX_MENSAJE} caracteres.`,
    );
  }

  const sesionId = leerTexto(payload.sesionId);

  if (sesionId.length > MAX_SESION_ID) {
    errores.push(
      `El campo «sesionId» no puede superar ${MAX_SESION_ID} caracteres.`,
    );
  }

  let perfil: PeticionChat["perfil"] = "adolescente";

  if (
    payload.perfil !== undefined &&
    payload.perfil !== null &&
    payload.perfil !== ""
  ) {
    if (esPerfilId(payload.perfil)) {
      perfil = payload.perfil;
    } else {
      errores.push(
        "El campo «perfil» debe ser 'nino', 'adolescente' o 'adulto'.",
      );
    }
  }

  if (errores.length > 0) {
    return { ok: false, errores };
  }

  return {
    ok: true,
    datos: {
      conversacionId: identificadorEfectivo,
      salaId: salaId || undefined,
      personajeId: personajeId || undefined,
      agrupacionId: agrupacionId || undefined,
      mensaje,
      sesionId: sesionId || undefined,
      perfil,
    },
  };
}
