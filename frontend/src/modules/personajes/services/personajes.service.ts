import type { AgrupacionInvitada, Personaje } from "../types/personaje.types";

import {
  getAgrupacionById as getAgrupacionByIdMuseo,
  getAgrupacionesInvitadas as getAgrupacionesInvitadasMuseo,
  getAgrupacionesPorSala as getAgrupacionesPorSalaMuseo,
  getFichasConChat as getFichasConChatMuseo,
  getPersonajeById as getPersonajeByIdMuseo,
  getPersonajes as getPersonajesMuseo,
  getPersonajesPorSala as getPersonajesPorSalaMuseo,
} from "@/modules/museo/services/museo.service";

export type FichaConChat = Personaje | AgrupacionInvitada;

export interface PersonajesRepository {
  obtenerTodos(): readonly Personaje[];
  obtenerPorId(id: string): Personaje | undefined;
  obtenerPorSala(salaId: string): readonly Personaje[];
  obtenerAgrupaciones(): readonly AgrupacionInvitada[];
  obtenerAgrupacionPorId(id: string): AgrupacionInvitada | undefined;
  obtenerFichas(): readonly FichaConChat[];
  buscar(termino: string): readonly FichaConChat[];
}

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const personajesRepository: PersonajesRepository = {
  obtenerTodos() {
    return getPersonajesMuseo();
  },
  obtenerPorId(id) {
    return getPersonajeByIdMuseo(id);
  },
  obtenerPorSala(salaId) {
    return getPersonajesPorSalaMuseo(salaId);
  },
  obtenerAgrupaciones() {
    return getAgrupacionesInvitadasMuseo();
  },
  obtenerAgrupacionPorId(id) {
    return getAgrupacionByIdMuseo(id);
  },
  obtenerFichas() {
    return getFichasConChatMuseo();
  },
  buscar(termino) {
    const consulta = normalizar(termino);
    const fichas = getFichasConChatMuseo();

    if (!consulta) {
      return fichas;
    }

    return fichas.filter((ficha) => {
      const contenido = [
        ficha.nombre,
        ficha.etiquetaVisible,
        ficha.descripcion.nino,
        ficha.descripcion.adolescente,
        ficha.descripcion.adulto,
      ].join(" ");

      return normalizar(contenido).includes(consulta);
    });
  },
};

export function getPersonajes(): readonly Personaje[] {
  return personajesRepository.obtenerTodos();
}

export function getPersonajeById(id: string): Personaje | undefined {
  return personajesRepository.obtenerPorId(id);
}

export function getPersonajesPorSala(salaId: string): readonly Personaje[] {
  return personajesRepository.obtenerPorSala(salaId);
}

export function getAgrupacionesInvitadas(): readonly AgrupacionInvitada[] {
  return personajesRepository.obtenerAgrupaciones();
}

export function getAgrupacionesPorSala(
  salaId: string,
): readonly AgrupacionInvitada[] {
  return getAgrupacionesPorSalaMuseo(salaId);
}

export function getAgrupacionById(id: string): AgrupacionInvitada | undefined {
  return personajesRepository.obtenerAgrupacionPorId(id);
}

export function getFichasConChat(): readonly FichaConChat[] {
  return personajesRepository.obtenerFichas();
}

export function buscarPersonajes(termino: string): readonly FichaConChat[] {
  return personajesRepository.buscar(termino);
}
