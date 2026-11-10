"use client";

import type { RefObject } from "react";

import { useEffect, useRef } from "react";

import { animacionesActivas, cargarAnime } from "@/lib/motion";

type Timeline = { pause: () => void; play: () => void };

interface Medida {
  x: string;
  ancho: string;
}

interface IndicadorBarraProps {
  contenedor: RefObject<HTMLElement | null>;
  claveRuta: string;
}

/**
 * Línea que se desliza debajo del ítem activo de la barra inferior.
 *
 * Sin la preferencia `completo` se coloca directamente en su posición final.
 * La animación se reinicia al cambiar de ruta y se recoloca al redimensionar.
 */
export function IndicadorBarra({ contenedor, claveRuta }: IndicadorBarraProps) {
  const indicadorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const indicador = indicadorRef.current;
    const base = contenedor.current;

    if (!indicador || !base) {
      return;
    }

    let cancelado = false;
    let timeline: Timeline | undefined;

    const medir = (): Medida | null => {
      const item = base.querySelector<HTMLElement>('[aria-current="page"]');

      if (!item) {
        return null;
      }

      const rectBase = base.getBoundingClientRect();
      const rectItem = item.getBoundingClientRect();

      if (rectItem.width === 0 || rectBase.width === 0) {
        return null;
      }

      return {
        x: `${rectItem.left - rectBase.left}px`,
        ancho: `${rectItem.width}px`,
      };
    };

    const colocar = (medida: Medida) => {
      indicador.style.transform = `translateX(${medida.x})`;
      indicador.style.width = medida.ancho;
    };

    const medida = medir();

    if (!medida) {
      return;
    }

    if (!animacionesActivas()) {
      colocar(medida);
      indicador.dataset.estado = "listo";
    } else {
      const animar = async () => {
        try {
          const anime = await cargarAnime();

          if (cancelado) {
            return;
          }

          timeline = anime
            .createTimeline({
              autoplay: false,
              defaults: { ease: "outExpo" },
            })
            .add(
              indicador,
              { translateX: medida.x, width: medida.ancho, duration: 350 },
              0,
            )
            .add(indicador, { scaleX: [0.92, 1], duration: 200 }, "-=120")
            .call(() => {
              indicador.dataset.estado = "listo";
            });

          timeline.play();
        } catch {
          colocar(medida);
          indicador.dataset.estado = "listo";
        }
      };

      void animar();
    }

    const recolocar = () => {
      const nueva = medir();

      if (!nueva) {
        return;
      }

      timeline?.pause();
      timeline = undefined;
      colocar(nueva);
      indicador.dataset.estado = "listo";
    };

    const observer = new ResizeObserver(recolocar);

    observer.observe(base);

    return () => {
      cancelado = true;
      observer.disconnect();
      timeline?.pause();
    };
  }, [contenedor, claveRuta]);

  return (
    <span
      ref={indicadorRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 h-[3px] rounded-full bg-foreground"
      data-estado="pendiente"
    />
  );
}
