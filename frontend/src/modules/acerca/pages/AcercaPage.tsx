import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  CircleHelp,
  Code2,
  Compass,
  Database,
  FlaskConical,
  Layers,
  MessageCircleQuestion,
  PenLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/atoms/ButtonLink";
import { Breadcrumbs } from "@/components/ui/molecules/Breadcrumbs";
import { ContentBadge } from "@/components/ui/molecules/ContentBadge";
import { InfoCallout } from "@/components/ui/molecules/InfoCallout";
import { SectionHeading } from "@/components/ui/molecules/SectionHeading";

const alcance = [
  {
    icono: Boxes,
    titulo: "Tres salas demostrativas",
    descripcion:
      "Fiestas Patronales de Managua, los caciques de Nicaragua y Diriangén con la resistencia indígena.",
  },
  {
    icono: UsersRound,
    titulo: "Cuatro fichas de personajes",
    descripcion:
      "Nicarao, Diriangén, los pueblos chorotegas y mangues, y Santo Domingo de Guzmán.",
  },
  {
    icono: MessageCircleQuestion,
    titulo: "Tres asistentes Xila",
    descripcion:
      "Una versión por sala, con bienvenidas, preguntas, retos y pistas adaptadas al perfil.",
  },
  {
    icono: Database,
    titulo: "Preferencias locales",
    descripcion:
      "Perfil, tamaño de texto y tema se guardan en el navegador. No hay cuentas ni servidores.",
  },
] as const;

const limites = [
  "No hay backend, base de datos, autenticación ni servicios de inteligencia artificial.",
  "El chat no aprende: responde con reglas y textos preparados para cada sala.",
  "Las fuentes específicas y la validación institucional quedan pendientes para una versión final.",
  "La paleta OKLCH oficial del proyecto no fue suministrada; se conserva la paleta base de HeroUI v3.",
] as const;

const tecnologias = [
  "Next.js 16 · App Router",
  "React 19 + TypeScript",
  "HeroUI 3",
  "Tailwind CSS 4",
  "Lucide React",
] as const;

export function AcercaPage() {
  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Acerca de la App" }]} />

      <header className="mt-8 max-w-3xl">
        <p className="auka-eyebrow">Sobre Sistema Auka</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Un museo digital para aprender a preguntar.
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Sistema Auka es una experiencia educativa que combina salas temáticas,
          personajes históricos y una conversación simulada con el Robot Xila.
          Está pensada para estudiantes, familias y docentes que quieren
          acercarse al patrimonio de Nicaragua con curiosidad y criterio.
        </p>
      </header>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
            <Compass aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Misión</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Abrir una puerta amable al patrimonio histórico y cultural de
            Nicaragua, sin sustituir el trabajo de docentes, historiadores ni
            comunidades.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-warning-soft text-warning-soft-foreground">
            <CircleHelp aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Método</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Cada sala combina contexto, preguntas y retos. Xila acompaña la
            conversación con respuestas locales y límites explícitos.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-success-soft text-success-soft-foreground">
            <ShieldCheck aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Criterio</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            No se inventan fechas, citas ni testimonios. Lo documentado, lo
            interpretado y lo demostrativo se muestran por separado.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="La experiencia busca ser honesta sobre lo que puede y lo que no puede hacer. Estas dos columnas resumen el alcance del prototipo."
          eyebrow="Qué es y qué no es"
          title="Expectativas claras desde el inicio"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-success/25 bg-success-soft/30 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-success-soft text-success-soft-foreground">
                <Check aria-hidden="true" className="size-4" />
              </span>
              Lo que sí es
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Una demostración funcional de un museo digital con tres salas.",
                "Un espacio para practicar preguntas, comparar fuentes y pensar críticamente.",
                "Una conversación simulada, transparente y adaptada a tres perfiles.",
                "Un frontend completo, sin dependencias de servicios externos.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-success"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-danger/20 bg-danger-soft/25 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-danger-soft text-danger-soft-foreground">
                <X aria-hidden="true" className="size-4" />
              </span>
              Lo que no es
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Una enciclopedia histórica ni una fuente académica validada.",
                "Una inteligencia artificial real conectada a internet.",
                "Un sustituto de una visita escolar guiada o de una investigación.",
                "Una colección de retratos históricos verificados.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <X
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-danger"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="El contenido se clasifica con tres etiquetas visibles en las salas y fichas. No es una decoración: cambia la forma en que deberías leer cada afirmación."
          eyebrow="Criterios de contenido"
          title="Tres niveles de certeza"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="documentado" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Información general que el proyecto puede sostener con la
              documentación disponible y que no depende de una interpretación
              específica.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="interpretacion" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Lecturas y análisis propuestos por el equipo. Se presentan como
              preguntas o hipótesis, nunca como hechos cerrados.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="demostrativo" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Material introductorio del prototipo, pendiente de fuentes
              específicas, validación y trabajo de campo.
            </p>
          </div>
        </div>

        <InfoCallout
          className="mt-4"
          icon={<PenLine aria-hidden="true" className="size-4" />}
          title="Personificación y dramatización"
          tono="warning"
        >
          Xila y los parlamentos dramatizados son representaciones educativas.
          No son citas de personajes históricos, no son testimonios y no deben
          usarse como evidencia. Cada dramatización incluye una advertencia y un
          contexto separado.
        </InfoCallout>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="La aplicación se organiza por dominios y por niveles de interfaz. Los datos están separados de los componentes para facilitar la revisión de contenidos."
          eyebrow="Arquitectura"
          title="Cómo está construida la experiencia"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Layers aria-hidden="true" className="size-4 text-accent" />
                  Screaming Architecture
                </span>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Cada dominio vive en <code>src/modules</code>: salas,
                  personajes, chat, configuración, home y acerca. Los
                  componentes de módulo no se mezclan con los globales.
                </p>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Boxes aria-hidden="true" className="size-4 text-warning" />
                  Atomic Design
                </span>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Átomos, moléculas, organismos y templates en{" "}
                  <code>src/components/ui</code>, con estilos y
                  responsabilidades acotadas.
                </p>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Code2 aria-hidden="true" className="size-4 text-success" />
                  TypeScript estricto
                </span>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  IDs, perfiles, estados de contenido y tipos de chat están
                  definidos para evitar errores silenciosos.
                </p>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <BookOpen aria-hidden="true" className="size-4 text-danger" />
                  Datos separados
                </span>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Salas, personajes y asistentes viven en archivos de datos
                  revisables, no dentro de los componentes de interfaz.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-separator pt-5">
              {tecnologias.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                >
                  {tecnologia}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="auka-eyebrow">Alcance de esta versión</p>
            <div className="mt-4 space-y-4">
              {alcance.map((item) => {
                const Icono = item.icono;

                return (
                  <div key={item.titulo} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-secondary">
                      <Icono aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.titulo}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {item.descripcion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="Este prototipo no cuenta con el documento completo de la propuesta ni con la paleta oficial. Esas ausencias se documentan en lugar de rellenarse con contenido inventado."
          eyebrow="Transparencia del prototipo"
          title="Lo que todavía falta"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {limites.map((limite) => (
            <div
              key={limite}
              className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-surface/50 p-4 text-sm leading-relaxed text-muted"
            >
              <FlaskConical
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-warning"
              />
              {limite}
            </div>
          ))}
        </div>

        <InfoCallout
          className="mt-4"
          icon={<ShieldAlert aria-hidden="true" className="size-4" />}
          title="Uso responsable"
          tono="danger"
        >
          Si vas a usar este material en el aula, contrastalo con fuentes
          actualizadas y con la experiencia de las comunidades involucradas.
          Señalá siempre cuándo una actividad es una dramatización y cuándo un
          dato proviene de una fuente histórica.
        </InfoCallout>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="auka-eyebrow">Seguir explorando</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              La historia se piensa, no se copia.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Elegí una sala, ajustá tu perfil o empezá una conversación con
              Xila. Todo funciona localmente en tu navegador.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/salas" size="lg">
              Explorar salas
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/configuracion" size="lg" variant="outline">
              <Sparkles aria-hidden="true" className="size-4" />
              Configurar la app
            </ButtonLink>
          </div>
        </div>
        <p className="mt-6 border-t border-separator pt-5 text-xs leading-relaxed text-muted">
          Sistema Auka · Robot Xila. Prototipo frontend educativo. Las
          ilustraciones son representaciones artísticas conceptuales creadas
          para esta demostración.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
        <Link
          className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          href="/configuracion"
        >
          Configuración
        </Link>
        <Link
          className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          href="/chat"
        >
          Chat Xila
        </Link>
        <span>Contenido introductorio · {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
