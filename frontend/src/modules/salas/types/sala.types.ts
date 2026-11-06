import type { AsistenteId, PersonajeId, SalaId } from "@/types/ids.types";
import type { PerfilId } from "@/types/perfil.types";
import type { EstadoContenido, TonoIdentidad } from "@/types/ui.types";

export type TextoPorPerfil = Record<PerfilId, string>;

export type IconoElementoSala =
  | "musica"
  | "procesion"
  | "comunidad"
  | "fuego"
  | "lago"
  | "dialogo"
  | "territorio"
  | "memoria"
  | "dignidad"
  | "valentia";

export interface BloqueSala {
  id: string;
  titulo: string;
  estado: EstadoContenido;
  contenido: TextoPorPerfil;
  fuente?: string;
}

export interface ElementoSala {
  id: string;
  titulo: string;
  descripcion: TextoPorPerfil;
  icono: IconoElementoSala;
}

export interface RetoEducativo {
  id: string;
  titulo: string;
  enunciado: TextoPorPerfil;
  pista: TextoPorPerfil;
  cierre: TextoPorPerfil;
}

export interface Sala {
  id: SalaId;
  nombre: string;
  tema: string;
  lema: string;
  resumen: string;
  descripcion: TextoPorPerfil;
  introduccion: TextoPorPerfil;
  portada: string;
  portadaAlt: string;
  tono: TonoIdentidad;
  duracion: string;
  preguntasClave: readonly string[];
  bloques: readonly BloqueSala[];
  elementos: readonly ElementoSala[];
  personajesIds: readonly PersonajeId[];
  asistenteId: AsistenteId;
  retos: readonly RetoEducativo[];
  avisoContenido: string;
}
