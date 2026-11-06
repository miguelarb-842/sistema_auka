import type { AsistenteId, SalaId } from "@/types/ids.types";
import type { PerfilId } from "@/types/perfil.types";
import type { TonoIdentidad } from "@/types/ui.types";

export type AutorMensaje = "visitante" | "xila";

export type TipoMensaje = "texto" | "reto" | "sistema";

export type IntencionConversacion =
  | "saludo"
  | "identidad"
  | "tema-sala"
  | "personaje"
  | "fecha"
  | "fuente"
  | "reto"
  | "pista"
  | "ayuda"
  | "despedida"
  | "fuera-de-tema";

export interface RetoChat {
  id: string;
  titulo: string;
  enunciado: string;
  pista: string;
}

export interface Mensaje {
  id: string;
  autor: AutorMensaje;
  contenido: string;
  tipo: TipoMensaje;
  reto?: RetoChat;
  timestamp: number;
}

export interface ReglaRespuesta {
  id: string;
  intencion: IntencionConversacion;
  palabrasClave: readonly string[];
  respuestas: Record<PerfilId, string>;
}

export interface RetoAsistente {
  id: string;
  titulo: string;
  enunciado: string;
  pista: string;
  cierre: string;
}

export interface AsistenteXila {
  id: AsistenteId;
  nombre: string;
  salaId: SalaId;
  avatar: string;
  avatarAlt: string;
  tono: TonoIdentidad;
  tema: string;
  lema: string;
  biografia: string;
  personalidad: readonly string[];
  bienvenida: Record<PerfilId, string>;
  preguntasSugeridas: Record<PerfilId, readonly string[]>;
  retos: Record<PerfilId, readonly RetoAsistente[]>;
  reglas: readonly ReglaRespuesta[];
  fallback: Record<PerfilId, string>;
  cierre: Record<PerfilId, string>;
}

export interface ContextoConversacion {
  asistente: AsistenteXila;
  perfil: PerfilId;
  indiceReto: number;
  texto: string;
}

export interface RespuestaXila {
  contenido: string;
  tipo: TipoMensaje;
  reto?: RetoChat;
  siguienteIndiceReto: number;
  intencion: IntencionConversacion;
}

export interface MotorConversacionXila {
  responder(contexto: ContextoConversacion): RespuestaXila;
}
