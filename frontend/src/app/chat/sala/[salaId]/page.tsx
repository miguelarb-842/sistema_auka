import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ChatConversacion } from "@/modules/chat-xila/components/ChatConversacion";
import {
  getSalaById,
  getSalasConAgente,
} from "@/modules/museo/services/museo.service";

interface ChatSalaPageProps {
  params: Promise<{ salaId: string }>;
}

export function generateStaticParams() {
  return getSalasConAgente().map((sala) => ({ salaId: sala.id }));
}

export async function generateMetadata({
  params,
}: ChatSalaPageProps): Promise<Metadata> {
  const { salaId } = await params;
  const sala = getSalaById(salaId);

  if (!sala?.agenteXilaUbicado) {
    return { title: "Conversación no encontrada" };
  }

  return {
    title: sala.agenteXilaUbicado.nombreVisible,
    description: `Conversá con el Agente Xila de ${sala.nombre}. Contenido demostrativo y por verificar.`,
  };
}

export default async function ChatSalaPage({ params }: ChatSalaPageProps) {
  const { salaId } = await params;
  const sala = getSalaById(salaId);

  if (!sala?.agenteXilaUbicado) {
    notFound();
  }

  return (
    <ChatConversacion
      config={sala.agenteXilaUbicado}
      enlaceVolver={{
        href: `/salas/${sala.id}`,
        label: `Volver a ${sala.nombre}`,
      }}
    />
  );
}
