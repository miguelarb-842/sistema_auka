import Link from "next/link";
import { ArrowRight, Settings2 } from "lucide-react";

import { ScrollReveal } from "@/components/ui/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";
import { perfiles } from "@/modules/configuracion/data/perfiles.data";

export function HomePerfiles() {
  return (
    <section className="auka-container py-16 sm:py-20">
      <SectionHeading
        action={
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
            href="/configuracion"
          >
            <Settings2 aria-hidden="true" className="size-4" />
            Cambiar mi perfil
          </Link>
        }
        description="El mismo contenido puede contarse de muchas maneras. Elegí un perfil para ajustar el tono, la extensión de los textos y el tipo de retos. Podés cambiarlo en cualquier momento."
        eyebrow="Un museo para distintas edades"
        title="Tres formas de recorrer el museo"
      />

      <ScrollReveal escalonar className="mt-10 grid gap-4 md:grid-cols-3">
        {perfiles.map((perfil) => {
          const Icono = perfil.icono;

          return (
            <Link
              key={perfil.id}
              className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-foreground/25"
              href="/configuracion"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-surface-secondary text-foreground transition-colors group-hover:bg-background">
                  <Icono aria-hidden="true" className="size-6" />
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] font-medium text-muted">
                  {perfil.edadSugerida}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {perfil.nombre}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {perfil.descripcion}
              </p>
              <p className="mt-4 border-t border-separator pt-4 text-xs leading-relaxed text-muted">
                {perfil.detalle}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Elegir este perfil
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
