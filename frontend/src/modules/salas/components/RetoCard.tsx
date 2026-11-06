"use client";

import type { RetoEducativo } from "../types/sala.types";

import { useState } from "react";
import { Lightbulb, Sparkles, Trophy } from "lucide-react";
import { Button } from "@heroui/react";

import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

interface RetoCardProps {
  reto: RetoEducativo;
  indice: number;
}

export function RetoCard({ reto, indice }: RetoCardProps) {
  const { perfil } = usePreferencias();
  const [mostrarPista, setMostrarPista] = useState(false);
  const [mostrarCierre, setMostrarCierre] = useState(false);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-warning-soft text-warning-soft-foreground">
          <Trophy aria-hidden="true" className="size-5" />
        </span>
        <span className="font-mono text-xs font-semibold text-muted">
          Reto 0{indice + 1}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {reto.titulo}
      </h3>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
        {reto.enunciado[perfil]}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={mostrarPista ? "secondary" : "outline"}
          onPress={() => setMostrarPista((valor) => !valor)}
        >
          <Lightbulb aria-hidden="true" className="size-4" />
          {mostrarPista ? "Ocultar pista" : "Ver pista"}
        </Button>
        <Button
          size="sm"
          variant={mostrarCierre ? "secondary" : "ghost"}
          onPress={() => setMostrarCierre((valor) => !valor)}
        >
          <Sparkles aria-hidden="true" className="size-4" />
          {mostrarCierre ? "Ocultar cierre" : "Ver cierre"}
        </Button>
      </div>

      {mostrarPista ? (
        <div className="animate-auka-fade mt-4 rounded-xl border border-warning/25 bg-warning-soft/50 p-3 text-sm leading-relaxed">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Pista
          </p>
          <p className="text-pretty">{reto.pista[perfil]}</p>
        </div>
      ) : null}

      {mostrarCierre ? (
        <div className="animate-auka-fade mt-3 rounded-xl border border-success/25 bg-success-soft/50 p-3 text-sm leading-relaxed">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Cierre
          </p>
          <p className="text-pretty">{reto.cierre[perfil]}</p>
        </div>
      ) : null}
    </article>
  );
}
