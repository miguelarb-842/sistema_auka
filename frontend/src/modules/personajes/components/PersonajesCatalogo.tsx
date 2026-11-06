"use client";

import type { Personaje } from "../types/personaje.types";

import { useDeferredValue, useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { PersonajeCard } from "./PersonajeCard";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { SearchInput } from "@/components/ui/molecules/SearchInput";

const filtros = [
  { id: "todos", etiqueta: "Todos", tipo: null },
  { id: "historico", etiqueta: "Figuras históricas", tipo: "historico" },
  { id: "colectivo", etiqueta: "Pueblos originarios", tipo: "colectivo" },
  { id: "cultural", etiqueta: "Figuras culturales", tipo: "cultural" },
] as const;

type FiltroId = (typeof filtros)[number]["id"];

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function PersonajesCatalogo({
  personajes,
}: {
  personajes: readonly Personaje[];
}) {
  const [consulta, setConsulta] = useState("");
  const [filtro, setFiltro] = useState<FiltroId>("todos");
  const consultaDiferida = useDeferredValue(consulta);

  const filtrados = useMemo(() => {
    const termino = normalizar(consultaDiferida.trim());
    const configuracion = filtros.find((item) => item.id === filtro);

    return personajes.filter((personaje) => {
      const coincideFiltro =
        !configuracion?.tipo || personaje.tipo === configuracion.tipo;
      const contenido = normalizar(
        [
          personaje.nombre,
          personaje.alias ?? "",
          personaje.epoca,
          personaje.lugar,
          personaje.resumen,
        ].join(" "),
      );
      const coincideBusqueda = !termino || contenido.includes(termino);

      return coincideFiltro && coincideBusqueda;
    });
  }, [consultaDiferida, filtro, personajes]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          aria-label="Filtrar personajes por tipo"
          className="auka-scroll flex gap-2 overflow-x-auto pb-1"
          role="group"
        >
          {filtros.map((item) => (
            <button
              key={item.id}
              aria-pressed={filtro === item.id}
              className={
                filtro === item.id
                  ? "shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors"
                  : "shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              }
              type="button"
              onClick={() => setFiltro(item.id)}
            >
              {item.etiqueta}
            </button>
          ))}
        </div>

        <SearchInput
          className="w-full lg:max-w-xs"
          label="Buscar personajes"
          placeholder="Buscar por nombre, época o lugar…"
          value={consulta}
          onChange={setConsulta}
        />
      </div>

      <p className="mt-4 text-xs font-medium text-muted" role="status">
        {filtrados.length}{" "}
        {filtrados.length === 1 ? "ficha encontrada" : "fichas encontradas"}
        {consulta.trim() ? ` para «${consulta.trim()}»` : ""}
      </p>

      {filtrados.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filtrados.map((personaje) => (
            <PersonajeCard key={personaje.id} personaje={personaje} />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <ButtonLink
              href="/personajes"
              variant="outline"
              onClick={() => {
                setConsulta("");
                setFiltro("todos");
              }}
            >
              Limpiar filtros
            </ButtonLink>
          }
          className="mt-6"
          description="Probá con otra palabra o volvé a «Todos». Las fichas incluyen figuras históricas, pueblos originarios y una figura cultural vinculada a las fiestas patronales."
          icon={SearchX}
          title="No encontramos ese personaje"
        />
      )}
    </div>
  );
}
