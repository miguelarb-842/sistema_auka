import type { PerfilId } from "@/types/perfil.types";
import type { EstadoContenido } from "@/types/ui.types";

/**
 * Contenido con una variante por perfil de visitante.
 * El mismo dato se cuenta con distinto tono y profundidad.
 */
export type ContenidoPorPerfil<T = string> = Record<PerfilId, T>;

export interface RetoChat {
  id: string;
  titulo: string;
  enunciado: string;
  pista: string;
  cierre?: string;
}

export interface TemaConocido {
  id: string;
  titulo: string;
  palabrasClave: readonly string[];
  respuesta: ContenidoPorPerfil;
}

/**
 * Conocimiento local de una configuración de chat.
 * El motor de respuestas solo puede usar estos temas; cuando no encuentra
 * coincidencia, responde con `respuestaDesconocido` en vez de inventar.
 */
export interface ConocimientoLocal {
  temasConocidos: readonly TemaConocido[];
  temasNoConocidos: readonly string[];
  respuestaDesconocido: ContenidoPorPerfil;
}

export type TipoChat =
  "guia-general" | "agente-sala" | "personaje" | "agrupacion";

export interface ConfigChat {
  id: string;
  tipo: TipoChat;
  nombreVisible: string;
  etiquetaVisible: string;
  avatar?: string;
  avatarAlt?: string;
  bienvenida: ContenidoPorPerfil;
  preguntasSugeridas: ContenidoPorPerfil<readonly string[]>;
  retos?: ContenidoPorPerfil<readonly RetoChat[]>;
  conocimiento: ConocimientoLocal;
}

export interface Sala {
  id: string;
  nombre: string;
  descripcion: ContenidoPorPerfil;
  estado: EstadoContenido;
  porVerificar: boolean;
  agenteXilaUbicado?: ConfigChat;
  personajesRelacionados: readonly string[];
}

/** Retrato o imagen de referencia de una ficha. */
export interface RetratoFicha {
  src: string;
  alt: string;
}

/** Forma común de las fichas que tienen un chat propio. */
export interface FichaConChat {
  id: string;
  nombre: string;
  etiquetaVisible: string;
  descripcion: ContenidoPorPerfil;
  estado: EstadoContenido;
  porVerificar: boolean;
  retrato?: RetratoFicha;
  chat: ConfigChat;
}

export interface Personaje extends FichaConChat {
  tipo: "personaje";
  salasRelacionadas: readonly string[];
}

export interface AgrupacionInvitada extends FichaConChat {
  tipo: "agrupacion";
  salaRelacionada: string;
}

/**
 * Entidad raíz de los datos. Cambiar de museo implica reemplazar el paquete
 * de contenido que exporta `museo/paquete-contenido.ts`, sin tocar componentes.
 */
export interface Museo {
  id: string;
  nombre: string;
  etiquetaInstalacion: string;
  salas: readonly Sala[];
  personajes: readonly Personaje[];
  agrupacionesInvitadas: readonly AgrupacionInvitada[];
  guiaGeneral: ConfigChat;
}
