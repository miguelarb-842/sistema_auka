import type { LucideIcon } from "lucide-react";
import type { IconoElementoSala } from "../types/sala.types";

import {
  BookMarked,
  Flame,
  Footprints,
  Map,
  MessagesSquare,
  Music,
  Shield,
  Users,
  Waves,
} from "lucide-react";

export const iconosElementos: Record<IconoElementoSala, LucideIcon> = {
  musica: Music,
  procesion: Footprints,
  comunidad: Users,
  fuego: Flame,
  lago: Waves,
  dialogo: MessagesSquare,
  territorio: Map,
  memoria: BookMarked,
  dignidad: Shield,
  valentia: Shield,
};
