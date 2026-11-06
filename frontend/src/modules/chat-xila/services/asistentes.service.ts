import type { AsistenteXila } from "../types/chat.types";

import { asistentes } from "../data/asistentes.data";

export interface AsistentesRepository {
  obtenerTodos(): readonly AsistenteXila[];
  obtenerPorId(id: string): AsistenteXila | undefined;
  obtenerPorSala(salaId: string): AsistenteXila | undefined;
}

export const asistentesRepository: AsistentesRepository = {
  obtenerTodos() {
    return asistentes;
  },
  obtenerPorId(id) {
    return asistentes.find((asistente) => asistente.id === id);
  },
  obtenerPorSala(salaId) {
    return asistentes.find((asistente) => asistente.salaId === salaId);
  },
};

export function getAsistentes(): readonly AsistenteXila[] {
  return asistentesRepository.obtenerTodos();
}

export function getAsistenteById(id: string): AsistenteXila | undefined {
  return asistentesRepository.obtenerPorId(id);
}

export function getAsistentePorSala(salaId: string): AsistenteXila | undefined {
  return asistentesRepository.obtenerPorSala(salaId);
}
