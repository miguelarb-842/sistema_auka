import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { AgrupacionDetalle } from "@/modules/personajes/components/AgrupacionDetalle";
import {
  getAgrupacionById,
  getAgrupacionesInvitadas,
} from "@/modules/personajes/services/personajes.service";

interface AgrupacionPageProps {
  params: Promise<{ agrupacionId: string }>;
}

export function generateStaticParams() {
  return getAgrupacionesInvitadas().map((agrupacion) => ({
    agrupacionId: agrupacion.id,
  }));
}

export async function generateMetadata({
  params,
}: AgrupacionPageProps): Promise<Metadata> {
  const { agrupacionId } = await params;
  const agrupacion = getAgrupacionById(agrupacionId);

  if (!agrupacion) {
    return { title: "Agrupación no encontrada" };
  }

  return {
    title: agrupacion.nombre,
    description: agrupacion.descripcion.adolescente,
    openGraph: {
      title: `${agrupacion.nombre} · Sistema Auka`,
      description: agrupacion.descripcion.adolescente,
    },
  };
}

export default async function AgrupacionPage({ params }: AgrupacionPageProps) {
  const { agrupacionId } = await params;
  const agrupacion = getAgrupacionById(agrupacionId);

  if (!agrupacion) {
    notFound();
  }

  return <AgrupacionDetalle agrupacion={agrupacion} />;
}
