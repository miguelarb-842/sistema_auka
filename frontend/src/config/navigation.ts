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
    description: "Recorré las salas del museo",
    icon: Landmark,
  },
  {
    href: "/personajes",
    label: "Personajes",
    description: "Conocé personajes y agrupación invitada",
    icon: UsersRound,
  },
  {
    href: "/chat",
    label: "Conversaciones",
    description: "Guía general, agentes de sala y personajes",
    icon: MessageCircleQuestion,
  },
  {
    href: "/acerca",
    label: "Acerca de la App",
    description: "Qué es Sistema Auka y qué es esta simulación",
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
    label: "Conversar",
    description: "Elegí una voz del museo",
    icon: Sparkles,
  },
] as const;
