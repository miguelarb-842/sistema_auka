"use client";

import type { TamanoTexto } from "../types/preferencias.types";

import { useEffect, useState } from "react";
import {
  Check,
  Moon,
  MonitorSmartphone,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sun,
  Type,
  UserRound,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";
import { useTheme } from "next-themes";

import { perfiles } from "../data/perfiles.data";
import { usePreferencias } from "../context/PreferenciasProvider";

import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { cn } from "@/lib/utils";

const opcionesTema = [
  {
    id: "light" as const,
    etiqueta: "Tema claro",
    descripcion: "Fondo claro y alto contraste para ambientes iluminados.",
    icono: Sun,
  },
  {
    id: "dark" as const,
    etiqueta: "Tema oscuro",
    descripcion:
      "Fondo oscuro para reducir el brillo en ambientes con poca luz.",
    icono: Moon,
  },
];

const opcionesTamano: Array<{
  id: TamanoTexto;
  etiqueta: string;
  descripcion: string;
  claseMuestra: string;
}> = [
  {
    id: "sm",
    etiqueta: "Pequeño",
    descripcion: "Más contenido en pantalla.",
    claseMuestra: "text-sm",
  },
  {
    id: "md",
    etiqueta: "Normal",
    descripcion: "Equilibrio entre lectura y espacio.",
    claseMuestra: "text-base",
  },
  {
    id: "lg",
    etiqueta: "Grande",
    descripcion: "Mayor comodidad de lectura.",
    claseMuestra: "text-lg",
  },
];

export function ConfiguracionPage() {
  const { theme, setTheme } = useTheme();
  const {
    perfil,
    tamanoTexto,
    tienePerfil,
    hidratado,
    setPerfil,
    setTamanoTexto,
    resetearPreferencias,
  } = usePreferencias();
  const [montado, setMontado] = useState(false);
  const [confirmacion, setConfirmacion] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const temaActivo = theme === "dark" ? "dark" : "light";
  const perfilActivo =
    perfiles.find((item) => item.id === perfil) ?? perfiles[1];
  const tamanoActivo =
    opcionesTamano.find((item) => item.id === tamanoTexto) ?? opcionesTamano[1];

  function restablecer() {
    resetearPreferencias();
    setTheme("light");
    setConfirmacion(true);
    window.setTimeout(() => setConfirmacion(false), 4000);
  }

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Configuración" }]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          as="h1"
          description="Ajustá la experiencia a tu forma de leer. El perfil cambia el tono de Xila y la profundidad de los contenidos; el tamaño de texto y el tema se aplican en toda la aplicación."
          eyebrow="Preferencias"
          title="Configuración de la visita"
        />

        <InfoCallout
          className="lg:mb-1"
          icon={<MonitorSmartphone aria-hidden="true" className="size-4" />}
          title="Todo queda en tu navegador"
          tono="accent"
        >
          No hay cuentas ni servidores. El perfil, el tamaño de texto y el tema
          se guardan con <code>localStorage</code> y podés borrarlos cuando
          quieras.
        </InfoCallout>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section
            aria-labelledby="titulo-tema"
            className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="auka-eyebrow flex items-center gap-1.5">
                  <Settings2 aria-hidden="true" className="size-3.5" />
                  Apariencia
                </p>
                <h2 className="mt-2 text-lg font-semibold" id="titulo-tema">
                  Tema de la interfaz
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Se aplica de inmediato en todas las páginas.
                </p>
              </div>
              <Chip size="sm" variant="soft">
                {montado ? (temaActivo === "dark" ? "Oscuro" : "Claro") : "…"}
              </Chip>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {opcionesTema.map((opcion) => {
                const Icono = opcion.icono;
                const activo = montado && temaActivo === opcion.id;

                return (
                  <button
                    key={opcion.id}
                    aria-pressed={activo}
                    className={cn(
                      "flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                      activo
                        ? "border-foreground/40 bg-surface-secondary"
                        : "border-border bg-background hover:border-foreground/25",
                    )}
                    type="button"
                    onClick={() => setTheme(opcion.id)}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="grid size-9 place-items-center rounded-xl bg-surface text-foreground">
                        <Icono aria-hidden="true" className="size-4" />
                      </span>
                      {activo ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-background">
                          <Check aria-hidden="true" className="size-3" />
                          Activo
                        </span>
                      ) : null}
                    </span>
                    <span className="text-sm font-semibold">
                      {opcion.etiqueta}
                    </span>
                    <span className="text-xs leading-relaxed text-muted">
                      {opcion.descripcion}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="titulo-perfil"
            className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="auka-eyebrow flex items-center gap-1.5">
                  <UserRound aria-hidden="true" className="size-3.5" />
                  Perfil de visitante
                </p>
                <h2 className="mt-2 text-lg font-semibold" id="titulo-perfil">
                  ¿Cómo querés vivir la experiencia?
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Cambia el tono de Xila, la extensión de los textos y los
                  retos. La conversación abierta se reinicia con el nuevo tono.
                </p>
              </div>
              {tienePerfil && hidratado ? (
                <Chip color="success" size="sm" variant="soft">
                  Perfil guardado
                </Chip>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3">
              {perfiles.map((opcion) => {
                const Icono = opcion.icono;
                const activo = perfil === opcion.id;

                return (
                  <button
                    key={opcion.id}
                    aria-pressed={activo}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                      activo
                        ? "border-foreground/40 bg-surface-secondary"
                        : "border-border bg-background hover:border-foreground/25",
                    )}
                    type="button"
                    onClick={() => setPerfil(opcion.id)}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl",
                        activo
                          ? "bg-foreground text-background"
                          : "bg-surface text-foreground",
                      )}
                    >
                      <Icono aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">
                          {opcion.nombre}
                        </span>
                        <span className="rounded-full border border-border px-2 py-0.5 text-[0.62rem] font-medium text-muted">
                          {opcion.edadSugerida}
                        </span>
                        {activo ? (
                          <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-success">
                            <Check aria-hidden="true" className="size-3" />
                            Activo
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted">
                        {opcion.detalle}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="titulo-tipografia"
            className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="auka-eyebrow flex items-center gap-1.5">
                  <Type aria-hidden="true" className="size-3.5" />
                  Tipografía
                </p>
                <h2
                  className="mt-2 text-lg font-semibold"
                  id="titulo-tipografia"
                >
                  Tamaño del texto
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Ajusta la escala general. El cambio se guarda en este
                  navegador.
                </p>
              </div>
              <Chip size="sm" variant="soft">
                {tamanoActivo.etiqueta}
              </Chip>
            </div>

            <div
              aria-label="Elegir tamaño de texto"
              className="mt-5 grid gap-3 sm:grid-cols-3"
              role="group"
            >
              {opcionesTamano.map((opcion) => {
                const activo = tamanoTexto === opcion.id;

                return (
                  <button
                    key={opcion.id}
                    aria-pressed={activo}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors",
                      activo
                        ? "border-foreground/40 bg-surface-secondary"
                        : "border-border bg-background hover:border-foreground/25",
                    )}
                    type="button"
                    onClick={() => setTamanoTexto(opcion.id)}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-semibold leading-none tracking-tight",
                        opcion.claseMuestra,
                      )}
                    >
                      Aa
                    </span>
                    <span className="text-sm font-semibold">
                      {opcion.etiqueta}
                    </span>
                    <span className="text-[0.68rem] leading-relaxed text-muted">
                      {opcion.descripcion}
                    </span>
                    {activo ? (
                      <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-success">
                        <Check aria-hidden="true" className="size-3" />
                        Activo
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Resumen de tu visita</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-3 border-b border-separator pb-3">
                <dt className="text-muted">Perfil</dt>
                <dd className="text-right font-semibold">
                  {perfilActivo.nombre}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3 border-b border-separator pb-3">
                <dt className="text-muted">Edad sugerida</dt>
                <dd className="text-right font-semibold">
                  {perfilActivo.edadSugerida}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3 border-b border-separator pb-3">
                <dt className="text-muted">Texto</dt>
                <dd className="text-right font-semibold">
                  {tamanoActivo.etiqueta}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted">Tema</dt>
                <dd className="text-right font-semibold">
                  {montado
                    ? temaActivo === "dark"
                      ? "Oscuro"
                      : "Claro"
                    : "Cargando…"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 rounded-xl bg-surface-secondary p-3 text-xs leading-relaxed text-muted">
              {perfilActivo.descripcion}
            </p>
          </div>

          <InfoCallout
            icon={<ShieldCheck aria-hidden="true" className="size-4" />}
            title="Privacidad"
            tono="success"
          >
            Estas preferencias se guardan solo en este navegador con las claves{" "}
            <code>auka:perfil</code>, <code>auka:tipografia</code> y{" "}
            <code>auka:tema</code>. No se comparten con terceros ni se envían a
            un servidor.
          </InfoCallout>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <p className="auka-eyebrow">Restablecer</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Vuelve al perfil adolescente, al tamaño normal y al tema claro, y
              borra las preferencias guardadas. No elimina nada de tus
              conversaciones porque no se guardan.
            </p>
            <Button
              fullWidth
              className="mt-4"
              variant="outline"
              onPress={restablecer}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Restablecer preferencias
            </Button>
            <p
              aria-live="polite"
              className="mt-2 min-h-4 text-xs font-medium text-success"
            >
              {confirmacion ? "Preferencias restablecidas." : ""}
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-border p-5 text-xs leading-relaxed text-muted">
            <p className="font-semibold text-foreground">
              ¿No querés elegir un perfil?
            </p>
            <p className="mt-1">
              La aplicación usa «Adolescente» por defecto para mantener un tono
              intermedio. Podés cambiar esta decisión cuando quieras.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
