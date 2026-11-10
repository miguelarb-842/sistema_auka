import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ChatConversacion } from "@/modules/chat-xila/components/ChatConversacion";
import {
  getPersonajeById,
  getPersonajes,
} from "@/modules/museo/services/museo.service";

interface ChatPersonajePageProps {
  params: Promise<{ personajeId: string }>;
}

export function generateStaticParams() {
  return getPersonajes().map((personaje) => ({
    personajeId: personaje.id,
  }));
}

export async function generateMetadata({
  params,
}: ChatPersonajePageProps): Promise<Metadata> {
  const { personajeId } = await params;
  const personaje = getPersonajeById(personajeId);

  if (!personaje) {
    return { title: "Conversación no encontrada" };
  }

  return {
    title: `Conversación con ${personaje.nombre}`,
    description: personaje.chat.bienvenida.adolescente,
  };
}

export default async function ChatPersonajePage({
  params,
}: ChatPersonajePageProps) {
  const { personajeId } = await params;
  const personaje = getPersonajeById(personajeId);

  if (!personaje) {
    notFound();
  }

  return (
    <ChatConversacion
      config={personaje.chat}
      enlaceVolver={{
        href: `/personajes/${personaje.id}`,
        label: "Volver a la ficha",
      }}
    />
  );
}
