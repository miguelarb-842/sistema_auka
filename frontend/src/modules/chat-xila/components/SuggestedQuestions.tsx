"use client";

import { Lightbulb, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";

interface SuggestedQuestionsProps {
  preguntas: readonly string[];
  onPreguntar: (pregunta: string) => void;
  onPedirReto: () => void;
  onPedirPista: () => void;
  deshabilitado?: boolean;
}

export function SuggestedQuestions({
  preguntas,
  onPreguntar,
  onPedirReto,
  onPedirPista,
  deshabilitado = false,
}: SuggestedQuestionsProps) {
  return (
    <div
      aria-label="Preguntas sugeridas"
      className="auka-scroll flex gap-2 overflow-x-auto pb-1"
      role="group"
    >
      <button
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-warning/35 bg-warning-soft/60 px-3 py-1.5 text-xs font-medium transition-colors hover:border-warning/60 disabled:opacity-50"
        disabled={deshabilitado}
        type="button"
        onClick={onPedirReto}
      >
        <Trophy aria-hidden="true" className="size-3.5" />
        Dame un reto
      </button>
      <button
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
        disabled={deshabilitado}
        type="button"
        onClick={onPedirPista}
      >
        <Lightbulb aria-hidden="true" className="size-3.5" />
        Una pista
      </button>
      {preguntas.map((pregunta) => (
        <button
          key={pregunta}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground",
            "disabled:opacity-50",
          )}
          disabled={deshabilitado}
          type="button"
          onClick={() => onPreguntar(pregunta)}
        >
          {pregunta}
        </button>
      ))}
    </div>
  );
}
