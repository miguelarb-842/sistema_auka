"use client";

import type { ConfigChat } from "@/modules/museo/types/museo.types";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CircleHelp,
  MessageCircleQuestion,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";

import { useChat } from "../hooks/useChat";

import { ChatComposer } from "./ChatComposer";
import { MessageBubble } from "./MessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { TypingIndicator } from "./TypingIndicator";

import { BrandLogo } from "@/components/ui/atoms/BrandLogo";
import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { getPerfil } from "@/modules/configuracion/data/perfiles.data";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

interface EnlaceVolver {
  href: string;
  label: string;
}

interface ChatConversacionProps {
  config: ConfigChat;
  enlaceVolver: EnlaceVolver;
}

const descripcionesTipo: Record<ConfigChat["tipo"], string> = {
  "guia-general":
    "La guía general orienta sobre las salas y las conversaciones disponibles. No encarna a ningún personaje.",
  "agente-sala":
    "El Agente Xila responde con el conocimiento local de su sala. Solo algunas salas de la instalación tienen uno.",
  personaje:
    "Esta conversación es una representación educativa. No es una cita real ni un testimonio de la persona representada.",
  agrupacion:
    "Esta conversación presenta a una agrupación invitada a la demostración. No es una cita real de la agrupación.",
};

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function ChatConversacion({
  config,
  enlaceVolver,
}: ChatConversacionProps) {
  const { perfil } = usePreferencias();
  const perfilActivo = getPerfil(perfil);
  const {
    mensajes,
    escribiendo,
    error,
    puedeReintentar,
    enviar,
    detener,
    reintentar,
    reiniciar,
    pedirReto,
    pedirPista,
    descartarError,
  } = useChat(config);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);
  const [confirmandoReinicio, setConfirmandoReinicio] = useState(false);
  const [versionLimpieza, setVersionLimpieza] = useState(0);

  useEffect(() => {
    const contenedor = scrollRef.current;

    if (!contenedor || !autoScrollRef.current) {
      return;
    }

    contenedor.scrollTo({
      top: contenedor.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes.length, escribiendo]);

  useEffect(() => {
    if (!confirmandoReinicio) {
      return;
    }

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setConfirmandoReinicio(false);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [confirmandoReinicio]);

  const enviarConScroll = async (texto: string): Promise<boolean> => {
    autoScrollRef.current = true;

    return enviar(texto);
  };

  const reintentarConScroll = async (): Promise<boolean> => {
    autoScrollRef.current = true;

    const aceptado = await reintentar();

    if (aceptado) {
      setVersionLimpieza((version) => version + 1);
    }

    return aceptado;
  };

  const pedirRetoConScroll = () => {
    autoScrollRef.current = true;
    void pedirReto();
  };

  const pedirPistaConScroll = () => {
    autoScrollRef.current = true;
    void pedirPista();
  };

  const confirmarReinicio = () => {
    reiniciar();
    setConfirmandoReinicio(false);
    autoScrollRef.current = true;
  };

  return (
    <div className="auka-container pb-12 pt-6">
      <Breadcrumbs
        items={[
          { href: "/chat", label: "Conversaciones" },
          { label: config.nombreVisible },
        ]}
      />

      <header className="mt-6 flex flex-col gap-5 border-b border-separator pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          {config.avatar ? (
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                fill
                alt={config.avatarAlt ?? ""}
                className="object-cover"
                sizes="64px"
                src={config.avatar}
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="grid size-16 shrink-0 place-items-center rounded-2xl border border-border bg-surface-secondary text-xl font-semibold tracking-tight text-muted"
            >
              {iniciales(config.nombreVisible)}
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip
                color={config.tipo === "agrupacion" ? "warning" : "accent"}
                size="sm"
                variant="soft"
              >
                {config.etiquetaVisible}
              </Chip>
              <VerificacionBadge />
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {config.nombreVisible}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Perfil:{" "}
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
          {confirmandoReinicio ? (
            <div
              aria-live="polite"
              className="flex flex-wrap items-center gap-2 rounded-2xl border border-warning/40 bg-warning-soft/40 px-3 py-2"
              role="group"
            >
              <span className="text-xs font-medium">
                ¿Reiniciar la conversación?
              </span>
              <Button
                className="min-h-11"
                size="sm"
                variant="outline"
                onPress={confirmarReinicio}
              >
                Sí, reiniciar
              </Button>
              <Button
                className="min-h-11"
                size="sm"
                variant="ghost"
                onPress={() => setConfirmandoReinicio(false)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              className="min-h-11"
              size="sm"
              variant="outline"
              onPress={() => setConfirmandoReinicio(true)}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Reiniciar
            </Button>
          )}
          <ButtonLink
            className="min-h-11"
            href="/chat"
            size="sm"
            variant="ghost"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Volver a conversaciones
          </ButtonLink>
        </div>
      </header>

      <div
        data-intro-contenido
        className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="flex h-[min(780px,calc(100dvh-12rem))] min-h-[560px] flex-col overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="flex flex-col gap-2 border-b border-separator bg-background/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <BrandLogo className="w-24 shrink-0 sm:w-[120px]" marca="xila" />
            <p className="flex items-center gap-2 text-xs font-medium text-muted">
              <CircleHelp
                aria-hidden="true"
                className="size-4 shrink-0 text-warning-strong"
              />
              Contenido demostrativo · Por verificar
            </p>
            <Link
              className="hidden min-h-11 items-center text-xs font-medium text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground sm:inline-flex"
              href={enlaceVolver.href}
            >
              {enlaceVolver.label}
            </Link>
          </div>

          <div
            ref={scrollRef}
            aria-label={`Conversación con ${config.nombreVisible}`}
            aria-live="polite"
            aria-relevant="additions text"
            className="chat-scroll flex-1 space-y-5 overflow-y-auto p-4 sm:p-6"
            role="log"
            onScroll={() => {
              const contenedor = scrollRef.current;

              if (!contenedor) {
                return;
              }

              autoScrollRef.current =
                contenedor.scrollHeight -
                  contenedor.scrollTop -
                  contenedor.clientHeight <
                140;
            }}
          >
            {mensajes.map((mensaje) => (
              <MessageBubble
                key={mensaje.id}
                config={config}
                mensaje={mensaje}
                onPedirPista={pedirPista}
              />
            ))}
            {escribiendo ? (
              <TypingIndicator nombre={config.nombreVisible} />
            ) : null}
          </div>

          {error ? (
            <div
              className="border-t border-danger/30 bg-danger-soft/40 px-4 py-3"
              role="alert"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-danger"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">
                    No se pudo obtener la respuesta
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {error}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {puedeReintentar ? (
                      <Button
                        className="min-h-11"
                        size="sm"
                        variant="outline"
                        onPress={() => void reintentarConScroll()}
                      >
                        <RotateCcw aria-hidden="true" className="size-3.5" />
                        Reintentar
                      </Button>
                    ) : null}
                    <Button
                      className="min-h-11"
                      size="sm"
                      variant="ghost"
                      onPress={descartarError}
                    >
                      Descartar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="border-t border-separator bg-background/60 p-3 sm:p-4">
            <SuggestedQuestions
              deshabilitado={escribiendo}
              preguntas={config.preguntasSugeridas[perfil]}
              onPedirPista={pedirPistaConScroll}
              onPedirReto={pedirRetoConScroll}
              onPreguntar={(pregunta) => void enviarConScroll(pregunta)}
            />
            <div className="mt-3">
              <ChatComposer
                generando={escribiendo}
                idConversacion={config.id}
                limpiarVersion={versionLimpieza}
                nombreAsistente={config.nombreVisible}
                onDetener={detener}
                onEnviar={enviarConScroll}
              />
            </div>
            <p className="mt-2 px-1 text-[0.65rem] leading-relaxed text-muted">
              Las respuestas se generan con el agente Xila a partir del
              conocimiento local de esta conversación. Si un dato no está
              disponible, se indica como por verificar.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Sobre esta conversación</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {descripcionesTipo[config.tipo]}
            </p>
            <p className="mt-4 border-t border-separator pt-4 text-xs font-medium text-muted">
              {config.etiquetaVisible}
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                href={enlaceVolver.href}
              >
                <BookOpen aria-hidden="true" className="size-4" />
                {enlaceVolver.label}
              </Link>
              <Link
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                href="/chat"
              >
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Volver a conversaciones
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
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-accent"
              href="/configuracion"
            >
              Cambiar perfil
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Retos de la conversación</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Los retos cambian según el perfil. Podés pedir uno nuevo o una
              pista del último reto.
            </p>
            <div className="mt-4 grid gap-2">
              <Button
                className="min-h-11"
                isDisabled={escribiendo}
                size="sm"
                variant="outline"
                onPress={pedirRetoConScroll}
              >
                <Trophy aria-hidden="true" className="size-4" />
                Proponeme un reto
              </Button>
              <Button
                className="min-h-11"
                isDisabled={escribiendo}
                size="sm"
                variant="ghost"
                onPress={pedirPistaConScroll}
              >
                <Sparkles aria-hidden="true" className="size-4" />
                Pedir una pista
              </Button>
            </div>
          </div>

          <InfoCallout
            icon={<CircleHelp aria-hidden="true" className="size-4" />}
            title="Contenido por verificar"
            tono="warning"
          >
            No se presentan biografías, fechas, obras, repertorios, integrantes,
            horarios ni precios como datos verificados. La información
            definitiva será entregada por el equipo del museo.
          </InfoCallout>
        </aside>
      </div>
    </div>
  );
}
