import type {
  ResumenConversacion,
  RespuestaChatApi,
  ContextoChat,
} from "../types/chat-api.types";

import { ChatApiError } from "../services/chat.errors";

const CABECERAS = {
  "Cache-Control": "no-store",
} as const;

export function presentarRespuestaChat(datos: RespuestaChatApi): Response {
  return Response.json({ ok: true, datos }, { headers: CABECERAS });
}

export function presentarConversaciones(
  conversaciones: readonly ResumenConversacion[],
): Response {
  return Response.json(
    {
      ok: true,
      datos: {
        total: conversaciones.length,
        conversaciones,
      },
    },
    { headers: CABECERAS },
  );
}

export function presentarConversacion(
  conversacion: ResumenConversacion,
): Response {
  return Response.json(
    { ok: true, datos: conversacion },
    { headers: CABECERAS },
  );
}

export function presentarContexto(contexto: ContextoChat): Response {
  return Response.json({ ok: true, datos: contexto }, { headers: CABECERAS });
}

export function presentarInfoApi(datos: unknown): Response {
  return Response.json({ ok: true, datos }, { headers: CABECERAS });
}

export function presentarError(error: unknown): Response {
  if (error instanceof ChatApiError) {
    if (error.estado >= 500) {
      // eslint-disable-next-line no-console
      console.error(`[chat/api] ${error.codigo}: ${error.message}`);
    }

    return Response.json(
      {
        ok: false,
        error: {
          codigo: error.codigo,
          mensaje: error.message,
          detalles: error.estado === 400 ? error.detalles : undefined,
        },
      },
      { status: error.estado, headers: CABECERAS },
    );
  }

  // eslint-disable-next-line no-console
  console.error("[chat/api] Error no controlado.", error);

  return Response.json(
    {
      ok: false,
      error: {
        codigo: "ERROR_INTERNO",
        mensaje: "No se pudo procesar la solicitud.",
      },
    },
    { status: 500, headers: CABECERAS },
  );
}
