"use client";

import type { ConfigChat } from "@/modules/museo/types/museo.types";
import type { PerfilId } from "@/types/perfil.types";
import type { Mensaje } from "../types/chat.types";

import { useCallback, useEffect, useRef, useState } from "react";

import { enviarMensajeChat, ErrorChatApi } from "../services/chat-api.service";

import { crearId } from "@/lib/utils";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

const MENSAJE_ERROR =
  "No se pudo conectar con el agente en este momento. Revisá la conexión e intentá de nuevo.";
const MENSAJE_DETENIDO =
  "Respuesta detenida. Podés reformular la pregunta o escribir otra.";
const PREFIJO_SESION = "auka:chat:sesion:";

function crearBienvenida(config: ConfigChat, perfil: PerfilId): Mensaje {
  return {
    id: crearId("bienvenida"),
    autor: "asistente",
    contenido: config.bienvenida[perfil],
    tipo: "texto",
    // La bienvenida no lleva hora: un timestamp generado en el servidor
    // estático no coincidiría con el del cliente y rompería la hidratación.
    timestamp: 0,
  };
}

function claveSesion(configId: string): string {
  return `${PREFIJO_SESION}${configId}`;
}

function crearSesionId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return crearId("sesion");
}

function leerSesion(configId: string): string | null {
  try {
    return window.sessionStorage.getItem(claveSesion(configId));
  } catch {
    return null;
  }
}

function guardarSesion(configId: string, sesionId: string): void {
  try {
    window.sessionStorage.setItem(claveSesion(configId), sesionId);
  } catch {
    // sessionStorage puede no estar disponible en modo privado.
  }
}

function eliminarSesion(configId: string): void {
  try {
    window.sessionStorage.removeItem(claveSesion(configId));
  } catch {
    // No hay nada que limpiar si el almacenamiento no está disponible.
  }
}

export function useChat(config: ConfigChat) {
  const { perfil } = usePreferencias();
  const [mensajes, setMensajes] = useState<Mensaje[]>(() => [
    crearBienvenida(config, perfil),
  ]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [puedeReintentar, setPuedeReintentar] = useState(false);

  const solicitudRef = useRef(0);
  const enviandoRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const sesionRef = useRef<string | null>(null);
  const perfilAnteriorRef = useRef(perfil);
  const configAnteriorRef = useRef(config.id);
  const ultimoFallidoRef = useRef<string | null>(null);

  const obtenerSesionId = useCallback((): string => {
    if (sesionRef.current) {
      return sesionRef.current;
    }

    const sesion = leerSesion(config.id) ?? crearSesionId();

    guardarSesion(config.id, sesion);
    sesionRef.current = sesion;

    return sesion;
  }, [config.id]);

  const limpiarEstadoError = useCallback(() => {
    setError(null);
    setPuedeReintentar(false);
    ultimoFallidoRef.current = null;
  }, []);

  const cancelarRespuestaPendiente = useCallback(() => {
    solicitudRef.current += 1;
    enviandoRef.current = false;
    abortRef.current?.abort();
    abortRef.current = null;
    setEscribiendo(false);
  }, []);

  useEffect(() => {
    const cambioPerfil = perfilAnteriorRef.current !== perfil;
    const cambioConfig = configAnteriorRef.current !== config.id;

    if (!cambioPerfil && !cambioConfig) {
      return;
    }

    const configAnterior = configAnteriorRef.current;

    perfilAnteriorRef.current = perfil;
    configAnteriorRef.current = config.id;
    cancelarRespuestaPendiente();
    limpiarEstadoError();

    if (cambioConfig) {
      eliminarSesion(configAnterior);
    }

    if (cambioPerfil) {
      eliminarSesion(config.id);
    }

    sesionRef.current = null;
    setMensajes([crearBienvenida(config, perfil)]);
  }, [config, cancelarRespuestaPendiente, limpiarEstadoError, perfil]);

  useEffect(() => {
    return () => {
      solicitudRef.current += 1;
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  const ejecutarEnvio = useCallback(
    async (
      textoIngresado: string,
      agregarVisitante: boolean,
    ): Promise<boolean> => {
      const texto = textoIngresado.trim();

      if (!texto || enviandoRef.current) {
        return false;
      }

      const solicitud = solicitudRef.current + 1;
      const perfilSolicitud = perfil;
      const sesionId = obtenerSesionId();
      const controller = new AbortController();

      solicitudRef.current = solicitud;
      enviandoRef.current = true;
      abortRef.current = controller;
      setError(null);
      setPuedeReintentar(false);

      if (agregarVisitante) {
        const mensajeVisitante: Mensaje = {
          id: crearId("visitante"),
          autor: "visitante",
          contenido: texto,
          tipo: "texto",
          timestamp: Date.now(),
        };

        setMensajes((anteriores) => [...anteriores, mensajeVisitante]);
      }

      setEscribiendo(true);

      try {
        const datos = await enviarMensajeChat(
          {
            conversacionId: config.id,
            mensaje: texto,
            sesionId,
            perfil: perfilSolicitud,
          },
          controller.signal,
        );

        if (solicitud !== solicitudRef.current) {
          return false;
        }

        sesionRef.current = datos.sesionId;
        guardarSesion(config.id, datos.sesionId);
        ultimoFallidoRef.current = null;
        setMensajes((anteriores) => [
          ...anteriores,
          {
            id: crearId("asistente"),
            autor: "asistente",
            contenido: datos.respuesta.contenido,
            tipo: datos.respuesta.tipo,
            timestamp: datos.respuesta.timestamp,
          },
        ]);

        return true;
      } catch (fallo) {
        if (controller.signal.aborted || solicitud !== solicitudRef.current) {
          return false;
        }

        const contenido =
          fallo instanceof ErrorChatApi ? fallo.message : MENSAJE_ERROR;

        ultimoFallidoRef.current = texto;
        setError(contenido);
        setPuedeReintentar(true);

        // El error se muestra en el banner accesible sobre el compositor;
        // no se duplica como mensaje dentro del historial.
        return true;
      } finally {
        if (solicitud === solicitudRef.current) {
          enviandoRef.current = false;
          abortRef.current = null;
          setEscribiendo(false);
        }
      }
    },
    [config.id, obtenerSesionId, perfil],
  );

  const enviar = useCallback(
    (texto: string) => ejecutarEnvio(texto, true),
    [ejecutarEnvio],
  );

  const detener = useCallback(() => {
    if (!enviandoRef.current) {
      return;
    }

    cancelarRespuestaPendiente();
    limpiarEstadoError();
    setMensajes((anteriores) => [
      ...anteriores,
      {
        id: crearId("sistema"),
        autor: "asistente",
        contenido: MENSAJE_DETENIDO,
        tipo: "sistema",
        timestamp: Date.now(),
      },
    ]);
  }, [cancelarRespuestaPendiente, limpiarEstadoError]);

  const reintentar = useCallback(async (): Promise<boolean> => {
    const texto = ultimoFallidoRef.current;

    if (!texto) {
      return false;
    }

    return ejecutarEnvio(texto, false);
  }, [ejecutarEnvio]);

  const descartarError = useCallback(() => {
    limpiarEstadoError();
  }, [limpiarEstadoError]);

  const reiniciar = useCallback(() => {
    cancelarRespuestaPendiente();
    limpiarEstadoError();
    eliminarSesion(config.id);
    sesionRef.current = null;
    setMensajes([crearBienvenida(config, perfil)]);
  }, [cancelarRespuestaPendiente, limpiarEstadoError, config, perfil]);

  const pedirReto = useCallback(() => enviar("Proponeme un reto"), [enviar]);

  const pedirPista = useCallback(() => enviar("Dame una pista"), [enviar]);

  return {
    mensajes,
    escribiendo,
    error,
    puedeReintentar,
    enviar,
    detener,
    reintentar,
    descartarError,
    reiniciar,
    pedirReto,
    pedirPista,
  };
}
