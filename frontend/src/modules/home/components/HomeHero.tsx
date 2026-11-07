import Image from "next/image";
import {
  ArrowRight,
  Landmark,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import {
  getFichasConChat,
  getGuiaGeneral,
  getMuseo,
  getSalas,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";

export function HomeHero() {
  const museo = getMuseo();
  const salas = getSalas();
  const salasConAgente = getSalasConAgente();
  const fichas = getFichasConChat();
  const preguntas = getGuiaGeneral().preguntasSugeridas.adolescente.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-separator">
      <div
        aria-hidden="true"
        className="absolute inset-0 auka-glow opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 auka-pattern opacity-40"
      />
      <div className="auka-container relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="animate-auka-rise">
            <p className="auka-eyebrow flex items-center gap-2">
              <span className="relative inline-flex size-2">
                <span className="absolute inline-flex size-full animate-auka-pulse rounded-full bg-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Recorrido por el museo
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              La historia se piensa,
              <span className="mt-1 block text-accent">no se copia.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Recorré las {salas.length} salas del {museo.nombre}, conocé a sus
              personajes y conversá con la guía general o con el Agente Xila
              donde está disponible. Todo el contenido está marcado como
              demostrativo y por verificar.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/salas" size="lg">
                Entrar a las salas
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href="/chat" size="lg" variant="outline">
                <MessageCircleQuestion aria-hidden="true" className="size-4" />
                Empezar a conversar
              </ButtonLink>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted">
              <li className="inline-flex items-center gap-1.5">
                <Landmark aria-hidden="true" className="size-4 text-accent" />
                {salas.length} salas para recorrer
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Sparkles aria-hidden="true" className="size-4 text-warning" />
                {salasConAgente.length} agentes Xila en sala
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MessageCircleQuestion
                  aria-hidden="true"
                  className="size-4 text-success"
                />
                {fichas.length} voces con chat
              </li>
            </ul>
          </div>

          <div className="animate-auka-rise delay-2">
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[3rem] border border-border/70 bg-surface/30 backdrop-blur-sm"
              />
              <div className="auka-image-frame relative overflow-hidden rounded-[2.5rem] border border-border bg-surface-secondary shadow-xl shadow-black/5">
                <Image
                  priority
                  alt="Ilustración conceptual del Agente Xila, con detalles geométricos inspirados en la cerámica nicaragüense."
                  className="h-auto w-full"
                  height={900}
                  sizes="(max-width: 1024px) 90vw, 440px"
                  src="/images/hero-xila.svg"
                  width={800}
                />
                <div className="absolute inset-x-0 bottom-0 auka-gradient-overlay p-5 pt-16">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                        Agente Xila
                      </p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        Ilustración conceptual
                      </p>
                    </div>
                    <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                      Representación
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 border-t border-separator pt-8 sm:grid-cols-3">
          {preguntas.map((pregunta, index) => (
            <div
              key={pregunta}
              className="animate-auka-fade flex items-start gap-3 rounded-2xl border border-transparent px-1 py-2 sm:border-border/60 sm:bg-surface/40 sm:p-4"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="mt-0.5 font-mono text-xs font-semibold text-accent">
                0{index + 1}
              </span>
              <p className="text-sm font-medium leading-snug text-foreground">
                {pregunta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
