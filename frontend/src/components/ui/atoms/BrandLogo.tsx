import Image from "next/image";

import { cn } from "@/lib/utils";

type Marca = "auka" | "xila";

interface BrandLogoProps {
  className?: string;
  marca: Marca;
  /**
   * Texto alternativo. Usar `""` cuando el logo es decorativo porque el
   * enlace o el texto adyacente ya nombran la marca.
   */
  alt?: string;
  priority?: boolean;
}

const MEDIDAS: Record<Marca, { width: number; height: number }> = {
  auka: { width: 1477, height: 251 },
  xila: { width: 1477, height: 278 },
};

const NOMBRES: Record<Marca, string> = {
  auka: "Auka",
  xila: "Xila",
};

/**
 * Logotipo de marca con variante clara y oscura.
 *
 * Ambas variantes se renderizan y se alternan por CSS (`dark:hidden` /
 * `hidden dark:block`). Así el tema resuelto por next-themes antes de la
 * hidratación no provoca un parpadeo del logo equivocado.
 */
export function BrandLogo({
  alt,
  className,
  marca,
  priority = false,
}: BrandLogoProps) {
  const { height, width } = MEDIDAS[marca];
  const textoAlternativo = alt ?? NOMBRES[marca];

  return (
    <>
      <Image
        unoptimized
        alt={textoAlternativo}
        className={cn("dark:hidden", className)}
        height={height}
        priority={priority}
        src={`/brand/${marca}-logo-claro.svg`}
        width={width}
      />
      <Image
        unoptimized
        alt={textoAlternativo}
        className={cn("hidden dark:block", className)}
        height={height}
        priority={priority}
        src={`/brand/${marca}-logo-oscuro.svg`}
        width={width}
      />
    </>
  );
}
