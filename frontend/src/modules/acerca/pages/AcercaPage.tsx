import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Landmark,
  MessageCircleQuestion,
  Package,
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
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { perfiles } from "@/modules/configuracion/data/perfiles.data";
import {
  getAgrupacionesInvitadas,
  getFichasConChat,
  getMuseo,
  getPersonajes,
  getSalas,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";

const alcanceProducto = [
  "Un producto educativo que se instala en museos.",
  "Una experiencia con salas, una guía general, agentes Xila y conversaciones con personajes.",
  "Un paquete de contenido propio de cada museo; la interfaz no contiene datos del museo.",
  "Tres perfiles de visitante y preferencias que se guardan en el navegador.",
] as const;

const limites = [
  "No inventa biografías, fechas, obras, repertorios, integrantes, horarios ni precios.",
  "No verifica el contenido: la información definitiva será entregada por el equipo del museo.",
  "No consulta fuentes abiertas de internet para completar datos del museo; si falta información, se indica como por verificar.",
  "No sustituye una visita guiada, una investigación ni una fuente documentada.",
] as const;

export function AcercaPage() {
  const museo = getMuseo();
  const salas = getSalas();
  const salasConAgente = getSalasConAgente();
  const personajes = getPersonajes();
  const agrupaciones = getAgrupacionesInvitadas();
  const fichas = getFichasConChat();

  const alcanceInstalacion = [
    `Una simulación de la instalación del Sistema Auka en el ${museo.nombre}.`,
    `${salas.length} salas, ${salasConAgente.length} agentes Xila y ${fichas.length} voces con conversación propia.`,
    "Un ejercicio de demostración: no es el sistema final ni una validación del contenido del museo.",
    "Una app sin cuentas de visitante; las conversaciones se procesan para generar la respuesta.",
  ] as const;

  return (
    <div className="auka-container pb-16 pt-6 sm:pb-20">
      <Breadcrumbs items={[{ label: "Acerca de la App" }]} />

      <header className="mt-8 max-w-3xl">
        <p className="auka-eyebrow">Acerca de la App</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Sistema Auka se instala. Esta app simula una instalación.
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Sistema Auka es un producto educativo que se instala en museos con un
          paquete de contenido propio. Esta aplicación simula su instalación en
          el {museo.nombre}: {salas.length} salas, una guía general,{" "}
          {salasConAgente.length} agentes Xila y {fichas.length} voces con
          conversación propia. Todo el contenido está marcado como demostrativo
          y por verificar.
        </p>
      </header>

      <section data-intro-contenido className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
            <Package aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Producto instalable</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Sistema Auka se adapta a cada museo con un paquete de contenido
            propio: salas, voces y materiales revisables.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-warning-soft text-warning-soft-foreground">
            <Landmark aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">
            Una instalación con nombre
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Esta app representa la instalación en el {museo.nombre}. El nombre
            del museo viene del paquete de contenido, no de los componentes.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-danger-soft text-danger-soft-foreground">
            <ShieldAlert aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Todo por verificar</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            La simulación no presenta biografías, fechas, obras, repertorios,
            integrantes, horarios ni precios como datos verificados.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="El producto y esta instalación son cosas distintas. Esta sección separa lo que corresponde a Sistema Auka de lo que corresponde a la simulación que estás recorriendo."
          eyebrow="Producto e instalación"
          title="Qué es Sistema Auka y qué es esta app"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent-soft-foreground">
                <Package aria-hidden="true" className="size-4" />
              </span>
              El producto
            </h3>
            <ul className="mt-4 space-y-3">
              {alcanceProducto.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-success-strong"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-warning-soft text-warning-soft-foreground">
                <Landmark aria-hidden="true" className="size-4" />
              </span>
              Esta instalación
            </h3>
            <ul className="mt-4 space-y-3">
              {alcanceInstalacion.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-warning-strong"
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
          description="Estos conteos y nombres se leen del paquete de contenido de la instalación. Si se reemplaza el paquete, la página se actualiza sin cambiar los componentes."
          eyebrow="Qué encontrás"
          title="La instalación, en datos"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <Landmark aria-hidden="true" className="size-4 text-accent" />
              <h3 className="text-sm font-semibold">
                {salas.length} salas para recorrer
              </h3>
            </div>
            <ul className="mt-4 grid gap-2 text-xs leading-relaxed text-muted sm:grid-cols-2">
              {salas.map((sala) => (
                <li key={sala.id} className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-accent"
                  />
                  {sala.nombre}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <Sparkles
                aria-hidden="true"
                className="size-4 text-warning-strong"
              />
              <h3 className="text-sm font-semibold">
                {salasConAgente.length} agentes Xila en sala
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
              {salasConAgente.map((sala) => (
                <li key={sala.id} className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-warning"
                  />
                  {sala.agenteXilaUbicado?.nombreVisible ?? sala.nombre}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-separator pt-4 text-xs leading-relaxed text-muted">
              En las demás salas no se muestra el Agente Xila.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion
                aria-hidden="true"
                className="size-4 text-success-strong"
              />
              <h3 className="text-sm font-semibold">
                {fichas.length} voces con conversación
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
              {personajes.map((personaje) => (
                <li key={personaje.id} className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-success"
                  />
                  {personaje.nombre} · {personaje.etiquetaVisible}
                </li>
              ))}
              {agrupaciones.map((agrupacion) => (
                <li key={agrupacion.id} className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-warning"
                  />
                  {agrupacion.nombre} · {agrupacion.etiquetaVisible}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <UsersRound aria-hidden="true" className="size-4 text-accent" />
              <h3 className="text-sm font-semibold">
                {perfiles.length} perfiles de visitante
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
              {perfiles.map((perfil) => (
                <li key={perfil.id} className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-accent"
                  />
                  {perfil.nombre} · {perfil.edadSugerida}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-separator pt-4 text-xs leading-relaxed text-muted">
              El perfil cambia el tono, la extensión de los textos y los retos
              de las conversaciones.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="Las conversaciones no se presentan como citas. Cada ficha y cada conversación muestran una etiqueta que indica qué tipo de representación estás leyendo."
          eyebrow="Voces identificadas"
          title="Representaciones, no testimonios"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold">Representación educativa</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Personajes presentados como una representación para aprender. No
              son una cita real ni un testimonio de la persona representada.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold">
              Representación desde la perspectiva de la agrupación
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Una agrupación habla desde su propia perspectiva educativa. No
              reproduce parlamentos ni documentos reales.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold">
              Agrupación invitada, demostración
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Una agrupación invitada a la demostración. Su historia,
              integrantes y repertorio están por verificar.
            </p>
          </div>
        </div>

        <InfoCallout
          className="mt-4"
          icon={<ShieldAlert aria-hidden="true" className="size-4" />}
          title="No son citas reales"
          tono="warning"
        >
          Las conversaciones con personajes y agrupaciones son representaciones
          educativas. No reproducen citas textuales, no son testimonios y no
          deben usarse como evidencia. La información biográfica, la trayectoria
          y los repertorios están por verificar.
        </InfoCallout>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="El contenido se clasifica con tres etiquetas visibles en las salas y fichas. En esta simulación todo el material está en estado demostrativo y además marcado como por verificar."
          eyebrow="Criterios de contenido"
          title="Tres niveles de certeza"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="documentado" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Reservado para información que el museo valide con documentación.
              En esta simulación no hay contenido marcado como documentado.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="interpretacion" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Reservado para lecturas y análisis del equipo del museo. Esta
              simulación no las inventa ni las presenta como hechos cerrados.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <ContentBadge estado="demostrativo" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Estado actual de todo el contenido: introductorio, marcado y
              pendiente de verificación por el equipo del museo.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3 text-xs leading-relaxed text-muted">
          <VerificacionBadge />
          <p>
            Todo el contenido de esta instalación está además marcado como por
            verificar. La información definitiva será entregada por el equipo
            del museo.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="La simulación tiene límites explícitos. Estos son los más importantes para interpretar lo que ves y lo que conversás."
          eyebrow="Alcance y límites"
          title="Lo que esta simulación no hace"
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {limites.map((limite) => (
            <div
              key={limite}
              className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-surface/50 p-4 text-sm leading-relaxed text-muted"
            >
              <X
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-danger"
              />
              {limite}
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <InfoCallout
            icon={<ShieldCheck aria-hidden="true" className="size-4" />}
            title="Privacidad"
            tono="success"
          >
            Tus preferencias de tema, tamaño de texto y perfil se guardan solo
            en tu navegador. No hay cuentas de visitante. Al conversar, el
            mensaje y el perfil activo se procesan para generar la respuesta.
          </InfoCallout>

          <InfoCallout
            icon={<BookOpen aria-hidden="true" className="size-4" />}
            title="Uso responsable"
            tono="accent"
          >
            Si vas a usar este material en el aula, contrastalo con fuentes
            actualizadas y con la experiencia de las comunidades involucradas.
            Señalá siempre cuándo una actividad es una representación y cuándo
            un dato proviene de una fuente histórica.
          </InfoCallout>
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="auka-eyebrow">Seguir explorando</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              La historia se piensa, no se copia.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Recorré las {salas.length} salas del {museo.nombre}, ajustá tu
              perfil o empezá una conversación con la guía general y las voces
              del museo.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/salas" size="lg">
              Explorar salas
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/chat" size="lg" variant="outline">
              <MessageCircleQuestion aria-hidden="true" className="size-4" />
              Empezar a conversar
            </ButtonLink>
          </div>
        </div>
        <p className="mt-6 border-t border-separator pt-5 text-xs leading-relaxed text-muted">
          Sistema Auka · Simulación de la instalación en el {museo.nombre}. La
          ilustración del Agente Xila es una representación conceptual creada
          para esta demostración.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
        <Link
          className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          href="/configuracion"
        >
          Configuración
        </Link>
        <Link
          className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          href="/chat"
        >
          Conversaciones
        </Link>
        <span>
          Contenido demostrativo y por verificar · {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
