"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircleQuestion, Settings2, X } from "lucide-react";
import { Button, Drawer, Separator, useOverlayState } from "@heroui/react";

import { ButtonLink } from "../atoms/ButtonLink";
import { Logo } from "../atoms/Logo";
import { ThemeToggle } from "../molecules/ThemeToggle";

import { cn } from "@/lib/utils";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

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
  const drawer = useOverlayState();
  const {
    close: cerrarDrawer,
    open: abrirDrawer,
    isOpen: menuAbierto,
  } = drawer;

  useEffect(() => {
    cerrarDrawer();
  }, [pathname, cerrarDrawer]);

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
          <Button
            isIconOnly
            aria-label={
              menuAbierto ? "Cerrar menú" : "Abrir menú de navegación"
            }
            className="lg:hidden"
            size="sm"
            variant="ghost"
            onPress={abrirDrawer}
          >
            <Menu aria-hidden="true" className="size-5" />
          </Button>
        </div>
      </div>

      <Drawer state={drawer}>
        <Drawer.Backdrop>
          <Drawer.Content placement="right">
            <Drawer.Dialog className="flex h-full flex-col">
              <Drawer.Header className="flex items-center justify-between gap-4">
                <Drawer.Heading>Menú</Drawer.Heading>
                <Drawer.CloseTrigger aria-label="Cerrar menú">
                  <X aria-hidden="true" className="size-4" />
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body className="flex flex-1 flex-col gap-2">
                {mainNavigation.map((item) => {
                  const Icono = item.icon;
                  const activo = esRutaActiva(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      aria-current={activo ? "page" : undefined}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3 transition-colors",
                        activo
                          ? "border-border bg-surface-secondary"
                          : "border-transparent hover:bg-surface-secondary/70",
                      )}
                      href={item.href}
                      onClick={() => cerrarDrawer()}
                    >
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-muted">
                        <Icono aria-hidden="true" className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}

                <Separator className="my-2" />

                <Link
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors hover:bg-surface-secondary/70"
                  href="/configuracion"
                  onClick={() => cerrarDrawer()}
                >
                  <Settings2 aria-hidden="true" className="size-4 text-muted" />
                  Configuración
                </Link>

                <Link
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
                  href="/chat"
                  onClick={() => cerrarDrawer()}
                >
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="size-4"
                  />
                  Conversar
                </Link>
              </Drawer.Body>
              <Drawer.Footer className="border-t border-separator pt-4">
                <p className="text-xs leading-relaxed text-muted">
                  {siteConfig.slogan}
                </p>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
