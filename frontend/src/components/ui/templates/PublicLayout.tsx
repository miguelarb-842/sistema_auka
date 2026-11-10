import type { ReactNode } from "react";

import { Footer } from "../organisms/Footer";
import { MobileBottomNav } from "../organisms/MobileBottomNav";
import { Navbar } from "../organisms/Navbar";
import { IntroPagina } from "../motion/IntroPagina";

interface PublicLayoutProps {
  children: ReactNode;
  etiquetaInstalacion: string;
}

export function PublicLayout({
  children,
  etiquetaInstalacion,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col pb-[var(--auka-mobile-nav-space)] lg:pb-0">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        href="#contenido"
      >
        Saltar al contenido
      </a>
      <IntroPagina />
      <Navbar etiquetaInstalacion={etiquetaInstalacion} />
      <main className="flex-1" id="contenido">
        {children}
      </main>
      <Footer etiquetaInstalacion={etiquetaInstalacion} />
      <MobileBottomNav />
    </div>
  );
}
