import type { LucideIcon } from "lucide-react";
import type { IconoValor } from "../types/personaje.types";

import {
  BookMarked,
  Fingerprint,
  Flame,
  MessagesSquare,
  Search,
  Shield,
  Users,
} from "lucide-react";

export const iconosValores: Record<IconoValor, LucideIcon> = {
  curiosidad: Search,
  dialogo: MessagesSquare,
  dignidad: Shield,
  memoria: BookMarked,
  valentia: Flame,
  identidad: Fingerprint,
  comunidad: Users,
};
