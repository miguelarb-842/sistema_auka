import type { AgrupacionInvitada, Personaje } from "../types/personaje.types";

const CABECERAS = {
  "Cache-Control": "no-store",
} as const;

export function presentarPersonajes(
  personajes: readonly Personaje[],
): Response {
  return Response.json(
    {
      ok: true,
      datos: {
        total: personajes.length,
        personajes,
      },
    },
    { headers: CABECERAS },
  );
}

export function presentarPersonaje(personaje: Personaje): Response {
  return Response.json({ ok: true, datos: personaje }, { headers: CABECERAS });
}

export function presentarAgrupaciones(
  agrupaciones: readonly AgrupacionInvitada[],
): Response {
  return Response.json(
    {
      ok: true,
      datos: {
        total: agrupaciones.length,
        agrupaciones,
      },
    },
    { headers: CABECERAS },
  );
}

export function presentarAgrupacion(agrupacion: AgrupacionInvitada): Response {
  return Response.json({ ok: true, datos: agrupacion }, { headers: CABECERAS });
}

export function presentarChatFicha(datos: unknown): Response {
  return Response.json({ ok: true, datos }, { headers: CABECERAS });
}

export function presentarError(error: unknown, estado = 500): Response {
  const mensaje =
    error instanceof Error
      ? error.message
      : "Error al procesar la solicitud de personajes.";

  return Response.json(
    {
      ok: false,
      error: {
        codigo: estado === 404 ? "NO_ENCONTRADO" : "ERROR_PERSONAJES",
        mensaje,
      },
    },
    { status: estado, headers: CABECERAS },
  );
}
