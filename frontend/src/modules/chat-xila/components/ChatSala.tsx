"use client";

import type { Sala } from "@/modules/salas/types/sala.types";
import type { AsistenteXila } from "../types/chat.types";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  MessageCircleQuestion,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";

import { useChatXila } from "../hooks/useChatXila";

import { ChatComposer } from "./ChatComposer";
import { MessageBubble } from "./MessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { TypingIndicator } from "./TypingIndicator";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";
import { getPerfil } from "@/modules/configuracion/data/perfiles.data";

const tonos = {
  accent: "accent" as const,
  warning: "warning" as const,
  success: "success" as const,
  danger: "danger" as const,
};

interface ChatSalaProps {
  asistente: AsistenteXila;
  sala: Sala;
}

export function ChatSala({ asistente, sala }: ChatSalaProps) {
  const { perfil } = usePreferencias();
  const perfilActivo = getPerfil(perfil);
  const { mensajes, escribiendo, enviar, reiniciar, pedirReto, pedirPista } =
    useChatXila(asistente);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contenedor = scrollRef.current;

    if (!contenedor) {
      return;
    }

    contenedor.scrollTo({
      top: contenedor.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes.length, escribiendo]);

  return (
    <div className="auka-container pb-12 pt-6">
      <Breadcrumbs
        items={[
          { href: "/chat", label: "Chat Xila" },
          { label: asistente.nombre },
        ]}
      />

      <header className="mt-6 flex flex-col gap-5 border-b border-separator pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              fill
              alt={asistente.avatarAlt}
              className="object-cover"
              sizes="64px"
              src={asistente.avatar}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip color={tonos[asistente.tono]} size="sm" variant="soft">
                {sala.tema}
              </Chip>
              <Chip size="sm" variant="soft">
                Simulación local
              </Chip>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {asistente.nombre}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Conversación sobre «{sala.nombre}» · Perfil:{" "}
              <Link
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                href="/configuracion"
              >
                {perfilActivo.nombre}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onPress={pedirReto}>
            <Trophy aria-hidden="true" className="size-4" />
            Nuevo reto
          </Button>
          <Button size="sm" variant="ghost" onPress={reiniciar}>
            <RotateCcw aria-hidden="true" className="size-4" />
            Reiniciar
          </Button>
          <ButtonLink href="/chat" size="sm" variant="ghost">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Cambiar asistente
          </ButtonLink>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex h-[min(780px,calc(100dvh-12rem))] min-h-[560px] flex-col overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-separator bg-background/60 px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-medium text-muted">
              <ShieldCheck aria-hidden="true" className="size-4 text-success" />
              Respuestas locales · sin IA real · sin envío de datos
            </p>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted sm:inline">
              {sala.id}
            </span>
          </div>

          <div
            ref={scrollRef}
            aria-label={`Conversación con ${asistente.nombre}`}
            aria-live="polite"
            className="chat-scroll flex-1 space-y-5 overflow-y-auto p-4 sm:p-6"
            role="log"
          >
            {mensajes.map((mensaje) => (
              <MessageBubble
                key={mensaje.id}
                asistente={asistente}
                mensaje={mensaje}
                onPedirPista={pedirPista}
              />
            ))}
            {escribiendo ? <TypingIndicator /> : null}
          </div>

          <div className="border-t border-separator bg-background/60 p-3 sm:p-4">
            <SuggestedQuestions
              deshabilitado={escribiendo}
              preguntas={asistente.preguntasSugeridas[perfil]}
              onPedirPista={pedirPista}
              onPedirReto={pedirReto}
              onPreguntar={enviar}
            />
            <div className="mt-3">
              <ChatComposer deshabilitado={escribiendo} onEnviar={enviar} />
            </div>
            <p className="mt-2 px-1 text-[0.65rem] leading-relaxed text-muted">
              Xila es una personificación educativa y no una fuente histórica.
              Si un dato no está en los contenidos de esta sala, lo dirá en vez
              de inventarlo.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Sobre este asistente</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {asistente.biografia}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {asistente.personalidad.map((rasgo) => (
                <li
                  key={rasgo}
                  className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] font-medium text-muted"
                >
                  {rasgo}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2 border-t border-separator pt-4">
              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                href={`/salas/${sala.id}`}
              >
                <BookOpen aria-hidden="true" className="size-4" />
                Leer la ficha de la sala
              </Link>
              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                href="/chat"
              >
                <UsersRound aria-hidden="true" className="size-4" />
                Ver los tres asistentes
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Perfil activo</p>
            <p className="mt-2 flex items-center gap-2 text-base font-semibold">
              <Sparkles aria-hidden="true" className="size-4 text-accent" />
              {perfilActivo.nombre}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {perfilActivo.detalle}
            </p>
            <Link
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-accent"
              href="/configuracion"
            >
              Cambiar perfil
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Sugerencias para empezar</p>
            <div className="mt-3 space-y-2">
              {asistente.preguntasSugeridas[perfil]
                .slice(0, 4)
                .map((pregunta) => (
                  <button
                    key={pregunta}
                    className="flex w-full items-start gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-left text-xs leading-relaxed text-muted transition-colors hover:border-foreground/25 hover:text-foreground disabled:opacity-50"
                    disabled={escribiendo}
                    type="button"
                    onClick={() => enviar(pregunta)}
                  >
                    <MessageCircleQuestion
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0"
                    />
                    {pregunta}
                  </button>
                ))}
            </div>
            <button
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground disabled:opacity-50"
              disabled={escribiendo}
              type="button"
              onClick={pedirPista}
            >
              <Lightbulb aria-hidden="true" className="size-3.5" />
              Pedir una pista
            </button>
          </div>

          <InfoCallout
            icon={<ShieldCheck aria-hidden="true" className="size-4" />}
            title="Privacidad y límites"
            tono="warning"
          >
            La conversación no sale de tu navegador y se reinicia al recargar la
            página. No hay autenticación ni almacenamiento de mensajes.
          </InfoCallout>
        </aside>
      </div>
    </div>
  );
}
