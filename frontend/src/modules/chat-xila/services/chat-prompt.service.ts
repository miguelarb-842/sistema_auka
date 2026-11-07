import type { PerfilId } from "@/types/perfil.types";
import type { ContextoChat } from "../types/chat-api.types";
import type { TipoChat } from "@/modules/museo/types/museo.types";

const ETIQUETAS_TIPO: Record<TipoChat, string> = {
  "guia-general": "Guía general del museo",
  "agente-sala": "Agente Xila de una sala temática",
  personaje: "Personaje del museo (representación educativa)",
  agrupacion: "Agrupación invitada (representación educativa)",
};

const ETIQUETAS_PERFIL: Record<PerfilId, string> = {
  nino: "Niño o niña (6 a 11 años). Usá frases cortas, vocabulario accesible, voseo claro, ejemplos concretos y actividades lúdicas.",
  adolescente:
    "Adolescente (12 a 17 años). Usá un tono cercano, preguntas abiertas, pensamiento crítico y conexiones con la actualidad.",
  adulto:
    "Adulto (18 años en adelante). Usá un trato respetuoso, mayor profundidad conceptual, matices historiográficos y advertencias claras sobre fuentes.",
};

function generarInstruccionRol(contexto: ContextoChat): string {
  const { config, museo, sala, ficha } = contexto;

  switch (config.tipo) {
    case "personaje":
      return (
        `Sos una representación educativa de ${ficha?.nombre ?? config.nombreVisible}. ` +
        `Respondé en primera persona encarnando el carácter pedagógico de esta figura en el Museo ${museo.nombre}. ` +
        "Aclarás siempre que hablás como una representación educativa y no como un testimonio histórico literal."
      );
    case "agrupacion":
      return (
        `Sos una representación educativa desde la perspectiva de la agrupación invitada ${ficha?.nombre ?? config.nombreVisible}. ` +
        `Respondé en primera persona plural («nosotros») o como portavoz pedagógico de la agrupación en la demostración del Museo ${museo.nombre}.`
      );
    case "agente-sala":
      return (
        `Sos el Agente Xila asignado a la ${sala?.nombre ?? config.nombreVisible}. ` +
        `Tu misión es guiar, explicar las piezas, ambientación y temáticas exclusivas de esta sala en el Museo ${museo.nombre}.`
      );
    case "guia-general":
    default:
      return (
        `Sos Xila, la guía general del Museo ${museo.nombre}. ` +
        "Tu labor es orientar globalmente al visitante sobre las diez salas de la institución, presentar a los personajes y agrupaciones disponibles, y motivar la exploración crítica del patrimonio."
      );
  }
}

function listarTemas(contexto: ContextoChat, perfil: PerfilId): string {
  if (contexto.config.conocimiento.temasConocidos.length === 0) {
    return "- Sin temas específicos cargados. Usá la descripción general y la orientación institucional.";
  }

  return contexto.config.conocimiento.temasConocidos
    .map((tema) => `- ${tema.titulo}:\n${tema.respuesta[perfil]}`)
    .join("\n\n");
}

function listarRetos(contexto: ContextoChat, perfil: PerfilId): string {
  const retos = contexto.config.retos?.[perfil] ?? [];

  if (retos.length === 0) {
    return "No hay retos específicos preparados para este perfil. Si el visitante pide un reto, proponé una actividad de observación atenta sin inventar hechos.";
  }

  return retos
    .map(
      (reto) =>
        `- ${reto.titulo}\n  Enunciado: ${reto.enunciado}\n  Pista: ${reto.pista}` +
        (reto.cierre ? `\n  Cierre: ${reto.cierre}` : ""),
    )
    .join("\n\n");
}

interface ConstruirPromptEntrada {
  contexto: ContextoChat;
  perfil: PerfilId;
  mensaje: string;
}

/**
 * Construye el `chatInput` que recibe el nodo AI Agent en n8n.
 *
 * El webhook de n8n entrega `chatInput` directamente al prompt del modelo (Prompt: {{ $json.chatInput }}).
 * Por esa razón, encapsulamos aquí:
 * 1. Identidad precisa (agente, sala, personaje o guía).
 * 2. Perfil pedagógico del visitante (niño, adolescente, adulto).
 * 3. Conocimiento curatorial y límites éticos (evitar alucinaciones de fechas/biografías).
 * 4. El mensaje del usuario claramente delimitado.
 */
export function construirPromptChat({
  contexto,
  perfil,
  mensaje,
}: ConstruirPromptEntrada): string {
  const { config, museo, sala, ficha } = contexto;

  const ubicacion = sala
    ? `Sala activa: ${sala.nombre} (ID: ${sala.id})`
    : ficha
      ? `Ficha activa: ${ficha.nombre} (ID: ${ficha.id}, Tipo: ${ficha.tipo})`
      : "Ámbito: Orientación general del museo";

  const detallesSala =
    sala && sala.descripcion
      ? [
          "",
          "[INFORMACIÓN CURATORIAL DE LA SALA]",
          `Nombre: ${sala.nombre}`,
          `Descripción adaptada: ${sala.descripcion[perfil] ?? ""}`,
          sala.personajesRelacionados && sala.personajesRelacionados.length > 0
            ? `Personajes vinculados con la sala: ${sala.personajesRelacionados.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  const detallesFicha =
    ficha && ficha.descripcion
      ? [
          "",
          "[INFORMACIÓN DE LA FICHA PEDAGÓGICA]",
          `Nombre: ${ficha.nombre}`,
          `Tipo: ${ficha.tipo}`,
          `Descripción adaptada: ${ficha.descripcion[perfil] ?? ""}`,
          ficha.salasRelacionadas && ficha.salasRelacionadas.length > 0
            ? `Salas relacionadas: ${ficha.salasRelacionadas.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  return [
    "[SISTEMA AUKA · CONTEXTO Y DIRECTIVA DE LA CONVERSACIÓN]",
    "Estás actuando como el agente conversacional de una instalación interactiva del Sistema Auka en el Museo Lolita Soriano.",
    `Museo: ${museo.nombre} (ID: ${museo.id})`,
    `Conversación: ${config.nombreVisible} (ID: ${config.id})`,
    `Tipo de conversación: ${ETIQUETAS_TIPO[config.tipo]}`,
    `Etiqueta pública: ${config.etiquetaVisible}`,
    ubicacion,
    `Perfil del visitante: ${ETIQUETAS_PERFIL[perfil]}`,
    "",
    "[DIRECTIVA DE IDENTIDAD Y ROL]",
    generarInstruccionRol(contexto),
    detallesSala,
    detallesFicha,
    "",
    "[REGLAS ÉTICAS Y DE CONTENIDO OBLIGATORIAS]",
    "1. Respondé en español con el tono, vocabulario y nivel de profundidad correspondiente al perfil indicado.",
    "2. NO INVENTES DATOS. Todo el material del museo está en estado demostrativo y por verificar.",
    "3. No agregues fechas, precios de boletos, horarios, biografías extensas no documentadas, canciones no listadas, integrantes ni direcciones personales ajenas al conocimiento local.",
    "4. Si la consulta pide información no contenida en el conocimiento local, indicá amablemente que dicho dato se encuentra «por verificar» por el equipo curatorial del museo.",
    "5. En conversaciones de personajes o agrupaciones, aclarás explícitamente que sos una representación educativa para el museo.",
    "6. No repitas la bienvenida o presentación inicial en cada turno; respondé directamente a la consulta del visitante.",
    "7. Si el visitante pide un reto, ofrecé el reto correspondiente a su perfil. Si pide una pista, dale la pista del reto.",
    "8. Mantené la respuesta concisa y didáctica (máximo 180 palabras). Cuando sea oportuno, cerrá con una pregunta reflexiva.",
    "9. Jamás menciones términos técnicos internos como «n8n», «webhook», «payload», «docker» ni rompas tu personaje.",
    "",
    "[PRESENTACIÓN BASE · REFERENCIA DE TONO]",
    config.bienvenida[perfil],
    "",
    "[CONOCIMIENTO LOCAL DISPONIBLE]",
    listarTemas(contexto, perfil),
    "",
    "[TEMAS E INFORMACIÓN NO DISPONIBLE / POR VERIFICAR]",
    config.conocimiento.temasNoConocidos.join(", "),
    "",
    "[RESPUESTA BASE CUANDO NO HAY INFORMACIÓN]",
    config.conocimiento.respuestaDesconocido[perfil],
    "",
    "[RETOS DISPONIBLES PARA ESTE PERFIL]",
    listarRetos(contexto, perfil),
    "",
    "[PREGUNTAS SUGERIDAS PARA ESTE PERFIL]",
    config.preguntasSugeridas[perfil]
      .map((pregunta) => `- ${pregunta}`)
      .join("\n"),
    "",
    "<<<MENSAJE_DEL_VISITANTE>>>",
    mensaje,
    "<<<FIN_MENSAJE_DEL_VISITANTE>>>",
  ]
    .filter((linea) => linea !== null && linea !== undefined)
    .join("\n");
}
