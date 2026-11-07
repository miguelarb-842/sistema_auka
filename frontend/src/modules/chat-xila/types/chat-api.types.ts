import type { ConfigChat, TipoChat } from "@/modules/museo/types/museo.types";
import type { PerfilId } from "@/types/perfil.types";

/**
 * Contratos HTTP del módulo de conversaciones.
 *
 * La API es un BFF: el navegador solo conoce estos tipos y el servidor
 * resuelve el contexto del museo, construye el prompt y habla con n8n.
 */
export interface PeticionChat {
  /** Identificador de la conversación (ej: `guia-general`, `personaje-lolita-soriano`). */
  conversacionId?: string;
  /** Identificador alternativo de sala (ej: `sala-de-musica`). */
  salaId?: string;
  /** Identificador alternativo de personaje (ej: `lolita-soriano`). */
  personajeId?: string;
  /** Identificador alternativo de agrupación (ej: `banda-municipal-managua`). */
  agrupacionId?: string;
  /** Alias genérico de identificador. */
  chatId?: string;
  agenteId?: string;
  /** Mensaje enviado por el visitante. */
  mensaje: string;
  /** Identificador de sesión para conservar la memoria conversacional en n8n. */
  sesionId?: string;
  /** Perfil pedagógico del visitante. */
  perfil: PerfilId;
}

/** Contexto resuelto en el servidor para una conversación concreta. */
export interface ContextoChat {
  config: ConfigChat;
  museo: {
    id: string;
    nombre: string;
  };
  sala?: {
    id: string;
    nombre: string;
    descripcion?: Record<PerfilId, string>;
    personajesRelacionados?: readonly string[];
  };
  ficha?: {
    id: string;
    nombre: string;
    tipo: "personaje" | "agrupacion";
    descripcion?: Record<PerfilId, string>;
    salasRelacionadas?: readonly string[];
  };
}

export interface MensajeRespuestaChat {
  contenido: string;
  tipo: "texto";
  timestamp: number;
}

export interface RespuestaChatApi {
  conversacionId: string;
  sesionId: string;
  respuesta: MensajeRespuestaChat;
}

export interface ResumenConversacion {
  id: string;
  tipo: TipoChat;
  nombreVisible: string;
  etiquetaVisible: string;
  avatar?: string;
  sala?: {
    id: string;
    nombre: string;
  };
  ficha?: {
    id: string;
    nombre: string;
    tipo: "personaje" | "agrupacion";
  };
}

export interface RespuestaExitosaApi<T> {
  ok: true;
  datos: T;
}

export interface RespuestaErrorApi {
  ok: false;
  error: {
    codigo: string;
    mensaje: string;
    detalles?: unknown;
  };
}

export type RespuestaApi<T> = RespuestaExitosaApi<T> | RespuestaErrorApi;
