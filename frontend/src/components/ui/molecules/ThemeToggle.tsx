"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Botón de tema sin HeroUI.
 *
 * El navbar y la barra inferior móvil se renderizan en todas las rutas, así
 * que conviene mantener este control fuera del bundle de componentes grandes.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const esOscuro = resolvedTheme === "dark";

  return (
    <button
      aria-label={
        mounted
          ? esOscuro
            ? "Cambiar a tema claro"
            : "Cambiar a tema oscuro"
          : "Cambiar tema"
      }
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50"
      disabled={!mounted}
      type="button"
      onClick={() => setTheme(esOscuro ? "light" : "dark")}
    >
      {mounted ? (
        esOscuro ? (
          <Sun aria-hidden="true" className="size-[1.15rem]" />
        ) : (
          <Moon aria-hidden="true" className="size-[1.15rem]" />
        )
      ) : (
        <span aria-hidden="true" className="size-[1.15rem]" />
      )}
    </button>
  );
}
