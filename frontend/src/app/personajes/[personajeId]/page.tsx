import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PersonajeDetalle } from "@/modules/personajes/components/PersonajeDetalle";
import {
  getPersonajeById,
  getPersonajes,
} from "@/modules/personajes/services/personajes.service";

interface PersonajePageProps {
  params: Promise<{ personajeId: string }>;
}

export function generateStaticParams() {
  return getPersonajes().map((personaje) => ({ personajeId: personaje.id }));
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
    description: personaje.descripcion.adolescente,
    openGraph: {
      title: `${personaje.nombre} · Sistema Auka`,
      description: personaje.descripcion.adolescente,
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
