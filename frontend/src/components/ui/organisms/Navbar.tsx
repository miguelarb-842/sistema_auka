"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircleQuestion, Settings2 } from "lucide-react";

import { ButtonLink } from "../atoms/ButtonLink";
import { Logo } from "../atoms/Logo";
import { ThemeToggle } from "../molecules/ThemeToggle";

import { cn } from "@/lib/utils";
import { mainNavigation } from "@/config/navigation";

function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({
  etiquetaInstalacion,
}: {
  etiquetaInstalacion: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-separator/70 bg-background/80 backdrop-blur-xl">
      <div className="auka-container flex h-[var(--auka-header-height)] items-center justify-between gap-4">
        <Logo etiquetaInstalacion={etiquetaInstalacion} />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) => {
              const activo = esRutaActiva(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      activo
                        ? "bg-surface-secondary text-foreground"
                        : "text-muted hover:bg-surface-secondary/60 hover:text-foreground",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <ButtonLink
            isIconOnly
            aria-label="Abrir configuración"
            className="hidden text-muted sm:inline-flex"
            href="/configuracion"
            size="sm"
            variant="ghost"
          >
            <Settings2 aria-hidden="true" className="size-[1.15rem]" />
          </ButtonLink>
          <Link
            className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
            href="/chat"
          >
            <MessageCircleQuestion aria-hidden="true" className="size-4" />
            Conversar
          </Link>
        </div>
      </div>
    </header>
  );
}
