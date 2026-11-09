import type { PerfilId } from "@/types/perfil.types";

import { ChatApiError } from "./chat.errors";

const TIMEOUT_POR_DEFECTO_MS = 60_000;
const TIMEOUT_MINIMO_MS = 5_000;
const TIMEOUT_MAXIMO_MS = 120_000;

/**
 * Error interno del webhook.
 *
 * `reintentable` distingue fallas transitorias (red, timeout, 5xx) de
 * rechazos definitivos (4xx). El fallback opcional solo se intenta con las
 * primeras.
 */
class ErrorWebhook extends Error {
  constructor(
    readonly reintentable: boolean,
    readonly status?: number,
    mensaje?: string,
  ) {
    super(mensaje ?? "Error del webhook de n8n");
    this.name = "ErrorWebhook";
  }
}

function obtenerUrlWebhook(): string {
  return process.env.N8N_CHAT_WEBHOOK_URL?.trim() ?? "";
}

function obtenerUrlFallback(): string | undefined {
  const url = process.env.N8N_CHAT_FALLBACK_URL?.trim();

  return url || undefined;
}

function obtenerTimeoutMs(): number {
  const valor = Number(process.env.N8N_CHAT_TIMEOUT_MS);

  if (!Number.isFinite(valor) || valor <= 0) {
    return TIMEOUT_POR_DEFECTO_MS;
  }

  return Math.min(Math.max(valor, TIMEOUT_MINIMO_MS), TIMEOUT_MAXIMO_MS);
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

function interpretarCuerpo(
  cuerpo: string,
  contentType: string,
): string | undefined {
  const limpio = cuerpo.trim();

  if (!limpio) {
    return undefined;
  }

  const pareceJson =
    contentType.toLowerCase().includes("application/json") ||
    limpio.startsWith("{") ||
    limpio.startsWith("[");

  if (pareceJson) {
    try {
      return extraerTexto(JSON.parse(limpio));
    } catch {
      throw new ChatApiError(
        "AGENTE_RESPUESTA_INVALIDA",
        "El agente devolvió un formato no interpretable.",
        502,
      );
    }
  }

  if (limpio.toLowerCase().startsWith("<html")) {
    return undefined;
  }

  return limpio;
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
  let agotoTiempo = false;
  const timer = setTimeout(() => {
    agotoTiempo = true;
    controller.abort();
  }, timeoutMs);

  try {
    let response: Response;

    try {
      response = await fetch(url, {
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
    } catch (error) {
      if (
        agotoTiempo ||
        (error instanceof Error && error.name === "AbortError")
      ) {
        throw new ErrorWebhook(
          true,
          undefined,
          `El agente no respondió dentro de ${timeoutMs} ms.`,
        );
      }

      throw new ErrorWebhook(
        true,
        undefined,
        "No se pudo contactar al webhook.",
      );
    }

    const cuerpo = await response.text();

    if (!response.ok) {
      const reintentable = response.status >= 500;
      const host = new URL(url).host;

      // eslint-disable-next-line no-console
      console.warn(
        `[chat/n8n] ${host} respondió HTTP ${response.status}. Reintentable: ${reintentable}.`,
      );

      throw new ErrorWebhook(
        reintentable,
        response.status,
        `El agente respondió HTTP ${response.status}.`,
      );
    }

    const texto = interpretarCuerpo(
      cuerpo,
      response.headers.get("content-type") ?? "",
    );

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

function mapearError(error: unknown): ChatApiError {
  if (error instanceof ChatApiError) {
    return error;
  }

  if (error instanceof ErrorWebhook) {
    return new ChatApiError(
      "AGENTE_NO_DISPONIBLE",
      "No se pudo contactar al agente conversacional. Intentá de nuevo en unos segundos.",
      502,
    );
  }

  return new ChatApiError(
    "AGENTE_NO_DISPONIBLE",
    "No se pudo contactar al agente conversacional. Intentá de nuevo en unos segundos.",
    502,
  );
}

class N8nChatServiceImpl implements N8nChatService {
  async enviarMensaje(entrada: EnviarMensajeN8nEntrada): Promise<string> {
    const urlPrincipal = obtenerUrlWebhook();

    if (!urlPrincipal) {
      // eslint-disable-next-line no-console
      console.error(
        "[chat/n8n] Falta N8N_CHAT_WEBHOOK_URL. La conversación no puede continuar sin un webhook configurado.",
      );

      throw new ChatApiError(
        "AGENTE_NO_CONFIGURADO",
        "El servicio de conversación no está configurado en este entorno.",
        503,
      );
    }

    const timeoutMs = obtenerTimeoutMs();

    try {
      return await ejecutarLlamadaWebhook(urlPrincipal, entrada, timeoutMs);
    } catch (primerError) {
      // Un 4xx es un rechazo definitivo: no se reintenta ni se usa fallback.
      if (primerError instanceof ErrorWebhook && !primerError.reintentable) {
        throw mapearError(primerError);
      }

      if (primerError instanceof ChatApiError) {
        throw primerError;
      }

      const urlFallback = obtenerUrlFallback();

      if (urlFallback && urlFallback !== urlPrincipal) {
        // eslint-disable-next-line no-console
        console.info(
          "[chat/n8n] La URL principal falló de forma transitoria. Se intenta el fallback configurado.",
        );

        try {
          return await ejecutarLlamadaWebhook(urlFallback, entrada, timeoutMs);
        } catch (segundoError) {
          // eslint-disable-next-line no-console
          console.error(
            "[chat/n8n] Fallaron la URL principal y el fallback configurado.",
          );

          throw mapearError(segundoError);
        }
      }

      // eslint-disable-next-line no-console
      console.error(
        "[chat/n8n] La URL principal falló y no hay fallback configurado.",
      );
      throw mapearError(primerError);
    }
  }
}

export const n8nChatService: N8nChatService = new N8nChatServiceImpl();
