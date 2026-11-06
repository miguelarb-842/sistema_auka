import type { PersonajeId, SalaId } from "@/types/ids.types";
import type { PerfilId } from "@/types/perfil.types";

export type TextoPorPerfil = Record<PerfilId, string>;

export type TipoPersonaje = "historico" | "colectivo" | "cultural";

export type EstadoAcontecimiento =
  "documentado" | "interpretacion" | "demostrativo";

export type IconoValor =
  | "curiosidad"
  | "dialogo"
  | "dignidad"
  | "memoria"
  | "valentia"
  | "identidad"
  | "comunidad";

export interface Acontecimiento {
  id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoAcontecimiento;
}

export interface ValorPersonaje {
  titulo: string;
  descripcion: string;
  icono: IconoValor;
}

export interface IntercambioDramatizado {
  id: string;
  preguntaVisitante: string;
  respuestaDramatizada: string;
  contextoXila: string;
}

export interface Personificacion {
  disponible: boolean;
  introduccion: string;
  advertencia: string;
  intercambios: readonly IntercambioDramatizado[];
}

export interface Personaje {
  id: PersonajeId;
  nombre: string;
  alias?: string;
  tipo: TipoPersonaje;
  epoca: string;
  lugar: string;
  resumen: string;
  descripcion: TextoPorPerfil;
  biografia: Record<PerfilId, readonly string[]>;
  contexto: TextoPorPerfil;
  acontecimientos: readonly Acontecimiento[];
  valores: readonly ValorPersonaje[];
  preguntasReflexion: readonly string[];
  salaId: SalaId;
  salasRelacionadas: readonly SalaId[];
  ilustracion: string;
  ilustracionAlt: string;
  notaRepresentacion: string;
  notaFuentes: string;
  personificacion: Personificacion;
}
