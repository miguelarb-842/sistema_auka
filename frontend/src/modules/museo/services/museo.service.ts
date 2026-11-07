import type {
  AgrupacionInvitada,
  ConfigChat,
  Museo,
  Personaje,
  Sala,
} from "../types/museo.types";

import { paqueteContenido } from "../paquete-contenido";

/**
 * Acceso de solo lectura al paquete de contenido del museo.
 *
 * Los componentes y páginas no conocen los datos concretos: piden salas,
 * personajes, agrupaciones y configuraciones de chat a este servicio.
 * Cambiar de museo solo requiere reemplazar `paquete-contenido.ts`.
 */
export interface MuseoRepository {
  obtenerMuseo(): Museo;
  obtenerSalas(): readonly Sala[];
  obtenerSalaPorId(id: string): Sala | undefined;
  obtenerSalasConAgente(): readonly Sala[];
  obtenerPersonajes(): readonly Personaje[];
  obtenerPersonajePorId(id: string): Personaje | undefined;
  obtenerAgrupacionesInvitadas(): readonly AgrupacionInvitada[];
  obtenerAgrupacionPorId(id: string): AgrupacionInvitada | undefined;
  obtenerGuiaGeneral(): ConfigChat;
  obtenerChatPorId(id: string): ConfigChat | undefined;
  obtenerPersonajesPorSala(salaId: string): readonly Personaje[];
  obtenerAgrupacionesPorSala(salaId: string): readonly AgrupacionInvitada[];
  obtenerFichasConChat(): readonly (Personaje | AgrupacionInvitada)[];
  obtenerChatsDisponibles(): readonly ConfigChat[];
}

function crearRepositorio(museo: Museo): MuseoRepository {
  const buscarChatEnFichas = (id: string): ConfigChat | undefined => {
    const ficha = [...museo.personajes, ...museo.agrupacionesInvitadas].find(
      (item) => item.chat.id === id,
    );

    return ficha?.chat;
  };

  return {
    obtenerMuseo: () => museo,

    obtenerSalas: () => museo.salas,

    obtenerSalaPorId: (id) => museo.salas.find((sala) => sala.id === id),

    obtenerSalasConAgente: () =>
      museo.salas.filter((sala) => sala.agenteXilaUbicado !== undefined),

    obtenerPersonajes: () => museo.personajes,

    obtenerPersonajePorId: (id) =>
      museo.personajes.find((personaje) => personaje.id === id),

    obtenerAgrupacionesInvitadas: () => museo.agrupacionesInvitadas,

    obtenerAgrupacionPorId: (id) =>
      museo.agrupacionesInvitadas.find((agrupacion) => agrupacion.id === id),

    obtenerGuiaGeneral: () => museo.guiaGeneral,

    obtenerChatPorId: (id) => {
      if (museo.guiaGeneral.id === id) {
        return museo.guiaGeneral;
      }

      const agente = museo.salas
        .map((sala) => sala.agenteXilaUbicado)
        .find((config) => config?.id === id);

      if (agente) {
        return agente;
      }

      return buscarChatEnFichas(id);
    },

    obtenerPersonajesPorSala: (salaId) =>
      museo.personajes.filter((personaje) =>
        personaje.salasRelacionadas.includes(salaId),
      ),

    obtenerAgrupacionesPorSala: (salaId) =>
      museo.agrupacionesInvitadas.filter(
        (agrupacion) => agrupacion.salaRelacionada === salaId,
      ),

    obtenerFichasConChat: () => [
      ...museo.personajes,
      ...museo.agrupacionesInvitadas,
    ],

    obtenerChatsDisponibles: () => [
      museo.guiaGeneral,
      ...museo.salas
        .map((sala) => sala.agenteXilaUbicado)
        .filter((config): config is ConfigChat => config !== undefined),
      ...museo.personajes.map((personaje) => personaje.chat),
      ...museo.agrupacionesInvitadas.map((agrupacion) => agrupacion.chat),
    ],
  };
}

export const museoRepository: MuseoRepository =
  crearRepositorio(paqueteContenido);

export function getMuseo(): Museo {
  return museoRepository.obtenerMuseo();
}

export function getSalas(): readonly Sala[] {
  return museoRepository.obtenerSalas();
}

export function getSalaById(id: string): Sala | undefined {
  return museoRepository.obtenerSalaPorId(id);
}

export function getSalasConAgente(): readonly Sala[] {
  return museoRepository.obtenerSalasConAgente();
}

export function getPersonajes(): readonly Personaje[] {
  return museoRepository.obtenerPersonajes();
}

export function getPersonajeById(id: string): Personaje | undefined {
  return museoRepository.obtenerPersonajePorId(id);
}

export function getAgrupacionesInvitadas(): readonly AgrupacionInvitada[] {
  return museoRepository.obtenerAgrupacionesInvitadas();
}

export function getAgrupacionById(id: string): AgrupacionInvitada | undefined {
  return museoRepository.obtenerAgrupacionPorId(id);
}

export function getGuiaGeneral(): ConfigChat {
  return museoRepository.obtenerGuiaGeneral();
}

export function getChatById(id: string): ConfigChat | undefined {
  return museoRepository.obtenerChatPorId(id);
}

export function getPersonajesPorSala(salaId: string): readonly Personaje[] {
  return museoRepository.obtenerPersonajesPorSala(salaId);
}

export function getAgrupacionesPorSala(
  salaId: string,
): readonly AgrupacionInvitada[] {
  return museoRepository.obtenerAgrupacionesPorSala(salaId);
}

export function getFichasConChat(): readonly (
  Personaje | AgrupacionInvitada
)[] {
  return museoRepository.obtenerFichasConChat();
}

export function getChatsDisponibles(): readonly ConfigChat[] {
  return museoRepository.obtenerChatsDisponibles();
}
