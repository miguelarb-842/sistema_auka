import type {
  PeticionChat,
  ResumenConversacion,
  RespuestaChatApi,
  ContextoChat,
} from "../types/chat-api.types";

import { randomUUID } from "node:crypto";

import { chatContextoRepository } from "../repositories/chat-context.repository";

import { construirPromptChat } from "./chat-prompt.service";
import { ChatApiError } from "./chat.errors";
import { n8nChatService } from "./n8n-chat.service";

/**
 * Caso de uso de la conversación.
 *
 * Resuelve el contexto del museo a partir del agente, sala, personaje o chat,
 * construye el prompt de sistema y delega la ejecución en n8n Docker.
 */
export interface ChatService {
  enviarMensaje(peticion: PeticionChat): Promise<RespuestaChatApi>;
  listarConversaciones(): readonly ResumenConversacion[];
  obtenerConversacion(id: string): ResumenConversacion;
  obtenerContexto(id: string): ContextoChat;
}

class ChatServiceImpl implements ChatService {
  async enviarMensaje(peticion: PeticionChat): Promise<RespuestaChatApi> {
    const objetivo =
      peticion.conversacionId ||
      peticion.salaId ||
      peticion.personajeId ||
      peticion.agrupacionId ||
      peticion.chatId ||
      peticion.agenteId;

    if (!objetivo) {
      throw new ChatApiError(
        "SOLICITUD_INVALIDA",
        "Debés indicar un identificador de conversación, sala o personaje.",
        400,
      );
    }

    const contexto = chatContextoRepository.obtenerPorId(objetivo);

    if (!contexto) {
      throw new ChatApiError(
        "CONVERSACION_NO_ENCONTRADA",
        `No se encontró ninguna conversación, personaje, sala o agente con el identificador «${objetivo}».`,
        404,
      );
    }

    const sesionId = peticion.sesionId?.trim() || randomUUID();
    const chatInput = construirPromptChat({
      contexto,
      perfil: peticion.perfil,
      mensaje: peticion.mensaje,
    });

    const contenido = await n8nChatService.enviarMensaje({
      sesionId,
      chatInput,
      conversacionId: contexto.config.id,
      perfil: peticion.perfil,
    });

    return {
      conversacionId: contexto.config.id,
      sesionId,
      respuesta: {
        contenido,
        tipo: "texto",
        timestamp: Date.now(),
      },
    };
  }

  listarConversaciones(): readonly ResumenConversacion[] {
    return chatContextoRepository.listarConversaciones();
  }

  obtenerConversacion(id: string): ResumenConversacion {
    const resumen = chatContextoRepository.obtenerResumenPorId(id);

    if (!resumen) {
      throw new ChatApiError(
        "CONVERSACION_NO_ENCONTRADA",
        `No existe una conversación con el identificador «${id}».`,
        404,
      );
    }

    return resumen;
  }

  obtenerContexto(id: string): ContextoChat {
    const contexto = chatContextoRepository.obtenerPorId(id);

    if (!contexto) {
      throw new ChatApiError(
        "CONVERSACION_NO_ENCONTRADA",
        `No se encontró el contexto para «${id}».`,
        404,
      );
    }

    return contexto;
  }
}

export const chatService: ChatService = new ChatServiceImpl();
