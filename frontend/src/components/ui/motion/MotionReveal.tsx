"use client";

import type { ReactNode } from "react";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";
import { resolverMovimiento } from "@/modules/configuracion/services/preferencias.storage";

type AnimeModule = typeof import("animejs");
type AnimeAnimation = ReturnType<AnimeModule["animate"]>;

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo base en milisegundos. */
  delay?: number;
  /** Posición en una cuadrícula; añade un escalonado corto. */
  index?: number;
  /** Añade una pulsación táctil al presionar la tarjeta. */
  interactive?: boolean;
  /** Escala máxima de la pulsación. */
  tapScale?: number;
}

let animePromise: Promise<AnimeModule> | null = null;

function cargarAnime(): Promise<AnimeModule> {
  animePromise ??= import("animejs");

  return animePromise;
}

/**
 * Envoltorio externo de animación.
 *
 * - Revela el contenido con Anime.js cuando entra al viewport.
 * - En tarjetas, añade una pulsación breve al tocar (no depende de hover).
 * - No modifica el DOM interno de las tarjetas de HeroUI.
 * - Con movimiento reducido no oculta ni anima nada.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  index = 0,
  interactive = false,
  tapScale = 0.975,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { movimiento } = usePreferencias();
  const reducido = resolverMovimiento(movimiento) === "reduced";
  const retardo = delay + Math.min(index, 8) * 65;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (reducido) {
      element.dataset.reveal = "done";
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");

      return;
    }

    let animation: AnimeAnimation | undefined;
    let cancelado = false;

    const revelar = async () => {
      const anime = await cargarAnime();

      if (cancelado || !element.isConnected) {
        return;
      }

      element.dataset.reveal = "playing";

      animation = anime.animate(element, {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 720,
        delay: retardo,
        ease: "outCubic",
        onComplete: () => {
          element.dataset.reveal = "done";
          element.style.removeProperty("will-change");
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void revelar();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(element);

    // Si la hidratación o el observer fallan, el contenido nunca queda oculto.
    const respaldo = window.setTimeout(() => {
      if (element.dataset.reveal === "pending") {
        element.dataset.reveal = "done";
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    }, 2400);

    return () => {
      cancelado = true;
      observer.disconnect();
      window.clearTimeout(respaldo);
      animation?.cancel();
    };
  }, [reducido, retardo]);

  return (
    <div
      ref={ref}
      className={cn("anime-reveal", interactive && "anime-card", className)}
      data-reveal="pending"
      onPointerDown={
        interactive
          ? () => {
              if (reducido) {
                return;
              }

              void cargarAnime().then((anime) => {
                const element = ref.current;

                if (!element || !element.isConnected) {
                  return;
                }

                anime.animate(element, {
                  scale: [1, tapScale, 1],
                  duration: 330,
                  ease: "outCubic",
                });
              });
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
