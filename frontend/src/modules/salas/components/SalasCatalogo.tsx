"use client";

import type { Sala } from "../types/sala.types";

import { useDeferredValue, useMemo, useState } from "react";
import { Landmark, SearchX } from "lucide-react";

import { SalaCard } from "./SalaCard";

import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";
import { SearchInput } from "@/components/ui/molecules/SearchInput";

const filtros = [
  {
    id: "todas",
    etiqueta: "Todas las salas",
    coincide: () => true,
  },
  {
    id: "con-agente",
    etiqueta: "Con Agente Xila",
    coincide: (sala: Sala) => sala.agenteXilaUbicado !== undefined,
  },
  {
    id: "con-personajes",
    etiqueta: "Con personajes",
    coincide: (sala: Sala) => sala.personajesRelacionados.length > 0,
  },
  {
    id: "sin-agente",
    etiqueta: "Sin Agente Xila",
    coincide: (sala: Sala) => sala.agenteXilaUbicado === undefined,
  },
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
      const coincideFiltro = configuracion
        ? configuracion.coincide(sala)
        : true;
      const contenido = normalizar(
        [
          sala.nombre,
          sala.descripcion.nino,
          sala.descripcion.adolescente,
          sala.descripcion.adulto,
        ].join(" "),
      );
      const coincideBusqueda = !termino || contenido.includes(termino);

      return coincideFiltro && coincideBusqueda;
    });
  }, [consultaDiferida, filtro, salas]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          aria-label="Filtrar salas"
          className="auka-scroll flex gap-2 overflow-x-auto pb-1"
          role="group"
        >
          {filtros.map((item) => (
            <button
              key={item.id}
              aria-controls="resultados-salas"
              aria-pressed={filtro === item.id}
              className={
                filtro === item.id
                  ? "shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  : "shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
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
          controls="resultados-salas"
          label="Buscar salas"
          placeholder="Buscar por nombre o descripción…"
          value={consulta}
          onChange={setConsulta}
        />
      </div>

      <div id="resultados-salas">
        <p className="mt-4 text-xs font-medium text-muted" role="status">
          {filtradas.length}{" "}
          {filtradas.length === 1 ? "sala encontrada" : "salas encontradas"}
          {consulta.trim() ? ` para «${consulta.trim()}»` : ""}
        </p>

        {filtradas.length > 0 ? (
          <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtradas.map((sala, index) => (
              <MotionReveal
                key={sala.id}
                interactive
                className="h-full"
                index={index}
              >
                <SalaCard sala={sala} />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <button
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                type="button"
                onClick={() => {
                  setConsulta("");
                  setFiltro("todas");
                }}
              >
                Limpiar filtros
              </button>
            }
            className="mt-6"
            description={
              consulta.trim()
                ? `No encontramos coincidencias para «${consulta.trim()}». Probá con otra palabra o volvé a «Todas las salas».`
                : "Probá con otro filtro o volvé a «Todas las salas»."
            }
            icon={SearchX}
            title="No encontramos esa sala"
          />
        )}
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed border-border px-4 py-3 text-xs leading-relaxed text-muted">
        <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <p>
          Las {salas.length} salas de esta simulación están marcadas como
          demostrativas y su contenido está por verificar. La información
          definitiva será entregada por el equipo del museo.
        </p>
      </div>
    </div>
  );
}
