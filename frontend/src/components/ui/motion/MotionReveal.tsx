"use client";

import type { ReactNode } from "react";

import { useEffect, useRef } from "react";

import { animacionesActivas, cargarAnime } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePreferencias } from "@/modules/configuracion/context/PreferenciasProvider";

type AnimeAnimation = ReturnType<
  Awaited<ReturnType<typeof cargarAnime>>["animate"]
>;

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

/**
 * Envoltorio externo de animación.
 *
 * - Solo crea animaciones cuando la preferencia guardada es `completo`.
 * - Revela el contenido cuando entra al viewport.
 * - No modifica el DOM interno de las tarjetas de HeroUI.
 * - Con cualquier otra preferencia no oculta ni anima nada.
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
  const activo = movimiento === "completo";
  const retardo = delay + Math.min(index, 8) * 65;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (!activo || !animacionesActivas()) {
      element.dataset.reveal = "done";
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("will-change");

      return;
    }

    let animation: AnimeAnimation | undefined;
    let cancelado = false;

    const mostrar = () => {
      element.dataset.reveal = "done";
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("will-change");
    };

    // El estado oculto se aplica solo cuando la animación va a ejecutarse.
    element.style.opacity = "0";
    element.style.transform = "translate3d(0, 1.125rem, 0)";
    element.style.willChange = "opacity, transform";

    const revelar = async () => {
      try {
        const anime = await cargarAnime();

        if (cancelado || !element.isConnected) {
          mostrar();

          return;
        }

        element.dataset.reveal = "playing";

        animation = anime.animate(element, {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 720,
          delay: retardo,
          ease: "outCubic",
          onComplete: mostrar,
        });
      } catch {
        mostrar();
      }
    };

    const observer = new IntersectionObserver(
      (entradas) => {
        if (
          entradas.some((entrada) => entrada.isIntersecting) &&
          element.dataset.reveal !== "done"
        ) {
          observer.disconnect();
          void revelar();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(element);

    // Respaldo: si la hidratación o el observer fallan, nada queda oculto.
    const respaldo = window.setTimeout(mostrar, 3200);

    return () => {
      cancelado = true;
      observer.disconnect();
      window.clearTimeout(respaldo);
      animation?.cancel();
      mostrar();
    };
  }, [activo, retardo]);

  return (
    <div
      ref={ref}
      className={cn("anime-reveal", interactive && "anime-card", className)}
      data-reveal="pending"
      onPointerDown={
        interactive && activo
          ? () => {
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
