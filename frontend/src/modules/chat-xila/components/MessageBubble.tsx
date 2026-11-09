"use client";

import type { ConfigChat } from "@/modules/museo/types/museo.types";
import type { Mensaje } from "../types/chat.types";

import Image from "next/image";
import { CircleHelp, Lightbulb, Trophy } from "lucide-react";
import { Button } from "@heroui/react";

import { cn, formatearHora } from "@/lib/utils";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";

interface MessageBubbleProps {
  mensaje: Mensaje;
  config: ConfigChat;
  onPedirPista: () => void;
}

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function MessageBubble({
  mensaje,
  config,
  onPedirPista,
}: MessageBubbleProps) {
  const esVisitante = mensaje.autor === "visitante";

  if (mensaje.tipo === "sistema") {
    const aviso = (
      <p
        className="mx-auto flex max-w-md items-start gap-2 rounded-xl border border-warning/30 bg-warning-soft/40 px-3 py-2 text-xs leading-relaxed text-muted"
        role="status"
      >
        <CircleHelp
          aria-hidden="true"
          className="mt-0.5 size-3.5 shrink-0 text-warning"
        />
        {mensaje.contenido}
      </p>
    );

    return mensaje.timestamp > 0 ? <MotionReveal>{aviso}</MotionReveal> : aviso;
  }

  const burbuja = (
    <article
      className={cn(
        "flex w-full gap-3",
        esVisitante ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!esVisitante ? (
        config.avatar ? (
          <div className="relative mt-1 size-8 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="object-cover"
              sizes="32px"
              src={config.avatar}
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl border border-border bg-surface-secondary font-mono text-[0.65rem] font-semibold text-muted"
          >
            {iniciales(config.nombreVisible)}
          </div>
        )
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
          <span className="max-w-[14rem] truncate">
            {esVisitante ? "Vos" : config.nombreVisible}
          </span>
          {mensaje.timestamp > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={new Date(mensaje.timestamp).toISOString()}>
                {formatearHora(mensaje.timestamp)}
              </time>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );

  // La bienvenida no se anima con Anime.js: así el chunk de la librería no se
  // descarga durante la carga inicial del chat. Los mensajes nuevos sí.
  return mensaje.timestamp > 0 ? (
    <MotionReveal>{burbuja}</MotionReveal>
  ) : (
    burbuja
  );
}
