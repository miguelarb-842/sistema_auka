"use client";

import type { CSSProperties, HTMLAttributes, PointerEvent } from "react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type HoloCardStyle = CSSProperties & {
  "--holo-card-gradient"?: string;
  "--holo-card-pattern"?: string;
  "--holo-card-pattern-size"?: string;
  "--holo-card-shine-opacity"?: string;
};

interface HoloCardProps extends HTMLAttributes<HTMLDivElement> {
  gradient?: string;
  patternSrc?: string;
  patternSize?: string;
  activateOnHover?: boolean;
  tiltOnTouch?: boolean;
  isInteractive?: boolean;
  maxTilt?: number;
  hoverScale?: number;
  shineOpacity?: number;
  parallaxStrength?: number;
}

/**
 * Réplica local del Holo Card de HeroUI Pro: inclinación 3D, textura y brillo
 * que sigue al puntero. No requiere licencia ni dependencias externas.
 */
function HoloCardRoot({
  children,
  className,
  style,
  gradient,
  patternSrc,
  patternSize,
  activateOnHover = false,
  tiltOnTouch = true,
  isInteractive = true,
  maxTilt = 14.29,
  hoverScale = 1.05,
  shineOpacity = 1,
  parallaxStrength = 10,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: HoloCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  const puedeInclinar = (pointerType: string) => {
    if (pointerType === "mouse") {
      return true;
    }

    // `activateOnHover` implica no reclamar gestos táctiles.
    return tiltOnTouch && !activateOnHover;
  };

  const actualizarDesdePuntero = (clientX: number, clientY: number) => {
    const element = rootRef.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const rotateX = (0.5 - y) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;

    element.style.setProperty("--holo-rotate-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--holo-rotate-y", `${rotateY.toFixed(2)}deg`);
    element.style.setProperty(
      "--holo-parallax-x",
      `${((0.5 - x) * parallaxStrength).toFixed(2)}px`,
    );
    element.style.setProperty(
      "--holo-parallax-y",
      `${((0.5 - y) * parallaxStrength).toFixed(2)}px`,
    );
    element.style.setProperty("--holo-pointer-x", `${(x * 100).toFixed(2)}%`);
    element.style.setProperty("--holo-pointer-y", `${(y * 100).toFixed(2)}%`);
  };

  const reposar = () => {
    const element = rootRef.current;

    if (!element) {
      return;
    }

    element.style.setProperty("--holo-rotate-x", "0deg");
    element.style.setProperty("--holo-rotate-y", "0deg");
    element.style.setProperty("--holo-scale", "1");
    element.style.setProperty("--holo-parallax-x", "0px");
    element.style.setProperty("--holo-parallax-y", "0px");
    element.style.setProperty("--holo-pointer-x", "50%");
    element.style.setProperty("--holo-pointer-y", "50%");
  };

  const activar = (event: PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || reducedMotion || !puedeInclinar(event.pointerType)) {
      return;
    }

    if (!activeRef.current) {
      activeRef.current = true;
      setActive(true);
      rootRef.current?.style.setProperty("--holo-scale", String(hoverScale));
    }

    actualizarDesdePuntero(event.clientX, event.clientY);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event);
    activar(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    activar(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);

    if (!activeRef.current) {
      return;
    }

    activeRef.current = false;
    setActive(false);
    reposar();
  };

  const rootStyle: HoloCardStyle = {
    ...style,
    "--holo-card-shine-opacity": String(shineOpacity),
    ...(gradient ? { "--holo-card-gradient": gradient } : null),
    ...(patternSrc ? { "--holo-card-pattern": `url("${patternSrc}")` } : null),
    ...(patternSize ? { "--holo-card-pattern-size": patternSize } : null),
  };

  return (
    <div
      ref={rootRef}
      className={cn("holo-card", className)}
      data-activate-on-hover={activateOnHover ? "true" : "false"}
      data-active={active ? "true" : "false"}
      data-tilt-on-touch={tiltOnTouch ? "true" : "false"}
      style={rootStyle}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {children}
    </div>
  );
}

interface HoloCardImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}

export function HoloCardImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw",
  preload = false,
}: HoloCardImageProps) {
  return (
    <Image
      fill
      alt={alt}
      className={cn("holo-card__image", className)}
      draggable={false}
      preload={preload}
      sizes={sizes}
      src={src}
    />
  );
}

export function HoloCardRotator({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("holo-card__rotator h-full", className)} {...props}>
      {children}
    </div>
  );
}

export function HoloCardFrame({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("holo-card__frame h-full", className)} {...props}>
      {children}
    </div>
  );
}

export function HoloCardSurface({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("holo-card__surface", className)} {...props}>
      {children}
    </div>
  );
}

export function HoloCardInset({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("holo-card__inset", className)}
      {...props}
    />
  );
}

export function HoloCardPattern({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("holo-card__pattern", className)}
      {...props}
    />
  );
}

export function HoloCardContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("holo-card__content", className)} {...props}>
      {children}
    </div>
  );
}

export function HoloCardShinePattern({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("holo-card__shine-pattern", className)}
      {...props}
    />
  );
}

export function HoloCardShine({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("holo-card__shine", className)}
      {...props}
    >
      {children ?? <HoloCardShinePattern />}
    </div>
  );
}

export const HoloCard = Object.assign(HoloCardRoot, {
  Rotator: HoloCardRotator,
  Frame: HoloCardFrame,
  Surface: HoloCardSurface,
  Image: HoloCardImage,
  Inset: HoloCardInset,
  Pattern: HoloCardPattern,
  Content: HoloCardContent,
  Shine: HoloCardShine,
  ShinePattern: HoloCardShinePattern,
});

export type { HoloCardProps };
