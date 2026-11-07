import Image from "next/image";
import Link from "next/link";

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
        "group inline-flex items-center gap-2.5 rounded-lg text-foreground",
        className,
      )}
      href="/"
    >
      <Image
        unoptimized
        alt=""
        aria-hidden="true"
        className="h-11 w-auto shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:-rotate-3"
        height={118}
        src="/images/brand/emblema-auka.svg"
        width={107}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-tight">
          Sistema Auka
        </span>
        <span className="mt-1 max-w-[15rem] text-[0.56rem] font-medium uppercase tracking-[0.14em] text-muted">
          {etiquetaInstalacion}
        </span>
      </span>
    </Link>
  );
}
