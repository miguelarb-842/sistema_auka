import type { LucideIcon } from "lucide-react";
import type { TonoIdentidad } from "@/types/ui.types";
import type { PerfilVisitante } from "@/types/perfil.types";

import { BookOpen, Compass, Puzzle } from "lucide-react";

export interface PerfilUI extends PerfilVisitante {
  icono: LucideIcon;
  tono: TonoIdentidad;
}

export const perfiles: readonly PerfilUI[] = [
  {
    id: "nino",
    nombre: "Niño",
    etiquetaCorta: "Niño",
    edadSugerida: "6 a 11 años",
    descripcion: "Explorá con juegos, pistas y explicaciones cortas.",
    detalle:
      "Xila usará frases claras, preguntas sencillas y retos para descubrir la historia jugando.",
    icono: Puzzle,
    tono: "warning",
  },
  {
    id: "adolescente",
    nombre: "Adolescente",
    etiquetaCorta: "Adolescente",
    edadSugerida: "12 a 17 años",
    descripcion: "Analizá, compará y cuestioná lo que leés.",
    detalle:
      "La experiencia prioriza el razonamiento histórico, las preguntas abiertas y los retos de pensamiento crítico.",
    icono: Compass,
    tono: "accent",
  },
  {
    id: "adulto",
    nombre: "Adulto",
    etiquetaCorta: "Adulto",
    edadSugerida: "18 años en adelante",
    descripcion: "Profundizá en contextos, fuentes y matices.",
    detalle:
      "Los contenidos se presentan con mayor detalle, advertencias de fuentes y preguntas para seguir investigando.",
    icono: BookOpen,
    tono: "success",
  },
] as const;

export function getPerfil(id: PerfilVisitante["id"]): PerfilUI {
  const perfil = perfiles.find((item) => item.id === id);

  return perfil ?? perfiles[1];
}
