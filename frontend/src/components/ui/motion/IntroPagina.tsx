"use client";

import { useEffect } from "react";

import { animacionesActivas, cargarAnime } from "@/lib/motion";

type Timeline = { pause: () => void };

/**
 * Intro de página: logo, título y contenido aparecen en secuencia.
 *
 * Se monta una sola vez en el layout público, por lo que se ejecuta una vez por
 * visita y no en cada navegación interna. No oculta nada antes de comprobar
 * que la preferencia guardada es `completo`; si algo falla, el contenido queda
 * visible en su estado final.
 */
export function IntroPagina() {
  useEffect(() => {
    if (!animacionesActivas()) {
      return;
    }

    let cancelado = false;
    let timeline: Timeline | undefined;

    const iniciar = async () => {
      try {
        const anime = await cargarAnime();

        if (cancelado) {
          return;
        }

        const logo = document.querySelector<HTMLElement>("[data-intro-logo]");
        const titulo = document.querySelector<HTMLElement>("#contenido h1");
        const contenido = document.querySelector<HTMLElement>(
          "#contenido [data-intro-contenido]",
        );

        if (!logo || !titulo) {
          return;
        }

        const principal = anime
          .createTimeline({
            autoplay: false,
            defaults: { ease: "outExpo" },
          })
          .add(logo, { opacity: [0, 1], scale: [0.94, 1], duration: 600 }, 0)
          .label("titulo", 150)
          .add(
            titulo,
            { opacity: [0, 1], translateY: [12, 0], duration: 500 },
            "titulo",
          );

        if (contenido) {
          principal.add(
            contenido,
            { opacity: [0, 1], translateY: [16, 0], duration: 600 },
            "-=250",
          );
        }

        principal.play();
        timeline = principal;
      } catch {
        // Si el chunk o la animación fallan, no se oculta ningún elemento.
      }
    };

    void iniciar();

    return () => {
      cancelado = true;
      timeline?.pause();
    };
  }, []);

  return null;
}
