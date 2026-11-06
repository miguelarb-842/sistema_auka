"use client";

import type { Sala } from "../types/sala.types";

import { useDeferredValue, useMemo, useState } from "react";
import { Landmark, SearchX } from "lucide-react";

import { SalaCard } from "./SalaCard";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { SearchInput } from "@/components/ui/molecules/SearchInput";

const filtros = [
  { id: "todas", etiqueta: "Todas las salas", tono: null },
  { id: "tradiciones", etiqueta: "Tradiciones", tono: "warning" },
  { id: "caciques", etiqueta: "Pueblos originarios", tono: "accent" },
  { id: "resistencia", etiqueta: "Resistencia", tono: "danger" },
] as const;

type FiltroId = (typeof filtros)[number]["id"];

function normalizar(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function SalasCatalogo({ salas }: { salas: readonly Sala[] }) {
  const [consulta, setConsulta] = useState("");
  const [filtro, setFiltro] = useState<FiltroId>("todas");
  const consultaDiferida = useDeferredValue(consulta);

  const filtradas = useMemo(() => {
    const termino = normalizar(consultaDiferida.trim());
    const configuracion = filtros.find((item) => item.id === filtro);

    return salas.filter((sala) => {
      const coincideFiltro =
        !configuracion?.tono || sala.tono === configuracion.tono;
      const contenido = normalizar(
        [sala.nombre, sala.tema, sala.resumen, sala.lema].join(" "),
      );
      const coincideBusqueda = !termino || contenido.includes(termino);

      return coincideFiltro && coincideBusqueda;
    });
  }, [consultaDiferida, filtro, salas]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          aria-label="Filtrar salas por tema"
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
          label="Buscar salas"
          placeholder="Buscar por tema, lema o nombre…"
          value={consulta}
          onChange={setConsulta}
        />
      </div>

      <p className="mt-4 text-xs font-medium text-muted" role="status">
        {filtradas.length}{" "}
        {filtradas.length === 1 ? "sala encontrada" : "salas encontradas"}
        {consulta.trim() ? ` para «${consulta.trim()}»` : ""}
      </p>

      {filtradas.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtradas.map((sala) => (
            <SalaCard key={sala.id} sala={sala} />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <ButtonLink
              href="/salas"
              variant="outline"
              onClick={() => {
                setConsulta("");
                setFiltro("todas");
              }}
            >
              Limpiar filtros
            </ButtonLink>
          }
          className="mt-6"
          description="Probá con otra palabra o elegí «Todas las salas». También podés comenzar por la sala de fiestas patronales, la de caciques o la de Diriangén."
          icon={SearchX}
          title="No encontramos esa sala"
        />
      )}

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed border-border px-4 py-3 text-xs leading-relaxed text-muted">
        <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <p>
          Estas tres salas son demostrativas y no representan instalaciones
          físicas del museo. Cada una indica el carácter de su contenido y evita
          presentar interpretaciones como hechos documentados.
        </p>
      </div>
    </div>
  );
}
