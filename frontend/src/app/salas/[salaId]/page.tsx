import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { SalaDetalle } from "@/modules/salas/components/SalaDetalle";
import { getSalaById, getSalas } from "@/modules/salas/services/salas.service";

interface SalaPageProps {
  params: Promise<{ salaId: string }>;
}

export function generateStaticParams() {
  return getSalas().map((sala) => ({ salaId: sala.id }));
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
    description: sala.descripcion.adolescente,
    openGraph: {
      title: `${sala.nombre} · Sistema Auka`,
      description: sala.descripcion.adolescente,
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
