import type {
  ContextoChat,
  ResumenConversacion,
} from "../types/chat-api.types";
import type { ConfigChat, Sala } from "@/modules/museo/types/museo.types";

import { getMuseo } from "@/modules/museo/services/museo.service";

/**
 * Repositorio de lectura del paquete de contenido del museo.
 *
 * Traduce cualquier identificador público (conversación, personaje, sala,
 * agrupación o guía) al contexto completo requerido para armar el prompt
 * del modelo y hablar con el agente n8n.
 */
export interface ChatContextoRepository {
  obtenerPorId(identificador: string): ContextoChat | undefined;
  obtenerPorEntidad(
    identificador: string,
    tipo?: "sala" | "personaje" | "agrupacion" | "guia",
  ): ContextoChat | undefined;
  obtenerResumenPorId(identificador: string): ResumenConversacion | undefined;
  listarConversaciones(): readonly ResumenConversacion[];
}

function resumirConfig(
  config: ConfigChat,
  contexto: Pick<ContextoChat, "sala" | "ficha">,
): ResumenConversacion {
  return {
    id: config.id,
    tipo: config.tipo,
    nombreVisible: config.nombreVisible,
    etiquetaVisible: config.etiquetaVisible,
    avatar: config.avatar,
    ...contexto,
  };
}

function sintetizarAgenteParaSala(
  sala: Sala,
  base: { museo: { id: string; nombre: string } },
  avatarGuia?: string,
): ContextoChat {
  return {
    ...base,
    config: {
      id: `agente-sala-${sala.id}`,
      tipo: "agente-sala",
      nombreVisible: `Agente Xila · ${sala.nombre}`,
      etiquetaVisible: "Agente Xila de sala",
      avatar: avatarGuia ?? "/images/hero-xila.svg",
      bienvenida: {
        nino: `¡Hola! Estás en la ${sala.nombre}. ${sala.descripcion.nino} ¿Qué querés explorar?`,
        adolescente: `Bienvenido a la ${sala.nombre}. ${sala.descripcion.adolescente} ¿Qué te llama la atención de este espacio?`,
        adulto: `Le damos la bienvenida a la ${sala.nombre}. ${sala.descripcion.adulto} ¿En qué aspecto de esta sala desea profundizar?`,
      },
      preguntasSugeridas: {
        nino: [
          `¿De qué trata la ${sala.nombre}?`,
          "¿Qué puedo aprender en esta sala?",
        ],
        adolescente: [
          `¿Cuál es el propósito educativo de la ${sala.nombre}?`,
          "¿Qué piezas o relatos se destacan acá?",
        ],
        adulto: [
          `¿Cuál es la propuesta museográfica de la ${sala.nombre}?`,
          "¿Qué criterios de curaduría se aplican en esta sala?",
        ],
      },
      retos: {
        nino: [
          {
            id: `reto-${sala.id}-1`,
            titulo: `Explorador de ${sala.nombre}`,
            enunciado: `Descubrí cuál es la temática principal de ${sala.nombre}.`,
            pista:
              "Prestá atención a la descripción y a los personajes vinculados.",
          },
        ],
        adolescente: [],
        adulto: [],
      },
      conocimiento: {
        temasConocidos: [
          {
            id: `tema-${sala.id}`,
            titulo: `Descripción de ${sala.nombre}`,
            palabrasClave: [sala.id, sala.nombre.toLowerCase(), "sala"],
            respuesta: sala.descripcion,
          },
        ],
        temasNoConocidos: [
          "fechas exactas no documentadas",
          "precios",
          "horarios particulares",
        ],
        respuestaDesconocido: {
          nino: "Ese dato todavía no está confirmado por el museo. ¡Sigamos explorando lo que sí conocemos!",
          adolescente:
            "Esa información está marcada como por verificar en el archivo del museo.",
          adulto:
            "Dicha información no se encuentra documentada en el registro curatorial actual y permanece por verificar.",
        },
      },
    },
    sala: {
      id: sala.id,
      nombre: sala.nombre,
      descripcion: sala.descripcion,
      personajesRelacionados: sala.personajesRelacionados,
    },
  };
}

export const chatContextoRepository: ChatContextoRepository = {
  obtenerPorId(identificador: string): ContextoChat | undefined {
    if (!identificador || typeof identificador !== "string") {
      return undefined;
    }

    const idLimpio = identificador.trim().toLowerCase();
    const museo = getMuseo();
    const base = { museo: { id: museo.id, nombre: museo.nombre } };

    // 1. Guía general (por id o alias comunes)
    if (
      museo.guiaGeneral.id.toLowerCase() === idLimpio ||
      idLimpio === "guia" ||
      idLimpio === "guia-general" ||
      idLimpio === "general" ||
      idLimpio === "xila"
    ) {
      return { ...base, config: museo.guiaGeneral };
    }

    // 2. Búsqueda en salas (por id de agente o por id de sala)
    for (const sala of museo.salas) {
      if (sala.agenteXilaUbicado?.id.toLowerCase() === idLimpio) {
        return {
          ...base,
          config: sala.agenteXilaUbicado,
          sala: {
            id: sala.id,
            nombre: sala.nombre,
            descripcion: sala.descripcion,
            personajesRelacionados: sala.personajesRelacionados,
          },
        };
      }

      if (sala.id.toLowerCase() === idLimpio) {
        if (sala.agenteXilaUbicado) {
          return {
            ...base,
            config: sala.agenteXilaUbicado,
            sala: {
              id: sala.id,
              nombre: sala.nombre,
              descripcion: sala.descripcion,
              personajesRelacionados: sala.personajesRelacionados,
            },
          };
        }

        // Si la sala no tiene agente específico, sintetizamos uno de sala contextualizado
        return sintetizarAgenteParaSala(sala, base, museo.guiaGeneral.avatar);
      }
    }

    // 3. Búsqueda en personajes (por chat.id o por id de ficha)
    for (const personaje of museo.personajes) {
      if (
        personaje.chat.id.toLowerCase() === idLimpio ||
        personaje.id.toLowerCase() === idLimpio
      ) {
        return {
          ...base,
          config: personaje.chat,
          ficha: {
            id: personaje.id,
            nombre: personaje.nombre,
            tipo: "personaje",
            descripcion: personaje.descripcion,
            salasRelacionadas: personaje.salasRelacionadas,
          },
        };
      }
    }

    // 4. Búsqueda en agrupaciones (por chat.id o por id de agrupación)
    for (const agrupacion of museo.agrupacionesInvitadas) {
      if (
        agrupacion.chat.id.toLowerCase() === idLimpio ||
        agrupacion.id.toLowerCase() === idLimpio
      ) {
        return {
          ...base,
          config: agrupacion.chat,
          ficha: {
            id: agrupacion.id,
            nombre: agrupacion.nombre,
            tipo: "agrupacion",
            descripcion: agrupacion.descripcion,
            salasRelacionadas: [agrupacion.salaRelacionada],
          },
        };
      }
    }

    return undefined;
  },

  obtenerPorEntidad(identificador, tipo) {
    if (!identificador) {
      return undefined;
    }

    const idLimpio = identificador.trim().toLowerCase();
    const museo = getMuseo();
    const base = { museo: { id: museo.id, nombre: museo.nombre } };

    if (tipo === "guia") {
      return { ...base, config: museo.guiaGeneral };
    }

    if (tipo === "sala") {
      const sala = museo.salas.find(
        (s) =>
          s.id.toLowerCase() === idLimpio ||
          s.agenteXilaUbicado?.id.toLowerCase() === idLimpio,
      );

      if (sala) {
        if (sala.agenteXilaUbicado) {
          return {
            ...base,
            config: sala.agenteXilaUbicado,
            sala: {
              id: sala.id,
              nombre: sala.nombre,
              descripcion: sala.descripcion,
              personajesRelacionados: sala.personajesRelacionados,
            },
          };
        }

        return sintetizarAgenteParaSala(sala, base, museo.guiaGeneral.avatar);
      }
    }

    if (tipo === "personaje") {
      const p = museo.personajes.find(
        (item) =>
          item.id.toLowerCase() === idLimpio ||
          item.chat.id.toLowerCase() === idLimpio,
      );

      if (p) {
        return {
          ...base,
          config: p.chat,
          ficha: {
            id: p.id,
            nombre: p.nombre,
            tipo: "personaje",
            descripcion: p.descripcion,
            salasRelacionadas: p.salasRelacionadas,
          },
        };
      }
    }

    if (tipo === "agrupacion") {
      const a = museo.agrupacionesInvitadas.find(
        (item) =>
          item.id.toLowerCase() === idLimpio ||
          item.chat.id.toLowerCase() === idLimpio,
      );

      if (a) {
        return {
          ...base,
          config: a.chat,
          ficha: {
            id: a.id,
            nombre: a.nombre,
            tipo: "agrupacion",
            descripcion: a.descripcion,
            salasRelacionadas: [a.salaRelacionada],
          },
        };
      }
    }

    return this.obtenerPorId(identificador);
  },

  obtenerResumenPorId(identificador: string): ResumenConversacion | undefined {
    const contexto = this.obtenerPorId(identificador);

    if (!contexto) {
      return undefined;
    }

    return resumirConfig(contexto.config, {
      sala: contexto.sala
        ? { id: contexto.sala.id, nombre: contexto.sala.nombre }
        : undefined,
      ficha: contexto.ficha
        ? {
            id: contexto.ficha.id,
            nombre: contexto.ficha.nombre,
            tipo: contexto.ficha.tipo,
          }
        : undefined,
    });
  },

  listarConversaciones() {
    const museo = getMuseo();
    const resumenes: ResumenConversacion[] = [
      resumirConfig(museo.guiaGeneral, {}),
      ...museo.salas.flatMap((sala) =>
        sala.agenteXilaUbicado
          ? [
              resumirConfig(sala.agenteXilaUbicado, {
                sala: { id: sala.id, nombre: sala.nombre },
              }),
            ]
          : [],
      ),
      ...museo.personajes.map((personaje) =>
        resumirConfig(personaje.chat, {
          ficha: {
            id: personaje.id,
            nombre: personaje.nombre,
            tipo: "personaje",
          },
        }),
      ),
      ...museo.agrupacionesInvitadas.map((agrupacion) =>
        resumirConfig(agrupacion.chat, {
          ficha: {
            id: agrupacion.id,
            nombre: agrupacion.nombre,
            tipo: "agrupacion",
          },
        }),
      ),
    ];

    return resumenes;
  },
};
