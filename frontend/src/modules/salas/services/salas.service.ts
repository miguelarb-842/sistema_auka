import type { Sala } from "../types/sala.types";

import {
  getSalaById as getSalaByIdMuseo,
  getSalas as getSalasMuseo,
} from "@/modules/museo/services/museo.service";

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
    return getSalasMuseo();
  },
  obtenerPorId(id) {
    return getSalaByIdMuseo(id);
  },
  buscar(termino) {
    const consulta = normalizar(termino);
    const salas = getSalasMuseo();

    if (!consulta) {
      return salas;
    }

    return salas.filter((sala) => {
      const contenido = [
        sala.nombre,
        sala.descripcion.nino,
        sala.descripcion.adolescente,
        sala.descripcion.adulto,
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

export function getSalasDestacadas(cantidad = 6): readonly Sala[] {
  return salasRepository.obtenerTodas().slice(0, cantidad);
}

export function buscarSalas(termino: string): readonly Sala[] {
  return salasRepository.buscar(termino);
}
