import type {
  PeticionChat,
  RespuestaApi,
  RespuestaChatApi,
} from "../types/chat-api.types";
import type { PerfilId } from "@/types/perfil.types";

export interface EnviarMensajeChatEntrada {
  conversacionId: string;
  mensaje: string;
  sesionId: string;
  perfil: PerfilId;
}

export class ErrorChatApi extends Error {
  constructor(
    readonly codigo: string,
    mensaje: string,
  ) {
    super(mensaje);
    this.name = "ErrorChatApi";
  }
}

/**
 * Cliente del BFF de conversaciones.
 *
 * Vive en el módulo de chat y no conoce n8n: el navegador solo habla con la
 * API de Next.js, que es la que guarda la URL del webhook.
 */
export async function enviarMensajeChat(
  entrada: EnviarMensajeChatEntrada,
  signal?: AbortSignal,
): Promise<RespuestaChatApi> {
  const peticion: PeticionChat = {
    conversacionId: entrada.conversacionId,
    mensaje: entrada.mensaje,
    sesionId: entrada.sesionId,
    perfil: entrada.perfil,
  };

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(peticion),
    cache: "no-store",
    signal,
  });

  let payload: RespuestaApi<RespuestaChatApi> | null = null;

  try {
    payload = (await response.json()) as RespuestaApi<RespuestaChatApi>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload || !payload.ok) {
    const error = payload && !payload.ok ? payload.error : null;

    throw new ErrorChatApi(
      error?.codigo ?? "RESPUESTA_INVALIDA",
      error?.mensaje ??
        "No se pudo obtener una respuesta del agente. Intentá de nuevo.",
    );
  }

  return payload.datos;
}
