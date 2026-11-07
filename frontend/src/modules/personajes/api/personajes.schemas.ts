export interface FiltrosPersonajes {
  termino?: string;
  salaId?: string;
}

export function parsearFiltrosPersonajes(
  searchParams: URLSearchParams,
): FiltrosPersonajes {
  const termino = searchParams.get("q")?.trim() || undefined;
  const salaId =
    searchParams.get("sala")?.trim() ||
    searchParams.get("salaId")?.trim() ||
    undefined;

  return { termino, salaId };
}
