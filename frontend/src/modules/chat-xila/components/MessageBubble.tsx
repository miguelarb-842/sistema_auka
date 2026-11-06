"use client";

import type { AsistenteXila, Mensaje } from "../types/chat.types";

import Image from "next/image";
import { Lightbulb, Sparkles, Trophy } from "lucide-react";
import { Button } from "@heroui/react";

import { cn, formatearHora } from "@/lib/utils";

interface MessageBubbleProps {
  mensaje: Mensaje;
  asistente: AsistenteXila;
  onPedirPista: () => void;
}

export function MessageBubble({
  mensaje,
  asistente,
  onPedirPista,
}: MessageBubbleProps) {
  const esVisitante = mensaje.autor === "visitante";

  return (
    <article
      className={cn(
        "flex w-full gap-3",
        esVisitante ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!esVisitante ? (
        <div className="relative mt-1 size-8 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
          <Image
            fill
            alt=""
            aria-hidden="true"
            className="object-cover"
            sizes="32px"
            src={asistente.avatar}
          />
        </div>
      ) : null}

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[78%]",
          esVisitante ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            esVisitante
              ? "rounded-tr-sm bg-foreground text-background"
              : "rounded-tl-sm border border-border bg-surface text-foreground",
          )}
        >
          {mensaje.tipo === "reto" && mensaje.reto ? (
            <div>
              <p>{mensaje.contenido}</p>
              <div className="mt-3 rounded-xl border border-warning/30 bg-warning-soft/50 p-3.5 text-foreground">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <Trophy aria-hidden="true" className="size-3.5" />
                  Reto
                </p>
                <p className="mt-1.5 font-semibold leading-snug">
                  {mensaje.reto.titulo}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {mensaje.reto.enunciado}
                </p>
                <Button
                  className="mt-3"
                  size="sm"
                  variant="outline"
                  onPress={onPedirPista}
                >
                  <Lightbulb aria-hidden="true" className="size-3.5" />
                  Pedir pista
                </Button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-line text-pretty">
              {mensaje.contenido}
            </p>
          )}
        </div>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 px-1 text-[0.65rem] text-muted",
            esVisitante ? "justify-end" : "justify-start",
          )}
        >
          {!esVisitante ? (
            <Sparkles aria-hidden="true" className="size-2.5" />
          ) : null}
          <span>{esVisitante ? "Vos" : "Xila"}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={new Date(mensaje.timestamp).toISOString()}>
            {formatearHora(mensaje.timestamp)}
          </time>
        </p>
      </div>
    </article>
  );
}
