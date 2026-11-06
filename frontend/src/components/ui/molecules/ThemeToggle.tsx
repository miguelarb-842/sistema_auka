"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const esOscuro = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      aria-label={
        mounted
          ? esOscuro
            ? "Cambiar a tema claro"
            : "Cambiar a tema oscuro"
          : "Cambiar tema"
      }
      className="text-muted data-[hovered=true]:text-foreground"
      isDisabled={!mounted}
      size="sm"
      variant="ghost"
      onPress={() => setTheme(esOscuro ? "light" : "dark")}
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
    </Button>
  );
}
