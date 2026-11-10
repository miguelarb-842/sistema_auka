const CLAVE_MOVIMIENTO = "auka:movimiento";

export type AnimeModule = typeof import("animejs");

/**
 * Las animaciones de Anime.js solo se activan cuando el visitante eligió
 * explícitamente la experiencia completa. La preferencia del sistema no las
 * activa por sí sola: solo decide el comportamiento de las transiciones CSS.
 */
export function animacionesActivas(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(CLAVE_MOVIMIENTO) === "completo";
  } catch {
    return false;
  }
}

let animePromise: Promise<AnimeModule> | null = null;

/**
 * Carga Anime.js en un chunk aparte. Así las visitas con movimiento reducido,
 * automático o sin preferencia no descargan la librería.
 */
export function cargarAnime(): Promise<AnimeModule> {
  animePromise ??= import("animejs");

  return animePromise;
}
