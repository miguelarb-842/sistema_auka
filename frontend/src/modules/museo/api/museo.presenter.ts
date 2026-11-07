import type { ConfigChat, Museo } from "../types/museo.types";

const CABECERAS = {
  "Cache-Control": "no-store",
} as const;

export function presentarMuseo(museo: Museo): Response {
  return Response.json(
    {
      ok: true,
      datos: {
        id: museo.id,
        nombre: museo.nombre,
        etiquetaInstalacion: museo.etiquetaInstalacion,
        totalSalas: museo.salas.length,
        totalPersonajes: museo.personajes.length,
        totalAgrupaciones: museo.agrupacionesInvitadas.length,
        salas: museo.salas.map((s) => ({
          id: s.id,
          nombre: s.nombre,
          tieneAgente: s.agenteXilaUbicado !== undefined,
        })),
        personajes: museo.personajes.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          etiqueta: p.etiquetaVisible,
        })),
        agrupaciones: museo.agrupacionesInvitadas.map((a) => ({
          id: a.id,
          nombre: a.nombre,
          etiqueta: a.etiquetaVisible,
        })),
      },
    },
    { headers: CABECERAS },
  );
}

export function presentarGuiaGeneral(guia: ConfigChat): Response {
  return Response.json({ ok: true, datos: guia }, { headers: CABECERAS });
}

export function presentarInfoApi(datos: unknown): Response {
  return Response.json({ ok: true, datos }, { headers: CABECERAS });
}

export function presentarError(error: unknown, estado = 500): Response {
  const mensaje =
    error instanceof Error
      ? error.message
      : "Error al procesar la información del museo.";

  return Response.json(
    {
      ok: false,
      error: {
        codigo: "ERROR_MUSEO",
        mensaje,
      },
    },
    { status: estado, headers: CABECERAS },
  );
}
