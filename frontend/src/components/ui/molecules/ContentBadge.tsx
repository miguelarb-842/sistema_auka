"use client";

import type { EstadoContenido } from "@/types/ui.types";

import { BookCheck, FlaskConical, Scale } from "lucide-react";
import { Chip } from "@heroui/react";

const estados = {
  documentado: {
    etiqueta: "Documentado",
    color: "success" as const,
    icono: BookCheck,
    descripcion: "Información respaldada por el documento o fuentes generales.",
  },
  interpretacion: {
    etiqueta: "Interpretación",
    color: "warning" as const,
    icono: Scale,
    descripcion: "Lectura o análisis que no debe confundirse con un hecho.",
  },
  demostrativo: {
    etiqueta: "Demostrativo",
    color: "default" as const,
    icono: FlaskConical,
    descripcion:
      "Contenido introductorio del prototipo, pendiente de validación.",
  },
} satisfies Record<
  EstadoContenido,
  {
    etiqueta: string;
    color: "success" | "warning" | "default";
    icono: typeof BookCheck;
    descripcion: string;
  }
>;

export function ContentBadge({ estado }: { estado: EstadoContenido }) {
  const config = estados[estado];
  const Icono = config.icono;

  return (
    <Chip
      color={config.color}
      size="sm"
      title={config.descripcion}
      variant="soft"
    >
      <Chip.Label className="inline-flex items-center gap-1">
        <Icono aria-hidden="true" className="size-3.5" />
        <span>{config.etiqueta}</span>
      </Chip.Label>
    </Chip>
  );
}
