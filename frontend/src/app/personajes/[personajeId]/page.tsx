import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PersonajeDetalle } from "@/modules/personajes/components/PersonajeDetalle";
import { getPersonajeById } from "@/modules/personajes/services/personajes.service";
import { PERSONAJE_IDS } from "@/types/ids.types";

interface PersonajePageProps {
  params: Promise<{ personajeId: string }>;
}

export function generateStaticParams() {
  return PERSONAJE_IDS.map((personajeId) => ({ personajeId }));
}

export async function generateMetadata({
  params,
}: PersonajePageProps): Promise<Metadata> {
  const { personajeId } = await params;
  const personaje = getPersonajeById(personajeId);

  if (!personaje) {
    return { title: "Personaje no encontrado" };
  }

  return {
    title: personaje.nombre,
    description: personaje.resumen,
    openGraph: {
      title: `${personaje.nombre} · Sistema Auka`,
      description: personaje.resumen,
      images: [{ url: personaje.ilustracion, alt: personaje.ilustracionAlt }],
    },
  };
}

export default async function PersonajePage({ params }: PersonajePageProps) {
  const { personajeId } = await params;
  const personaje = getPersonajeById(personajeId);

  if (!personaje) {
    notFound();
  }

  return <PersonajeDetalle personaje={personaje} />;
}
