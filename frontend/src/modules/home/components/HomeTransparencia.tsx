import { BookCheck, FlaskConical, Scale, ShieldAlert } from "lucide-react";

import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

const criterios = [
  {
    estado: "documentado" as const,
    titulo: "Lo que sabemos",
    descripcion:
      "Datos generales y referencias que el proyecto puede sostener con la documentación disponible.",
  },
  {
    estado: "interpretacion" as const,
    titulo: "Lo que pensamos",
    descripcion:
      "Lecturas, preguntas y análisis que proponemos como interpretación, nunca como hechos cerrados.",
  },
  {
    estado: "demostrativo" as const,
    titulo: "Lo que estamos probando",
    descripcion:
      "Contenido introductorio de este prototipo, pendiente de validación, fuentes específicas y trabajo de campo.",
  },
];

export function HomeTransparencia() {
  return (
    <section className="border-y border-separator bg-surface/40">
      <div className="auka-container py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              description="La historia no se inventa para que una experiencia sea más divertida. Este prototipo marca sus límites de forma visible y prefiere decir «no lo sé» antes que rellenar un vacío con una cita falsa."
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
              title="Contenido demostrativo"
              tono="warning"
            >
              Las salas, personajes y conversaciones son introductorios. No
              sustituyen una investigación histórica, una visita escolar guiada
              ni una validación institucional. La personificación de Xila está
              siempre marcada como dramatización educativa.
            </InfoCallout>

            <div className="flex flex-wrap gap-4 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <BookCheck aria-hidden="true" className="size-4 text-success" />
                Sin citas inventadas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Scale aria-hidden="true" className="size-4 text-warning" />
                Interpretaciones señaladas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FlaskConical
                  aria-hidden="true"
                  className="size-4 text-accent"
                />
                Prototipo en revisión
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
