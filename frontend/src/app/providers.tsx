"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { PerfilOnboardingGate } from "@/modules/configuracion/components/PerfilOnboardingGate";
import { PreferenciasProvider } from "@/modules/configuracion/context/PreferenciasProvider";

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
        <PerfilOnboardingGate />
      </PreferenciasProvider>
    </ThemeProvider>
  );
}
