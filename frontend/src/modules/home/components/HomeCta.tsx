import { ArrowRight, MessageCircleQuestion } from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";

export function HomeCta() {
  return (
    <section className="auka-container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "1.4rem 1.4rem",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-72 rounded-full border border-background/15"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 size-64 rounded-full border border-background/10"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
              Empezá cuando quieras
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Traé una pregunta. Xila pone el resto del recorrido.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-background/70 sm:text-base">
              Podés entrar por una sala, conocer a un personaje o conversar
              directamente con uno de los tres asistentes. No necesitás cuenta
              ni conexión a un servicio de inteligencia artificial.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink
              className="border-background/25 bg-background text-foreground hover:bg-background/90"
              href="/salas"
              size="lg"
              variant="secondary"
            >
              Explorar salas
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink
              className="border-background/25 text-background hover:bg-background/10"
              href="/chat"
              size="lg"
              variant="outline"
            >
              <MessageCircleQuestion aria-hidden="true" className="size-4" />
              Hablar con Xila
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
