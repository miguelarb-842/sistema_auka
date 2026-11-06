import type { LucideIcon } from "lucide-react";

import {
  BookOpen,
  Landmark,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
  UsersRound,
} from "lucide-react";

export interface NavigationLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const mainNavigation: readonly NavigationLink[] = [
  {
    href: "/salas",
    label: "Salas",
    description: "Recorré las salas del museo digital",
    icon: Landmark,
  },
  {
    href: "/personajes",
    label: "Personajes",
    description: "Conocé figuras y pueblos de nuestra historia",
    icon: UsersRound,
  },
  {
    href: "/chat",
    label: "Chat Xila",
    description: "Conversá con una versión de Xila",
    icon: MessageCircleQuestion,
  },
  {
    href: "/acerca",
    label: "Acerca de la App",
    description: "Qué es Auka y qué es Xila",
    icon: BookOpen,
  },
] as const;

export const secondaryNavigation: readonly NavigationLink[] = [
  {
    href: "/configuracion",
    label: "Configuración",
    description: "Tema, tipografía y perfil de visitante",
    icon: Settings2,
  },
  {
    href: "/chat",
    label: "Conversar con Xila",
    description: "La historia se piensa, no se copia",
    icon: Sparkles,
  },
] as const;
