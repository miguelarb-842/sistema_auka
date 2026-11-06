import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ChatSala } from "@/modules/chat-xila/components/ChatSala";
import { getAsistentePorSala } from "@/modules/chat-xila/services/asistentes.service";
import { getSalaById } from "@/modules/salas/services/salas.service";
import { SALA_IDS } from "@/types/ids.types";

interface ChatSalaPageProps {
  params: Promise<{ salaId: string }>;
}

export function generateStaticParams() {
  return SALA_IDS.map((salaId) => ({ salaId }));
}

export async function generateMetadata({
  params,
}: ChatSalaPageProps): Promise<Metadata> {
  const { salaId } = await params;
  const sala = getSalaById(salaId);
  const asistente = getAsistentePorSala(salaId);

  if (!sala || !asistente) {
    return { title: "Chat no encontrado" };
  }

  return {
    title: `Chat con ${asistente.nombre}`,
    description: `Conversá con ${asistente.nombre} sobre ${sala.nombre}. Simulación educativa con respuestas locales.`,
  };
}

export default async function ChatSalaPage({ params }: ChatSalaPageProps) {
  const { salaId } = await params;
  const sala = getSalaById(salaId);
  const asistente = getAsistentePorSala(salaId);

  if (!sala || !asistente) {
    notFound();
  }

  return <ChatSala asistente={asistente} sala={sala} />;
}
