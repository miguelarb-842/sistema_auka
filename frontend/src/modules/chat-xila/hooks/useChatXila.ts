"use client";

import type { PerfilId } from "@/types/perfil.types";
import type { AsistenteXila, Mensaje } from "../types/chat.types";

import { useCallback, useEffect, useRef, useState } from "react";

import { simuladorXila } from "../services/simulador.service";

import { crearId } from "@/lib/utils";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

function crearBienvenida(asistente: AsistenteXila, perfil: PerfilId): Mensaje {
  return {
    id: crearId("bienvenida"),
    autor: "xila",
    contenido: asistente.bienvenida[perfil],
    tipo: "texto",
    timestamp: Date.now(),
  };
}

export function useChatXila(asistente: AsistenteXila) {
  const { perfil } = usePreferencias();
  const [mensajes, setMensajes] = useState<Mensaje[]>(() => [
    crearBienvenida(asistente, perfil),
  ]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [indiceReto, setIndiceReto] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const perfilAnteriorRef = useRef(perfil);

  const cancelarRespuestaPendiente = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setEscribiendo(false);
  }, []);

  useEffect(() => {
    if (perfilAnteriorRef.current === perfil) {
      return;
    }

    perfilAnteriorRef.current = perfil;
    cancelarRespuestaPendiente();

    setMensajes([crearBienvenida(asistente, perfil)]);
    setIndiceReto(0);
  }, [asistente, cancelarRespuestaPendiente, perfil]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const enviar = useCallback(
    (textoIngresado: string) => {
      const texto = textoIngresado.trim();

      if (!texto || escribiendo) {
        return;
      }

      const mensajeVisitante: Mensaje = {
        id: crearId("visitante"),
        autor: "visitante",
        contenido: texto,
        tipo: "texto",
        timestamp: Date.now(),
      };

      setMensajes((anteriores) => [...anteriores, mensajeVisitante]);
      setEscribiendo(true);

      const demora = 620 + Math.round(Math.random() * 420);

      timeoutRef.current = window.setTimeout(() => {
        const respuesta = simuladorXila.responder({
          asistente,
          perfil,
          indiceReto,
          texto,
        });

        setIndiceReto(respuesta.siguienteIndiceReto);
        setMensajes((anteriores) => [
          ...anteriores,
          {
            id: crearId("xila"),
            autor: "xila",
            contenido: respuesta.contenido,
            tipo: respuesta.tipo,
            reto: respuesta.reto,
            timestamp: Date.now(),
          },
        ]);
        setEscribiendo(false);
        timeoutRef.current = null;
      }, demora);
    },
    [asistente, escribiendo, indiceReto, perfil],
  );

  const reiniciar = useCallback(() => {
    cancelarRespuestaPendiente();
    setMensajes([crearBienvenida(asistente, perfil)]);
    setIndiceReto(0);
  }, [asistente, cancelarRespuestaPendiente, perfil]);

  const pedirReto = useCallback(() => enviar("Proponeme un reto"), [enviar]);
  const pedirPista = useCallback(() => enviar("Dame una pista"), [enviar]);

  return {
    mensajes,
    escribiendo,
    indiceReto,
    enviar,
    reiniciar,
    pedirReto,
    pedirPista,
  };
}
