import { chatService } from "../services/chat.service";
import { ChatApiError } from "../services/chat.errors";

import { validarPeticionChat } from "./chat.schemas";
import {
  presentarConversacion,
  presentarConversaciones,
  presentarContexto,
  presentarError,
  presentarInfoApi,
  presentarRespuestaChat,
} from "./chat.presenter";

/**
 * Controller HTTP del módulo de chat (MVC).
 *
 * Valida la entrada HTTP, llama a los casos de uso del servicio
 * y delega la respuesta en el presenter.
 */
export const chatController = {
  async enviarMensaje(
    request: Request,
    identificadorPredeterminado?: string,
  ): Promise<Response> {
    try {
      const contentType = request.headers.get("content-type") ?? "";

      if (!contentType.toLowerCase().includes("application/json")) {
        throw new ChatApiError(
          "SOLICITUD_INVALIDA",
          "Enviá el cuerpo de la petición como application/json.",
          415,
        );
      }

      let payload: unknown;

      try {
        payload = await request.json();
      } catch {
        throw new ChatApiError(
          "SOLICITUD_INVALIDA",
          "El cuerpo de la petición no contiene JSON válido.",
          400,
        );
      }

      const validacion = validarPeticionChat(
        payload,
        identificadorPredeterminado,
      );

      if (!validacion.ok) {
        throw new ChatApiError(
          "SOLICITUD_INVALIDA",
          "Revisá los datos enviados.",
          400,
          validacion.errores,
        );
      }

      const datos = await chatService.enviarMensaje(validacion.datos);

      return presentarRespuestaChat(datos);
    } catch (error) {
      return presentarError(error);
    }
  },

  listarConversaciones(): Response {
    try {
      return presentarConversaciones(chatService.listarConversaciones());
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerConversacion(id: string): Response {
    try {
      return presentarConversacion(chatService.obtenerConversacion(id));
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerContexto(id: string): Response {
    try {
      return presentarContexto(chatService.obtenerContexto(id));
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerInfo(): Response {
    return presentarInfoApi({
      nombre: "API de conversaciones y agentes de Sistema Auka",
      version: "1.0.0",
      agente: {
        plataforma: "n8n (Docker en puerto 5678 / ngrok)",
        memoria: "Window Buffer Memory por sessionId",
        modelo: "Google Gemini",
      },
      endpoints: {
        listarConversaciones: "GET /api/chat/conversaciones",
        detalleConversacion: "GET /api/chat/conversaciones/:id",
        enviarMensaje: "POST /api/chat",
        chatSala: "POST /api/salas/:salaId/chat",
        chatPersonaje: "POST /api/personajes/:personajeId/chat",
        chatAgrupacion: "POST /api/agrupaciones/:agrupacionId/chat",
      },
    });
  },
};
