import Link from "next/link";

import { BrandLogo } from "./BrandLogo";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  etiquetaInstalacion: string;
}

export function Logo({ className, etiquetaInstalacion }: LogoProps) {
  return (
    <Link
      aria-label="Sistema Auka, volver al inicio"
      className={cn(
        "inline-flex flex-col items-start gap-1.5 rounded-lg text-foreground",
        className,
      )}
      href="/"
    >
      <BrandLogo
        priority
        alt=""
        className="w-24 shrink-0 sm:w-[136px]"
        marca="auka"
      />
      <span className="max-w-[15rem] text-[0.56rem] font-medium uppercase tracking-[0.14em] text-muted">
        {etiquetaInstalacion}
      </span>
    </Link>
  );
}
