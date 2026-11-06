import type { SalaId } from "@/types/ids.types";
import type { Personaje } from "../types/personaje.types";

import { personajes } from "../data/personajes.data";

export interface PersonajesRepository {
  obtenerTodos(): readonly Personaje[];
  obtenerPorId(id: string): Personaje | undefined;
  obtenerPorSala(salaId: SalaId): readonly Personaje[];
  buscar(termino: string): readonly Personaje[];
}

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const personajesRepository: PersonajesRepository = {
  obtenerTodos() {
    return personajes;
  },
  obtenerPorId(id) {
    return personajes.find((personaje) => personaje.id === id);
  },
  obtenerPorSala(salaId) {
    return personajes.filter((personaje) =>
      personaje.salasRelacionadas.includes(salaId),
    );
  },
  buscar(termino) {
    const consulta = normalizar(termino);

    if (!consulta) {
      return personajes;
    }

    return personajes.filter((personaje) => {
      const contenido = [
        personaje.nombre,
        personaje.alias ?? "",
        personaje.epoca,
        personaje.lugar,
        personaje.resumen,
        personaje.descripcion.adolescente,
        ...personaje.valores.map((valor) => valor.titulo),
      ].join(" ");

      return normalizar(contenido).includes(consulta);
    });
  },
};

export function getPersonajes(): readonly Personaje[] {
  return personajesRepository.obtenerTodos();
}

export function getPersonajeById(id: string): Personaje | undefined {
  return personajesRepository.obtenerPorId(id);
}

export function getPersonajesPorSala(salaId: SalaId): readonly Personaje[] {
  return personajesRepository.obtenerPorSala(salaId);
}

export function buscarPersonajes(termino: string): readonly Personaje[] {
  return personajesRepository.buscar(termino);
}
