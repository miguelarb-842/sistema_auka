"use client";

import type { ReactNode } from "react";
import type { PerfilId } from "@/types/perfil.types";
import type { TamanoTexto } from "../types/preferencias.types";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  aplicarPerfilEnDocumento,
  aplicarTamanoTextoEnDocumento,
  guardarPerfil,
  guardarTamanoTexto,
  leerPerfil,
  leerTamanoTexto,
  limpiarPreferencias,
} from "../services/preferencias.storage";

interface PreferenciasContextValue {
  perfil: PerfilId;
  tamanoTexto: TamanoTexto;
  tienePerfil: boolean;
  hidratado: boolean;
  setPerfil: (perfil: PerfilId) => void;
  setTamanoTexto: (tamano: TamanoTexto) => void;
  resetearPreferencias: () => void;
}

const PreferenciasContext = createContext<PreferenciasContextValue | null>(
  null,
);

const PERFIL_INICIAL: PerfilId = "adolescente";
const TAMANO_INICIAL: TamanoTexto = "md";

export function PreferenciasProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<PerfilId>(PERFIL_INICIAL);
  const [tamanoTexto, setTamanoTextoState] =
    useState<TamanoTexto>(TAMANO_INICIAL);
  const [tienePerfil, setTienePerfil] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const perfilGuardado = leerPerfil();
    const tamanoGuardado = leerTamanoTexto();

    if (perfilGuardado) {
      setPerfilState(perfilGuardado);
      setTienePerfil(true);
      aplicarPerfilEnDocumento(perfilGuardado);
    }

    if (tamanoGuardado) {
      setTamanoTextoState(tamanoGuardado);
      aplicarTamanoTextoEnDocumento(tamanoGuardado);
    }

    setHidratado(true);
  }, []);

  useEffect(() => {
    aplicarTamanoTextoEnDocumento(tamanoTexto);

    return () => {
      // No se restaura el atributo: la preferencia persiste durante la sesión.
    };
  }, [tamanoTexto]);

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

  const resetearPreferencias = useCallback(() => {
    limpiarPreferencias();
    setPerfilState(PERFIL_INICIAL);
    setTamanoTextoState(TAMANO_INICIAL);
    setTienePerfil(false);
    aplicarTamanoTextoEnDocumento(TAMANO_INICIAL);
  }, []);

  const value = useMemo(
    () => ({
      perfil,
      tamanoTexto,
      tienePerfil,
      hidratado,
      setPerfil,
      setTamanoTexto,
      resetearPreferencias,
    }),
    [
      perfil,
      tamanoTexto,
      tienePerfil,
      hidratado,
      setPerfil,
      setTamanoTexto,
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
