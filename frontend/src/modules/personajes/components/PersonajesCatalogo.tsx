"use client";

import type { FichaConChat } from "../types/personaje.types";

import { useDeferredValue, useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { AgrupacionCard } from "./AgrupacionCard";
import { PersonajeCard } from "./PersonajeCard";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { SearchInput } from "@/components/ui/molecules/SearchInput";

const filtros = [
  { id: "todos", etiqueta: "Todas las voces", tipo: null },
  { id: "personaje", etiqueta: "Personajes", tipo: "personaje" },
  { id: "agrupacion", etiqueta: "Agrupaciones invitadas", tipo: "agrupacion" },
] as const;

type FiltroId = (typeof filtros)[number]["id"];

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function PersonajesCatalogo({
  fichas,
}: {
  fichas: readonly FichaConChat[];
}) {
  const [consulta, setConsulta] = useState("");
  const [filtro, setFiltro] = useState<FiltroId>("todos");
  const consultaDiferida = useDeferredValue(consulta);

  const filtradas = useMemo(() => {
    const termino = normalizar(consultaDiferida.trim());
    const configuracion = filtros.find((item) => item.id === filtro);

    return fichas.filter((ficha) => {
      const coincideFiltro =
        !configuracion?.tipo || ficha.tipo === configuracion.tipo;
      const contenido = normalizar(
        [
          ficha.nombre,
          ficha.etiquetaVisible,
          ficha.descripcion.nino,
          ficha.descripcion.adolescente,
          ficha.descripcion.adulto,
        ].join(" "),
      );
      const coincideBusqueda = !termino || contenido.includes(termino);

      return coincideFiltro && coincideBusqueda;
    });
  }, [consultaDiferida, fichas, filtro]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          aria-label="Filtrar voces del museo"
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
          label="Buscar personajes y agrupaciones"
          placeholder="Buscar por nombre o descripción…"
          value={consulta}
          onChange={setConsulta}
        />
      </div>

      <p className="mt-4 text-xs font-medium text-muted" role="status">
        {filtradas.length}{" "}
        {filtradas.length === 1 ? "ficha encontrada" : "fichas encontradas"}
        {consulta.trim() ? ` para «${consulta.trim()}»` : ""}
      </p>

      {filtradas.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtradas.map((ficha) =>
            ficha.tipo === "agrupacion" ? (
              <AgrupacionCard key={ficha.id} agrupacion={ficha} />
            ) : (
              <PersonajeCard key={ficha.id} personaje={ficha} />
            ),
          )}
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
          description="Probá con otra palabra o volvé a «Todas las voces»."
          icon={SearchX}
          title="No encontramos esa ficha"
        />
      )}
    </div>
  );
}
