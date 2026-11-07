export interface FiltrosSalas {
  termino?: string;
  conAgente?: boolean;
  destacadas?: number;
}

export function parsearFiltrosSalas(
  searchParams: URLSearchParams,
): FiltrosSalas {
  const termino = searchParams.get("q")?.trim() || undefined;
  const conAgenteParam = searchParams.get("conAgente");
  let conAgente: boolean | undefined = undefined;

  if (conAgenteParam === "true" || conAgenteParam === "1") {
    conAgente = true;
  } else if (conAgenteParam === "false" || conAgenteParam === "0") {
    conAgente = false;
  }

  const destacadasParam = Number(searchParams.get("destacadas"));
  const destacadas =
    Number.isInteger(destacadasParam) && destacadasParam > 0
      ? destacadasParam
      : undefined;

  return { termino, conAgente, destacadas };
}
