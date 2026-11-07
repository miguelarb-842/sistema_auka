import type { ConfigChat, RetoChat } from "@/modules/museo/types/museo.types";
import type { PerfilId } from "@/types/perfil.types";

export type AutorMensaje = "visitante" | "asistente";

export type TipoMensaje = "texto" | "reto" | "sistema";

export type { RetoChat };

export interface Mensaje {
  id: string;
  autor: AutorMensaje;
  contenido: string;
  tipo: TipoMensaje;
  reto?: RetoChat;
  timestamp: number;
}

/** Entrada única del motor, sin importar el tipo de conversación. */
export interface EntradaChat {
  config: ConfigChat;
  perfil: PerfilId;
  texto: string;
  indiceReto: number;
}

export interface RespuestaChat {
  contenido: string;
  tipo: Exclude<TipoMensaje, "sistema">;
  reto?: RetoChat;
  siguienteIndiceReto: number;
}

/**
 * Contrato abstracto del motor de respuestas.
 * La interfaz de chat solo conoce este contrato; puede sustituirse por otra
 * implementación sin cambiar componentes ni rutas.
 */
export interface MotorRespuestas {
  responder(entrada: EntradaChat): Promise<RespuestaChat>;
}
