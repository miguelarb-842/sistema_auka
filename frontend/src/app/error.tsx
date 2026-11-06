"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@heroui/react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="auka-container flex min-h-[60dvh] flex-col items-center justify-center py-16 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-danger-soft text-danger-soft-foreground">
        <AlertTriangle aria-hidden="true" className="size-8" />
      </span>
      <p className="auka-eyebrow mt-6">Algo salió mal</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        No pudimos mostrar esta página
      </h1>
      <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
        La aplicación encontró un error inesperado. Podés intentar de nuevo o
        volver al inicio. Si el problema continúa, recargá la página.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-muted">
          Referencia: {error.digest}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button onPress={reset}>
          <RotateCcw aria-hidden="true" className="size-4" />
          Intentar de nuevo
        </Button>
        <ButtonLink href="/" variant="outline">
          <Home aria-hidden="true" className="size-4" />
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  );
}
