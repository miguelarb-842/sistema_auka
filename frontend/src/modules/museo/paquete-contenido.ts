import type { Museo } from "./types/museo.types";

import { museoLolitaSoriano } from "./data/paquete-lolita-soriano.data";

/**
 * Punto único de intercambio del contenido del museo.
 *
 * Para instalar Sistema Auka en otro museo:
 * 1. Creá un paquete de contenido que cumpla el contrato `Museo`.
 * 2. Reemplazá la exportación de abajo por ese paquete.
 *
 * Los componentes, páginas, servicios y el motor de respuestas no contienen
 * datos del museo y no necesitan modificarse.
 */
export const paqueteContenido: Museo = museoLolitaSoriano;
