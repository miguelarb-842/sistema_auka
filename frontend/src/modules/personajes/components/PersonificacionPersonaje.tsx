"use client";

import type { Personaje } from "../types/personaje.types";

import { useState } from "react";
import { Drama, Info, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@heroui/react";

import { InfoCallout } from "@/components/ui/molecules/InfoCallout";

export function PersonificacionPersonaje({
  personaje,
}: {
  personaje: Personaje;
}) {
  const { personificacion } = personaje;
  const [intercambioActivo, setIntercambioActivo] = useState(
    personificacion.intercambios[0]?.id ?? "",
  );

  if (!personificacion.disponible) {
    return (
      <InfoCallout
        icon={<Info aria-hidden="true" className="size-4" />}
        title="Personificación no disponible"
        tono="info"
      >
        {personificacion.introduccion}
      </InfoCallout>
    );
  }

  const intercambio = personificacion.intercambios.find(
    (item) => item.id === intercambioActivo,
  );

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
          <Drama aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="auka-eyebrow">Dramatización educativa</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">
            Una conversación imaginada con {personaje.nombre}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {personificacion.introduccion}
      </p>

      <InfoCallout
        className="mt-4"
        icon={<Info aria-hidden="true" className="size-4" />}
        title="Esto no es una cita histórica"
        tono="warning"
      >
        {personificacion.advertencia}
      </InfoCallout>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Elegí una pregunta
          </p>
          <div className="space-y-2">
            {personificacion.intercambios.map((item) => {
              const activo = item.id === intercambioActivo;

              return (
                <button
                  key={item.id}
                  aria-pressed={activo}
                  className={
                    activo
                      ? "flex w-full items-start gap-2 rounded-xl border border-accent/40 bg-accent-soft/60 px-3 py-2.5 text-left text-sm font-medium transition-colors"
                      : "flex w-full items-start gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-left text-sm text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                  }
                  type="button"
                  onClick={() => setIntercambioActivo(item.id)}
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  {item.preguntaVisitante}
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" className="min-w-0">
          {intercambio ? (
            <div className="animate-auka-fade flex h-full flex-col rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                <Sparkles aria-hidden="true" className="size-3.5 text-accent" />
                Respuesta dramatizada
              </div>
              <blockquote className="mt-3 text-pretty text-lg font-medium leading-relaxed text-foreground">
                «{intercambio.respuestaDramatizada}»
              </blockquote>
              <div className="mt-4 border-t border-separator pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Contexto de Xila
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {intercambio.contextoXila}
                </p>
              </div>
              <Button
                className="mt-4 self-start"
                size="sm"
                variant="outline"
                onPress={() => setIntercambioActivo("")}
              >
                Cerrar respuesta
              </Button>
            </div>
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
              Elegí una pregunta para ver la respuesta dramatizada y su
              contexto.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
