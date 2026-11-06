"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { PreferenciasProvider } from "@/modules/configuracion/context/PreferenciasProvider";
import { PerfilOnboarding } from "@/modules/configuracion/components/PerfilOnboarding";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="auka:tema"
    >
      <PreferenciasProvider>
        {children}
        <PerfilOnboarding />
      </PreferenciasProvider>
    </ThemeProvider>
  );
}
