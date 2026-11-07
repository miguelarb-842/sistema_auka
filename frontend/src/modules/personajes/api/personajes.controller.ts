import type { Personaje } from "../types/personaje.types";

import {
  getPersonajes,
  getPersonajeById,
  getPersonajesPorSala,
  getAgrupacionesInvitadas,
  getAgrupacionById,
  getAgrupacionesPorSala,
  buscarPersonajes,
} from "../services/personajes.service";

import { parsearFiltrosPersonajes } from "./personajes.schemas";
import {
  presentarAgrupacion,
  presentarAgrupaciones,
  presentarChatFicha,
  presentarError,
  presentarPersonaje,
  presentarPersonajes,
} from "./personajes.presenter";

import { chatController } from "@/modules/chat-xila/api/chat.controller";
import { chatContextoRepository } from "@/modules/chat-xila/repositories/chat-context.repository";

/**
 * Controller HTTP del módulo de personajes y agrupaciones (MVC).
 */
export const personajesController = {
  listar(request: Request): Response {
    try {
      const { searchParams } = new URL(request.url);
      const filtros = parsearFiltrosPersonajes(searchParams);

      if (filtros.salaId) {
        return presentarPersonajes(getPersonajesPorSala(filtros.salaId));
      }

      if (filtros.termino) {
        const fichas = buscarPersonajes(filtros.termino);
        const personajesSolo = fichas.filter(
          (f): f is Personaje => f.tipo === "personaje",
        );

        return presentarPersonajes(personajesSolo);
      }

      return presentarPersonajes(getPersonajes());
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerPorId(personajeId: string): Response {
    try {
      const personaje = getPersonajeById(personajeId);

      if (!personaje) {
        return presentarError(
          new Error(`No se encontró el personaje «${personajeId}».`),
          404,
        );
      }

      return presentarPersonaje(personaje);
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerChat(personajeId: string): Response {
    try {
      const personaje = getPersonajeById(personajeId);

      if (!personaje) {
        return presentarError(
          new Error(`No se encontró el personaje «${personajeId}».`),
          404,
        );
      }

      const contexto = chatContextoRepository.obtenerPorEntidad(
        personajeId,
        "personaje",
      );

      return presentarChatFicha({
        id: personaje.id,
        nombre: personaje.nombre,
        tipo: "personaje",
        chat: contexto?.config ?? personaje.chat,
      });
    } catch (error) {
      return presentarError(error);
    }
  },

  async enviarMensajeChat(
    personajeId: string,
    request: Request,
  ): Promise<Response> {
    return chatController.enviarMensaje(request, personajeId);
  },

  listarAgrupaciones(request: Request): Response {
    try {
      const { searchParams } = new URL(request.url);
      const filtros = parsearFiltrosPersonajes(searchParams);

      if (filtros.salaId) {
        return presentarAgrupaciones(getAgrupacionesPorSala(filtros.salaId));
      }

      return presentarAgrupaciones(getAgrupacionesInvitadas());
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerAgrupacionPorId(agrupacionId: string): Response {
    try {
      const agrupacion = getAgrupacionById(agrupacionId);

      if (!agrupacion) {
        return presentarError(
          new Error(`No se encontró la agrupación invitada «${agrupacionId}».`),
          404,
        );
      }

      return presentarAgrupacion(agrupacion);
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerChatAgrupacion(agrupacionId: string): Response {
    try {
      const agrupacion = getAgrupacionById(agrupacionId);

      if (!agrupacion) {
        return presentarError(
          new Error(`No se encontró la agrupación «${agrupacionId}».`),
          404,
        );
      }

      const contexto = chatContextoRepository.obtenerPorEntidad(
        agrupacionId,
        "agrupacion",
      );

      return presentarChatFicha({
        id: agrupacion.id,
        nombre: agrupacion.nombre,
        tipo: "agrupacion",
        chat: contexto?.config ?? agrupacion.chat,
      });
    } catch (error) {
      return presentarError(error);
    }
  },

  async enviarMensajeChatAgrupacion(
    agrupacionId: string,
    request: Request,
  ): Promise<Response> {
    return chatController.enviarMensaje(request, agrupacionId);
  },
};
