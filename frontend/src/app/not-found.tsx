import type { Metadata } from "next";

import { Compass, Home, Landmark, MessageCircleQuestion } from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscás no existe en el Sistema Auka.",
};

export default function NotFound() {
  return (
    <div className="auka-container flex min-h-[62dvh] flex-col items-center justify-center py-16 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-accent-soft text-accent-soft-foreground">
        <Compass aria-hidden="true" className="size-8" />
      </span>
      <p className="auka-eyebrow mt-6">Error 404</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Esta puerta no lleva a ninguna sala
      </h1>
      <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
        La página que buscás no existe o cambió de lugar. Podés volver al
        inicio, recorrer las salas o conversar con Xila.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">
          <Home aria-hidden="true" className="size-4" />
          Volver al inicio
        </ButtonLink>
        <ButtonLink href="/salas" variant="outline">
          <Landmark aria-hidden="true" className="size-4" />
          Ver salas
        </ButtonLink>
        <ButtonLink href="/chat" variant="ghost">
          <MessageCircleQuestion aria-hidden="true" className="size-4" />
          Hablar con Xila
        </ButtonLink>
      </div>
    </div>
  );
}
