import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ChatConversacion } from "@/modules/chat-xila/components/ChatConversacion";
import {
  getAgrupacionById,
  getAgrupacionesInvitadas,
} from "@/modules/museo/services/museo.service";

interface ChatAgrupacionPageProps {
  params: Promise<{ agrupacionId: string }>;
}

export function generateStaticParams() {
  return getAgrupacionesInvitadas().map((agrupacion) => ({
    agrupacionId: agrupacion.id,
  }));
}

export async function generateMetadata({
  params,
}: ChatAgrupacionPageProps): Promise<Metadata> {
  const { agrupacionId } = await params;
  const agrupacion = getAgrupacionById(agrupacionId);

  if (!agrupacion) {
    return { title: "Chat no encontrado" };
  }

  return {
    title: `Chat con ${agrupacion.nombre}`,
    description: agrupacion.chat.bienvenida.adolescente,
  };
}

export default async function ChatAgrupacionPage({
  params,
}: ChatAgrupacionPageProps) {
  const { agrupacionId } = await params;
  const agrupacion = getAgrupacionById(agrupacionId);

  if (!agrupacion) {
    notFound();
  }

  return (
    <ChatConversacion
      config={agrupacion.chat}
      enlaceVolver={{
        href: `/agrupaciones/${agrupacion.id}`,
        label: "Volver a la ficha",
      }}
    />
  );
}
