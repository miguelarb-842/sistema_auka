import Link from "next/link";
import { CircleHelp, Heart } from "lucide-react";

import { Logo } from "../atoms/Logo";

import { siteConfig } from "@/config/site";
import { mainNavigation } from "@/config/navigation";

export function Footer({
  etiquetaInstalacion,
}: {
  etiquetaInstalacion: string;
}) {
  return (
    <footer className="mt-20 border-t border-separator bg-surface/40">
      <div className="auka-container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo etiquetaInstalacion={etiquetaInstalacion} />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {siteConfig.productDescription}
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              «{siteConfig.slogan}»
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Explorar
            </h2>
            <ul className="mt-4 space-y-2.5">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-muted transition-colors hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Proyecto
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  href="/acerca"
                >
                  Acerca de la App
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  href="/configuracion"
                >
                  Configuración
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted">{siteConfig.name}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-separator pt-6 text-xs leading-relaxed text-muted md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-2">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              Contenido demostrativo y por verificar. La información definitiva
              será entregada por el equipo del museo.
            </span>
          </p>
          <p className="flex shrink-0 items-center gap-1.5">
            Hecho con <Heart aria-hidden="true" className="size-3.5" /> para
            pensar lo que vemos · {siteConfig.year}
          </p>
        </div>
      </div>
    </footer>
  );
}
