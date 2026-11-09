"use client";

import dynamic from "next/dynamic";

import { usePreferencias } from "../context/PreferenciasProvider";

/**
 * Carga el onboarding solo cuando realmente hace falta.
 *
 * El chunk del modal de HeroUI no entra en el JS inicial y tampoco se descarga
 * para quienes ya eligieron un perfil.
 */
const PerfilOnboarding = dynamic(
  () => import("./PerfilOnboarding").then((modulo) => modulo.PerfilOnboarding),
  { ssr: false },
);

export function PerfilOnboardingGate() {
  const { hidratado, tienePerfil } = usePreferencias();

  if (!hidratado || tienePerfil) {
    return null;
  }

  return <PerfilOnboarding />;
}
