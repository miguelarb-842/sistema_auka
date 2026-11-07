import { getSalas, getSalaById, buscarSalas } from "../services/salas.service";

import { parsearFiltrosSalas } from "./salas.schemas";
import {
  presentarChatSala,
  presentarError,
  presentarSala,
  presentarSalas,
} from "./salas.presenter";

import { chatController } from "@/modules/chat-xila/api/chat.controller";
import { chatContextoRepository } from "@/modules/chat-xila/repositories/chat-context.repository";

/**
 * Controller HTTP del módulo de salas (MVC).
 */
export const salasController = {
  listar(request: Request): Response {
    try {
      const { searchParams } = new URL(request.url);
      const filtros = parsearFiltrosSalas(searchParams);

      let resultado = filtros.termino
        ? buscarSalas(filtros.termino)
        : getSalas();

      if (filtros.conAgente !== undefined) {
        resultado = resultado.filter(
          (s) => (s.agenteXilaUbicado !== undefined) === filtros.conAgente,
        );
      }

      if (filtros.destacadas !== undefined) {
        resultado = resultado.slice(0, filtros.destacadas);
      }

      return presentarSalas(resultado);
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerPorId(salaId: string): Response {
    try {
      const sala = getSalaById(salaId);

      if (!sala) {
        return presentarError(
          new Error(`No se encontró ninguna sala con id «${salaId}».`),
          404,
        );
      }

      return presentarSala(sala);
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerChat(salaId: string): Response {
    try {
      const sala = getSalaById(salaId);

      if (!sala) {
        return presentarError(
          new Error(`No se encontró ninguna sala con id «${salaId}».`),
          404,
        );
      }

      const contexto = chatContextoRepository.obtenerPorEntidad(salaId, "sala");

      return presentarChatSala({
        salaId: sala.id,
        nombre: sala.nombre,
        tieneAgenteDedicado: sala.agenteXilaUbicado !== undefined,
        chat: contexto?.config,
      });
    } catch (error) {
      return presentarError(error);
    }
  },

  async enviarMensajeChat(salaId: string, request: Request): Promise<Response> {
    return chatController.enviarMensaje(request, salaId);
  },
};
