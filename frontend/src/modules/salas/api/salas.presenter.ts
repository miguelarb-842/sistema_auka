import type { Sala } from "../types/sala.types";

const CABECERAS = {
  "Cache-Control": "no-store",
} as const;

export function presentarSalas(salas: readonly Sala[]): Response {
  return Response.json(
    {
      ok: true,
      datos: {
        total: salas.length,
        salas,
      },
    },
    { headers: CABECERAS },
  );
}

export function presentarSala(sala: Sala): Response {
  return Response.json({ ok: true, datos: sala }, { headers: CABECERAS });
}

export function presentarChatSala(datos: unknown): Response {
  return Response.json({ ok: true, datos }, { headers: CABECERAS });
}

export function presentarError(error: unknown, estado = 500): Response {
  const mensaje =
    error instanceof Error ? error.message : "Error al procesar las salas.";

  return Response.json(
    {
      ok: false,
      error: {
        codigo: estado === 404 ? "SALA_NO_ENCONTRADA" : "ERROR_SALAS",
        mensaje,
      },
    },
    { status: estado, headers: CABECERAS },
  );
}
