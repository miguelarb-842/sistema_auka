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
const PREFIJO_SESION = "auka:chat:sesion:";

function crearBienvenida(config: ConfigChat, perfil: PerfilId): Mensaje {
  return {
    id: crearId("bienvenida"),
    autor: "asistente",
    contenido: config.bienvenida[perfil],
    tipo: "texto",
    timestamp: Date.now(),
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
  const solicitudRef = useRef(0);
  const enviandoRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const sesionRef = useRef<string | null>(null);
  const perfilAnteriorRef = useRef(perfil);
  const configAnteriorRef = useRef(config.id);

  const obtenerSesionId = useCallback((): string => {
    if (sesionRef.current) {
      return sesionRef.current;
    }

    const sesion = leerSesion(config.id) ?? crearSesionId();

    guardarSesion(config.id, sesion);
    sesionRef.current = sesion;

    return sesion;
  }, [config.id]);

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

    if (cambioConfig) {
      eliminarSesion(configAnterior);
    }

    if (cambioPerfil) {
      eliminarSesion(config.id);
    }

    sesionRef.current = null;
    setMensajes([crearBienvenida(config, perfil)]);
  }, [config, cancelarRespuestaPendiente, perfil]);

  useEffect(() => {
    return () => {
      solicitudRef.current += 1;
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  const enviar = useCallback(
    async (textoIngresado: string) => {
      const texto = textoIngresado.trim();

      if (!texto || enviandoRef.current) {
        return;
      }

      const solicitud = solicitudRef.current + 1;
      const perfilSolicitud = perfil;
      const sesionId = obtenerSesionId();
      const controller = new AbortController();

      solicitudRef.current = solicitud;
      enviandoRef.current = true;
      abortRef.current = controller;

      const mensajeVisitante: Mensaje = {
        id: crearId("visitante"),
        autor: "visitante",
        contenido: texto,
        tipo: "texto",
        timestamp: Date.now(),
      };

      setMensajes((anteriores) => [...anteriores, mensajeVisitante]);
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
          return;
        }

        sesionRef.current = datos.sesionId;
        guardarSesion(config.id, datos.sesionId);
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
      } catch (error) {
        if (controller.signal.aborted || solicitud !== solicitudRef.current) {
          return;
        }

        const contenido =
          error instanceof ErrorChatApi ? error.message : MENSAJE_ERROR;

        setMensajes((anteriores) => [
          ...anteriores,
          {
            id: crearId("sistema"),
            autor: "asistente",
            contenido,
            tipo: "sistema",
            timestamp: Date.now(),
          },
        ]);
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

  const reiniciar = useCallback(() => {
    cancelarRespuestaPendiente();
    eliminarSesion(config.id);
    sesionRef.current = null;
    setMensajes([crearBienvenida(config, perfil)]);
  }, [cancelarRespuestaPendiente, config, perfil]);

  const pedirReto = useCallback(() => {
    void enviar("Proponeme un reto");
  }, [enviar]);

  const pedirPista = useCallback(() => {
    void enviar("Dame una pista");
  }, [enviar]);

  return {
    mensajes,
    escribiendo,
    enviar,
    reiniciar,
    pedirReto,
    pedirPista,
  };
}
