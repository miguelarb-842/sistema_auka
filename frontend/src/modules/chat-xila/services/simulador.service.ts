import type { PerfilId } from "@/types/perfil.types";
import type {
  ContextoConversacion,
  IntencionConversacion,
  MotorConversacionXila,
  ReglaRespuesta,
  RespuestaXila,
} from "../types/chat.types";

export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[¿?¡!.,;:()"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contieneAlguna(texto: string, opciones: readonly string[]): boolean {
  return opciones.some((opcion) => texto.includes(normalizarTexto(opcion)));
}

function seleccionarRegla(
  texto: string,
  reglas: readonly ReglaRespuesta[],
): ReglaRespuesta | undefined {
  const normalizado = normalizarTexto(texto);

  const coincidencias = reglas
    .map((regla) => {
      const puntaje = regla.palabrasClave.reduce((total, palabra) => {
        const clave = normalizarTexto(palabra);

        return normalizado.includes(clave) ? total + clave.length : total;
      }, 0);

      return { regla, puntaje };
    })
    .filter((item) => item.puntaje > 0)
    .sort((a, b) => b.puntaje - a.puntaje);

  return coincidencias[0]?.regla;
}

const introduccionReto: Record<PerfilId, string> = {
  nino: "¡Uy, me encantan los retos! Aquí va uno para pensar:",
  adolescente: "Va un reto para pensar en serio:",
  adulto: "Le propongo un ejercicio de análisis:",
};

const introduccionAyuda: Record<PerfilId, string> = {
  nino: "Podés pedirme un reto, una pista, o preguntarme por los temas de esta sala. ¿Qué querés descubrir?",
  adolescente:
    "Puedo proponerte un reto, darte una pista sobre el último desafío o conversar sobre los contenidos de la sala. ¿Qué elegís?",
  adulto:
    "Puede solicitar un reto, pedir una pista del ejercicio actual o consultar los ejes documentados de la sala. ¿Cómo desea continuar?",
};

const sinRetoPrevio: Record<PerfilId, string> = {
  nino: "Todavía no te propuse un reto. Escribí “reto” y te doy uno. ¿Te animás?",
  adolescente:
    "Todavía no hay un reto activo. Pedime uno con la palabra “reto” y te doy una pista después.",
  adulto:
    "Aún no se ha planteado un reto en esta conversación. Solicítelo y luego podré ofrecerle una pista.",
};

export class SimuladorXila implements MotorConversacionXila {
  responder(contexto: ContextoConversacion): RespuestaXila {
    const { asistente, perfil, texto, indiceReto } = contexto;
    const normalizado = normalizarTexto(texto);

    if (!normalizado) {
      return {
        contenido: introduccionAyuda[perfil],
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
        intencion: "ayuda",
      };
    }

    if (
      contieneAlguna(normalizado, ["reto", "desafio", "desafío", "ejercicio"])
    ) {
      const retosPerfil = asistente.retos[perfil];

      if (retosPerfil.length > 0) {
        const indice = indiceReto % retosPerfil.length;
        const reto = retosPerfil[indice];

        return {
          contenido: introduccionReto[perfil],
          tipo: "reto",
          reto: {
            id: reto.id,
            titulo: reto.titulo,
            enunciado: reto.enunciado,
            pista: reto.pista,
          },
          siguienteIndiceReto: indiceReto + 1,
          intencion: "reto",
        };
      }
    }

    if (
      contieneAlguna(normalizado, [
        "pista",
        "ayuda",
        "no se",
        "no sé",
        "no entiendo",
      ])
    ) {
      if (indiceReto <= 0) {
        return {
          contenido: sinRetoPrevio[perfil],
          tipo: "texto",
          siguienteIndiceReto: indiceReto,
          intencion: "pista",
        };
      }

      const retosPerfil = asistente.retos[perfil];
      const retoAnterior = retosPerfil[(indiceReto - 1) % retosPerfil.length];

      return {
        contenido:
          perfil === "nino"
            ? `Pista para «${retoAnterior.titulo}»: ${retoAnterior.pista}`
            : `Pista del ejercicio «${retoAnterior.titulo}»: ${retoAnterior.pista}`,
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
        intencion: "pista",
      };
    }

    const regla = seleccionarRegla(texto, asistente.reglas);

    if (regla) {
      return {
        contenido: regla.respuestas[perfil],
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
        intencion: regla.intencion,
      };
    }

    return {
      contenido: asistente.fallback[perfil],
      tipo: "texto",
      siguienteIndiceReto: indiceReto,
      intencion: "fuera-de-tema" satisfies IntencionConversacion,
    };
  }
}

export const simuladorXila: MotorConversacionXila = new SimuladorXila();
