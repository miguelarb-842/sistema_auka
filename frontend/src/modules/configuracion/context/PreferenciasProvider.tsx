"use client";

import type { ReactNode } from "react";
import type { PerfilId } from "@/types/perfil.types";
import type {
  MovimientoPreferido,
  TamanoTexto,
} from "../types/preferencias.types";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  aplicarMovimientoEnDocumento,
  aplicarPerfilEnDocumento,
  aplicarTamanoTextoEnDocumento,
  guardarMovimiento,
  guardarPerfil,
  guardarTamanoTexto,
  leerMovimiento,
  leerPerfil,
  leerTamanoTexto,
  limpiarPreferencias,
} from "../services/preferencias.storage";

interface PreferenciasContextValue {
  perfil: PerfilId;
  tamanoTexto: TamanoTexto;
  movimiento: MovimientoPreferido;
  tienePerfil: boolean;
  hidratado: boolean;
  setPerfil: (perfil: PerfilId) => void;
  setTamanoTexto: (tamano: TamanoTexto) => void;
  setMovimiento: (movimiento: MovimientoPreferido) => void;
  resetearPreferencias: () => void;
}

const PreferenciasContext = createContext<PreferenciasContextValue | null>(
  null,
);

const PERFIL_INICIAL: PerfilId = "adolescente";
const TAMANO_INICIAL: TamanoTexto = "md";
const MOVIMIENTO_INICIAL: MovimientoPreferido = "sistema";

export function PreferenciasProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<PerfilId>(PERFIL_INICIAL);
  const [tamanoTexto, setTamanoTextoState] =
    useState<TamanoTexto>(TAMANO_INICIAL);
  const [movimiento, setMovimientoState] =
    useState<MovimientoPreferido>(MOVIMIENTO_INICIAL);
  const [tienePerfil, setTienePerfil] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const perfilGuardado = leerPerfil();
    const tamanoGuardado = leerTamanoTexto();
    const movimientoGuardado = leerMovimiento();

    if (perfilGuardado) {
      setPerfilState(perfilGuardado);
      setTienePerfil(true);
      aplicarPerfilEnDocumento(perfilGuardado);
    }

    if (tamanoGuardado) {
      setTamanoTextoState(tamanoGuardado);
      aplicarTamanoTextoEnDocumento(tamanoGuardado);
    }

    if (movimientoGuardado) {
      setMovimientoState(movimientoGuardado);
    }

    aplicarMovimientoEnDocumento(movimientoGuardado ?? MOVIMIENTO_INICIAL);
    setHidratado(true);
  }, []);

  useEffect(() => {
    aplicarTamanoTextoEnDocumento(tamanoTexto);
  }, [tamanoTexto]);

  useEffect(() => {
    aplicarMovimientoEnDocumento(movimiento);

    if (movimiento !== "sistema" || typeof window === "undefined") {
      return;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sincronizar = () => aplicarMovimientoEnDocumento("sistema");

    query.addEventListener("change", sincronizar);

    return () => query.removeEventListener("change", sincronizar);
  }, [movimiento]);

  const setPerfil = useCallback((nuevoPerfil: PerfilId) => {
    setPerfilState(nuevoPerfil);
    setTienePerfil(true);
    guardarPerfil(nuevoPerfil);
    aplicarPerfilEnDocumento(nuevoPerfil);
  }, []);

  const setTamanoTexto = useCallback((nuevoTamano: TamanoTexto) => {
    setTamanoTextoState(nuevoTamano);
    guardarTamanoTexto(nuevoTamano);
    aplicarTamanoTextoEnDocumento(nuevoTamano);
  }, []);

  const setMovimiento = useCallback((nuevoMovimiento: MovimientoPreferido) => {
    setMovimientoState(nuevoMovimiento);
    guardarMovimiento(nuevoMovimiento);
    aplicarMovimientoEnDocumento(nuevoMovimiento);
  }, []);

  const resetearPreferencias = useCallback(() => {
    limpiarPreferencias();
    setPerfilState(PERFIL_INICIAL);
    setTamanoTextoState(TAMANO_INICIAL);
    setMovimientoState(MOVIMIENTO_INICIAL);
    setTienePerfil(false);
    aplicarTamanoTextoEnDocumento(TAMANO_INICIAL);
    aplicarMovimientoEnDocumento(MOVIMIENTO_INICIAL);
  }, []);

  const value = useMemo(
    () => ({
      perfil,
      tamanoTexto,
      movimiento,
      tienePerfil,
      hidratado,
      setPerfil,
      setTamanoTexto,
      setMovimiento,
      resetearPreferencias,
    }),
    [
      perfil,
      tamanoTexto,
      movimiento,
      tienePerfil,
      hidratado,
      setPerfil,
      setTamanoTexto,
      setMovimiento,
      resetearPreferencias,
    ],
  );

  return (
    <PreferenciasContext.Provider value={value}>
      {children}
    </PreferenciasContext.Provider>
  );
}

export function usePreferencias(): PreferenciasContextValue {
  const context = useContext(PreferenciasContext);

  if (!context) {
    throw new Error(
      "usePreferencias debe usarse dentro de PreferenciasProvider",
    );
  }

  return context;
}
