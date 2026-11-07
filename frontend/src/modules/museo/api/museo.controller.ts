import { getGuiaGeneral, getMuseo } from "../services/museo.service";

import {
  presentarError,
  presentarGuiaGeneral,
  presentarInfoApi,
  presentarMuseo,
} from "./museo.presenter";

/**
 * Controller HTTP del museo y punto de entrada general de la API (MVC).
 */
export const museoController = {
  obtenerMuseo(): Response {
    try {
      return presentarMuseo(getMuseo());
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerGuiaGeneral(): Response {
    try {
      return presentarGuiaGeneral(getGuiaGeneral());
    } catch (error) {
      return presentarError(error);
    }
  },

  obtenerInfoApi(): Response {
    const museo = getMuseo();

    return presentarInfoApi({
      nombre: "Sistema Auka · API RESTful (MVC + Screaming Architecture)",
      version: "1.0.0",
      museo: {
        id: museo.id,
        nombre: museo.nombre,
      },
      arquitectura: {
        patron: "MVC (Model - View/Presenter - Controller)",
        organizacion: "Screaming Architecture por dominios modulares",
        modulos: ["chat-xila", "salas", "personajes", "museo", "configuracion"],
      },
      agenteIa: {
        plataforma: "n8n en Docker (puerto 5678 / webhook ngrok)",
        urlConfigurada:
          process.env.N8N_CHAT_WEBHOOK_URL ??
          "https://electable-fled-scoff.ngrok-free.dev/webhook/ee59e9c9-6515-41be-a10b-9a266e5d5965/chat",
        modelo: "Google Gemini",
        memoria: "Buffer por sessionId",
        inyeccionPrompt:
          "Dinámica según sala, personaje, agrupación o guía seleccionada por el usuario",
      },
      rutasDisponibles: {
        sistema: "GET /api",
        museo: "GET /api/museo",
        salas: {
          listar: "GET /api/salas(?q=&conAgente=)",
          detalle: "GET /api/salas/:salaId",
          chatConfig: "GET /api/salas/:salaId/chat",
          chatMensaje: "POST /api/salas/:salaId/chat",
        },
        personajes: {
          listar: "GET /api/personajes(?q=&sala=)",
          detalle: "GET /api/personajes/:personajeId",
          chatConfig: "GET /api/personajes/:personajeId/chat",
          chatMensaje: "POST /api/personajes/:personajeId/chat",
        },
        agrupaciones: {
          listar: "GET /api/agrupaciones(?q=&sala=)",
          detalle: "GET /api/agrupaciones/:agrupacionId",
          chatConfig: "GET /api/agrupaciones/:agrupacionId/chat",
          chatMensaje: "POST /api/agrupaciones/:agrupacionId/chat",
        },
        chat: {
          info: "GET /api/chat",
          listarConversaciones: "GET /api/chat/conversaciones",
          detalleConversacion: "GET /api/chat/conversaciones/:id",
          enviarMensaje: "POST /api/chat",
        },
      },
    });
  },
};
