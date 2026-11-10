"use client";

import type { ReactNode } from "react";

import { useEffect, useRef } from "react";

import { animacionesActivas, cargarAnime } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Timeline = { pause: () => void; play: () => void };

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Revela los hijos en cascada en lugar del contenedor completo. */
  escalonar?: boolean;
}

/**
 * Revelado al entrar en pantalla. El estado oculto se aplica desde JavaScript
 * únicamente cuando la preferencia guardada es `completo`; la limpieza y el
 * respaldo restauran los estilos si la animación no llega a ejecutarse.
 */
export function ScrollReveal({
  children,
  className,
  escalonar = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = ref.current;

    if (
      !elemento ||
      !animacionesActivas() ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let cancelado = false;
    let timeline: Timeline | undefined;
    let observer: IntersectionObserver | undefined;

    const destino = (
      escalonar ? Array.from(elemento.children) : [elemento]
    ).filter((nodo): nodo is HTMLElement => nodo instanceof HTMLElement);

    if (destino.length === 0) {
      return;
    }

    const mostrar = () => {
      destino.forEach((nodo) => {
        nodo.style.removeProperty("opacity");
        nodo.style.removeProperty("transform");
        nodo.style.removeProperty("will-change");
      });
    };

    destino.forEach((nodo) => {
      nodo.style.opacity = "0";
      nodo.style.transform = "translate3d(0, 1.5rem, 0)";
      nodo.style.willChange = "opacity, transform";
    });

    const revelar = async () => {
      try {
        const anime = await cargarAnime();

        if (cancelado) {
          mostrar();

          return;
        }

        timeline = anime
          .createTimeline({
            autoplay: false,
            defaults: { ease: "outExpo" },
          })
          .add(
            destino,
            {
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 700,
              delay: escalonar ? anime.stagger(80) : 0,
              onComplete: mostrar,
            },
            0,
          );

        timeline.play();
      } catch {
        mostrar();
      }
    };

    observer = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          observer?.disconnect();
          void revelar();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 },
    );

    observer.observe(elemento);

    return () => {
      cancelado = true;
      observer?.disconnect();
      timeline?.pause();
      mostrar();
    };
  }, [escalonar]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
