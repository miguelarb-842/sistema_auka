"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Landmark,
  MessageCircleQuestion,
  Settings2,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNavigation } from "@/config/navigation";

const iconos = {
  "/salas": Landmark,
  "/personajes": UsersRound,
  "/chat": MessageCircleQuestion,
  "/acerca": BookOpen,
} as const;

function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Navegación inferior exclusiva para móvil.
 *
 * Reemplaza el drawer anterior: las mismas rutas, sin duplicar el menú y sin
 * cargar el componente Drawer de HeroUI. En escritorio la navbar permanece
 * intacta.
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación móvil"
      className="auka-mobile-nav animate-auka-nav-in fixed inset-x-0 bottom-0 z-50 border-t border-separator/80 bg-background/92 backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex h-[var(--auka-mobile-nav-height)] max-w-lg items-stretch justify-around px-2">
        {mainNavigation.map((item) => {
          const Icono = iconos[item.href as keyof typeof iconos] ?? Landmark;
          const activo = esRutaActiva(pathname, item.href);
          const esChat = item.href === "/chat";

          return (
            <li key={item.href} className="flex min-w-0 flex-1">
              <Link
                aria-current={activo ? "page" : undefined}
                className={cn(
                  "group relative flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.62rem] font-medium transition-colors",
                  activo
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                href={item.href}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid place-items-center rounded-full transition-colors",
                    esChat
                      ? activo
                        ? "size-10 bg-accent text-accent-foreground shadow-sm"
                        : "size-10 bg-foreground text-background"
                      : "size-8",
                    !esChat && activo && "bg-surface-secondary",
                  )}
                >
                  <Icono
                    className={cn(esChat ? "size-[1.15rem]" : "size-[1.05rem]")}
                  />
                </span>
                <span className="truncate">
                  {esChat ? "Conversar" : item.label}
                </span>
                {activo ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0.5 size-1 rounded-full bg-foreground",
                      esChat && "hidden",
                    )}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}

        <li className="flex min-w-0 flex-1">
          <Link
            aria-current={
              esRutaActiva(pathname, "/configuracion") ? "page" : undefined
            }
            className={cn(
              "group relative flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.62rem] font-medium transition-colors",
              esRutaActiva(pathname, "/configuracion")
                ? "text-foreground"
                : "text-muted hover:text-foreground",
            )}
            href="/configuracion"
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 place-items-center rounded-full transition-colors",
                esRutaActiva(pathname, "/configuracion") &&
                  "bg-surface-secondary",
              )}
            >
              <Settings2 className="size-[1.05rem]" />
            </span>
            <span className="truncate">Ajustes</span>
            {esRutaActiva(pathname, "/configuracion") ? (
              <span
                aria-hidden="true"
                className="absolute bottom-0.5 size-1 rounded-full bg-foreground"
              />
            ) : null}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
