import type { ConfigChat } from "@/modules/museo/types/museo.types";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { Chip } from "@heroui/react";

import { TextoAdaptado } from "@/components/ui/molecules/TextoAdaptado";
import { VerificacionBadge } from "@/components/ui/molecules/VerificacionBadge";
import { cn } from "@/lib/utils";

interface ChatOpcionCardProps {
  config: ConfigChat;
  href: string;
  contexto?: string;
  className?: string;
}

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function ChatOpcionCard({
  config,
  href,
  contexto,
  className,
}: ChatOpcionCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-foreground/25",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-foreground/[0.03]">
        <span className="auka-pattern absolute inset-0 opacity-40" />
        <span className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-warning/10" />
        {config.avatar ? (
          <Image
            fill
            alt={config.avatarAlt ?? ""}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            src={config.avatar}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full border border-border bg-surface/80 text-2xl font-semibold tracking-tight text-foreground shadow-sm backdrop-blur">
              {iniciales(config.nombreVisible)}
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Chip
            color={config.tipo === "agrupacion" ? "warning" : "accent"}
            size="sm"
            variant="soft"
          >
            {config.etiquetaVisible}
          </Chip>
          <VerificacionBadge />
        </div>

        <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight">
          {config.nombreVisible}
        </h3>

        {contexto ? (
          <p className="mt-1 text-xs font-medium text-muted">{contexto}</p>
        ) : null}

        <TextoAdaptado
          className="mt-3 flex-1 text-sm leading-relaxed text-muted"
          contenido={config.bienvenida}
        />

        <Link
          className="mt-5 inline-flex items-center gap-1.5 border-t border-separator pt-4 text-sm font-semibold transition-colors group-hover:text-accent"
          href={href}
        >
          <MessageCircleQuestion aria-hidden="true" className="size-4" />
          Abrir conversación
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
