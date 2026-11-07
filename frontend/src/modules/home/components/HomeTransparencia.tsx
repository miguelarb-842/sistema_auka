import { BookCheck, CircleHelp, Scale, ShieldAlert } from "lucide-react";

import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

const criterios = [
  {
    estado: "documentado" as const,
    titulo: "Lo que está documentado",
    descripcion:
      "Reservado para la información que el museo valide con documentación. En esta simulación no hay contenido marcado como documentado.",
  },
  {
    estado: "interpretacion" as const,
    titulo: "Lo que se interpreta",
    descripcion:
      "Reservado para lecturas y análisis del equipo del museo. Esta simulación no las inventa ni las presenta como hechos.",
  },
  {
    estado: "demostrativo" as const,
    titulo: "Lo que se está demostrando",
    descripcion:
      "Estado actual de todo el contenido: introductorio, marcado y pendiente de verificación por el equipo del museo.",
  },
];

export function HomeTransparencia() {
  return (
    <section className="border-y border-separator bg-surface/40">
      <div className="auka-container py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              description="La historia no se inventa para que una experiencia sea más entretenida. Esta simulación marca sus límites de forma visible y prefiere decir «no lo sé» antes que rellenar un vacío con una cita falsa."
              eyebrow="Transparencia"
              title="Distinguir lo documentado de lo imaginado"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <ContentBadge estado="documentado" />
              <ContentBadge estado="interpretacion" />
              <ContentBadge estado="demostrativo" />
            </div>
          </div>

          <div className="grid gap-3">
            {criterios.map((criterio) => (
              <div
                key={criterio.estado}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <ContentBadge estado={criterio.estado} />
                  <h3 className="text-sm font-semibold">{criterio.titulo}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {criterio.descripcion}
                </p>
              </div>
            ))}

            <InfoCallout
              icon={<ShieldAlert aria-hidden="true" className="size-4" />}
              title="Contenido demostrativo y por verificar"
              tono="warning"
            >
              No se presentan biografías, fechas, obras, repertorios,
              integrantes, horarios ni precios como datos verificados. Las
              conversaciones con personajes y agrupaciones son representaciones
              educativas, no citas reales ni testimonios.
            </InfoCallout>

            <div className="flex flex-wrap gap-4 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <BookCheck aria-hidden="true" className="size-4 text-success" />
                Sin citas inventadas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Scale aria-hidden="true" className="size-4 text-warning" />
                Etiquetas visibles
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleHelp aria-hidden="true" className="size-4 text-accent" />
                Todo por verificar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
