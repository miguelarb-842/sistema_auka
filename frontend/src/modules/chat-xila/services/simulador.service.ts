import type {
  ContenidoPorPerfil,
  TemaConocido,
} from "@/modules/museo/types/museo.types";
import type {
  EntradaChat,
  MotorRespuestas,
  RespuestaChat,
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

function contieneAlguna(
  textoNormalizado: string,
  opciones: readonly string[],
): boolean {
  return opciones.some((opcion) =>
    textoNormalizado.includes(normalizarTexto(opcion)),
  );
}

function seleccionarTema(
  textoNormalizado: string,
  temas: readonly TemaConocido[],
): TemaConocido | undefined {
  const coincidencias = temas
    .map((tema) => {
      const puntaje = tema.palabrasClave.reduce((total, palabra) => {
        const clave = normalizarTexto(palabra);

        return textoNormalizado.includes(clave) ? total + clave.length : total;
      }, 0);

      return { tema, puntaje };
    })
    .filter((item) => item.puntaje > 0)
    .sort((a, b) => b.puntaje - a.puntaje);

  return coincidencias[0]?.tema;
}

const introduccionReto: ContenidoPorPerfil = {
  nino: "¡Uy, me encantan los retos! Aquí va uno para pensar:",
  adolescente: "Va un reto para pensar en serio:",
  adulto: "Le propongo un ejercicio de análisis:",
};

const introduccionAyuda: ContenidoPorPerfil = {
  nino: "Podés pedirme un reto, una pista o preguntarme por los temas de esta conversación. ¿Qué querés descubrir?",
  adolescente:
    "Puedo proponerte un reto, darte una pista del último desafío o conversar sobre los temas disponibles. ¿Qué elegís?",
  adulto:
    "Puede solicitar un reto, pedir una pista del ejercicio actual o consultar los temas disponibles en esta conversación. ¿Cómo desea continuar?",
};

const sinRetoPrevio: ContenidoPorPerfil = {
  nino: "Todavía no te propuse un reto. Escribí «reto» y te doy uno. ¿Te animás?",
  adolescente:
    "Todavía no hay un reto activo. Pedime uno con la palabra «reto» y después te doy una pista.",
  adulto:
    "Aún no se ha planteado un reto en esta conversación. Solicítelo y luego podré ofrecerle una pista.",
};

const sinRetosPreparados: ContenidoPorPerfil = {
  nino: "Esta conversación todavía no tiene retos preparados. Podés seguir preguntando por la información disponible.",
  adolescente:
    "Esta conversación no tiene retos preparados por ahora. Podés seguir consultando los temas disponibles.",
  adulto:
    "Esta conversación no dispone de retos preparados en este momento. Puede continuar consultando los temas disponibles.",
};

export class SimuladorRespuestas implements MotorRespuestas {
  async responder({
    config,
    perfil,
    texto,
    indiceReto,
  }: EntradaChat): Promise<RespuestaChat> {
    const normalizado = normalizarTexto(texto);

    if (!normalizado) {
      return {
        contenido: introduccionAyuda[perfil],
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
      };
    }

    if (
      contieneAlguna(normalizado, ["reto", "desafio", "desafío", "ejercicio"])
    ) {
      const retosPerfil = config.retos?.[perfil] ?? [];

      if (retosPerfil.length === 0) {
        return {
          contenido: sinRetosPreparados[perfil],
          tipo: "texto",
          siguienteIndiceReto: indiceReto,
        };
      }

      const indice = indiceReto % retosPerfil.length;
      const reto = retosPerfil[indice];

      return {
        contenido: introduccionReto[perfil],
        tipo: "reto",
        reto,
        siguienteIndiceReto: indiceReto + 1,
      };
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
      const retosPerfil = config.retos?.[perfil] ?? [];

      if (indiceReto <= 0 || retosPerfil.length === 0) {
        return {
          contenido: sinRetoPrevio[perfil],
          tipo: "texto",
          siguienteIndiceReto: indiceReto,
        };
      }

      const retoAnterior = retosPerfil[(indiceReto - 1) % retosPerfil.length];

      return {
        contenido:
          perfil === "nino"
            ? `Pista para «${retoAnterior.titulo}»: ${retoAnterior.pista}`
            : `Pista del ejercicio «${retoAnterior.titulo}»: ${retoAnterior.pista}`,
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
      };
    }

    /*
     * Los temas desconocidos se evalúan antes que los conocidos.
     * Así una pregunta por precios, fechas, biografías o repertorios no
     * recibe una respuesta temática que podría sonar a dato verificado.
     */
    if (contieneAlguna(normalizado, config.conocimiento.temasNoConocidos)) {
      return {
        contenido: config.conocimiento.respuestaDesconocido[perfil],
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
      };
    }

    const tema = seleccionarTema(
      normalizado,
      config.conocimiento.temasConocidos,
    );

    if (tema) {
      return {
        contenido: tema.respuesta[perfil],
        tipo: "texto",
        siguienteIndiceReto: indiceReto,
      };
    }

    return {
      contenido: config.conocimiento.respuestaDesconocido[perfil],
      tipo: "texto",
      siguienteIndiceReto: indiceReto,
    };
  }
}

export const motorRespuestas: MotorRespuestas = new SimuladorRespuestas();
