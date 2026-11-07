import type { PerfilId } from "@/types/perfil.types";

import { ChatApiError } from "./chat.errors";

const TIMEOUT_POR_DEFECTO_MS = 60_000;
const FALLBACK_LOCAL_WEBHOOK_URL =
  "http://localhost:5678/webhook/ee59e9c9-6515-41be-a10b-9a266e5d5965/chat";

function obtenerUrlWebhook(): string {
  const url = process.env.N8N_CHAT_WEBHOOK_URL?.trim();

  return url || FALLBACK_LOCAL_WEBHOOK_URL;
}

function obtenerTimeoutMs(): number {
  const valor = Number(process.env.N8N_CHAT_TIMEOUT_MS);

  return Number.isFinite(valor) && valor > 0 ? valor : TIMEOUT_POR_DEFECTO_MS;
}

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

/**
 * n8n puede devolver el texto en `output`, `text`, `response` o dentro de un
 * arreglo, según cómo esté armado el workflow. Este extractor tolera esas
 * variantes sin acoplar la app a una única forma de respuesta.
 */
function extraerTexto(payload: unknown, profundidad = 0): string | undefined {
  if (profundidad > 6) {
    return undefined;
  }

  if (typeof payload === "string") {
    const limpio = payload.trim();

    return limpio || undefined;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const texto = extraerTexto(item, profundidad + 1);

      if (texto) {
        return texto;
      }
    }

    return undefined;
  }

  if (!esObjeto(payload)) {
    return undefined;
  }

  const claves = [
    "output",
    "text",
    "response",
    "respuesta",
    "message",
    "content",
    "answer",
    "resultado",
    "data",
  ];

  for (const clave of claves) {
    if (clave in payload) {
      const texto = extraerTexto(payload[clave], profundidad + 1);

      if (texto) {
        return texto;
      }
    }
  }

  return undefined;
}

interface EnviarMensajeN8nEntrada {
  sesionId: string;
  chatInput: string;
  conversacionId: string;
  perfil: PerfilId;
}

export interface N8nChatService {
  enviarMensaje(entrada: EnviarMensajeN8nEntrada): Promise<string>;
}

async function ejecutarLlamadaWebhook(
  url: string,
  entrada: EnviarMensajeN8nEntrada,
  timeoutMs: number,
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        action: "sendMessage",
        sessionId: entrada.sesionId,
        chatInput: entrada.chatInput,
        conversacionId: entrada.conversacionId,
        perfil: entrada.perfil,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const cuerpo = await response.text();

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn(
        `[chat/n8n] Webhook en ${url} respondió HTTP ${response.status}: ${cuerpo.slice(0, 200)}`,
      );
      throw new Error(`HTTP_${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    let texto: string | undefined;

    if (contentType.toLowerCase().includes("application/json")) {
      try {
        texto = extraerTexto(JSON.parse(cuerpo));
      } catch {
        throw new ChatApiError(
          "AGENTE_RESPUESTA_INVALIDA",
          "El agente devolvió un formato no interpretable.",
          502,
        );
      }
    } else {
      const limpio = cuerpo.trim();

      if (limpio && !limpio.toLowerCase().startsWith("<html")) {
        texto = limpio;
      }
    }

    if (!texto) {
      throw new ChatApiError(
        "AGENTE_RESPUESTA_VACIA",
        "El agente no generó texto en su respuesta.",
        502,
      );
    }

    return texto;
  } finally {
    clearTimeout(timer);
  }
}

class N8nChatServiceImpl implements N8nChatService {
  async enviarMensaje(entrada: EnviarMensajeN8nEntrada): Promise<string> {
    const urlPrincipal = obtenerUrlWebhook();
    const timeoutMs = obtenerTimeoutMs();

    try {
      return await ejecutarLlamadaWebhook(urlPrincipal, entrada, timeoutMs);
    } catch (primerError) {
      if (primerError instanceof ChatApiError) {
        throw primerError;
      }

      // Si la URL principal es remota (ngrok) y falla, intentamos fallback al puerto 5678 de Docker local
      if (
        urlPrincipal !== FALLBACK_LOCAL_WEBHOOK_URL &&
        !urlPrincipal.includes("localhost:5678")
      ) {
        try {
          // eslint-disable-next-line no-console
          console.info(
            `[chat/n8n] Reintentando con endpoint local Docker (${FALLBACK_LOCAL_WEBHOOK_URL})...`,
          );

          return await ejecutarLlamadaWebhook(
            FALLBACK_LOCAL_WEBHOOK_URL,
            entrada,
            timeoutMs,
          );
        } catch (segundoError) {
          // eslint-disable-next-line no-console
          console.error(
            "[chat/n8n] Falló tanto la URL principal como el endpoint Docker local.",
            segundoError,
          );
        }
      }

      // eslint-disable-next-line no-console
      console.error(
        "[chat/n8n] Error al contactar webhook de n8n:",
        primerError,
      );

      throw new ChatApiError(
        "AGENTE_NO_DISPONIBLE",
        "No se pudo contactar al agente conversacional en n8n.",
        502,
      );
    }
  }
}

export const n8nChatService: N8nChatService = new N8nChatServiceImpl();
