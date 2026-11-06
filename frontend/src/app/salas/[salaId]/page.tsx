import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { SalaDetalle } from "@/modules/salas/components/SalaDetalle";
import { getSalaById } from "@/modules/salas/services/salas.service";
import { SALA_IDS } from "@/types/ids.types";

interface SalaPageProps {
  params: Promise<{ salaId: string }>;
}

export function generateStaticParams() {
  return SALA_IDS.map((salaId) => ({ salaId }));
}

export async function generateMetadata({
  params,
}: SalaPageProps): Promise<Metadata> {
  const { salaId } = await params;
  const sala = getSalaById(salaId);

  if (!sala) {
    return { title: "Sala no encontrada" };
  }

  return {
    title: sala.nombre,
    description: sala.resumen,
    openGraph: {
      title: `${sala.nombre} · Sistema Auka`,
      description: sala.resumen,
      images: [{ url: sala.portada, alt: sala.portadaAlt }],
    },
  };
}

export default async function SalaPage({ params }: SalaPageProps) {
  const { salaId } = await params;
  const sala = getSalaById(salaId);

  if (!sala) {
    notFound();
  }

  return <SalaDetalle sala={sala} />;
}
