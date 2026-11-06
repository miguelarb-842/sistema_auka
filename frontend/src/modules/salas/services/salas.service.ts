import type { Sala } from "../types/sala.types";

import { salas } from "../data/salas.data";

export interface SalasRepository {
  obtenerTodas(): readonly Sala[];
  obtenerPorId(id: string): Sala | undefined;
  buscar(termino: string): readonly Sala[];
}

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const salasRepository: SalasRepository = {
  obtenerTodas() {
    return salas;
  },
  obtenerPorId(id) {
    return salas.find((sala) => sala.id === id);
  },
  buscar(termino) {
    const consulta = normalizar(termino);

    if (!consulta) {
      return salas;
    }

    return salas.filter((sala) => {
      const contenido = [
        sala.nombre,
        sala.tema,
        sala.resumen,
        sala.descripcion.adolescente,
        ...sala.bloques.map(
          (bloque) => `${bloque.titulo} ${bloque.contenido.adolescente}`,
        ),
      ].join(" ");

      return normalizar(contenido).includes(consulta);
    });
  },
};

export function getSalas(): readonly Sala[] {
  return salasRepository.obtenerTodas();
}

export function getSalaById(id: string): Sala | undefined {
  return salasRepository.obtenerPorId(id);
}

export function getSalasDestacadas(): readonly Sala[] {
  return salasRepository.obtenerTodas().slice(0, 3);
}

export function buscarSalas(termino: string): readonly Sala[] {
  return salasRepository.buscar(termino);
}
