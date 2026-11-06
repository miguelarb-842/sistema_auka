import type { AsistenteXila } from "../types/chat.types";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";
import { getSalaById } from "@/modules/salas/services/salas.service";

const tonos = {
  accent: "accent" as const,
  warning: "warning" as const,
  success: "success" as const,
  danger: "danger" as const,
};

interface AsistenteCardProps {
  asistente: AsistenteXila;
  className?: string;
}

export function AsistenteCard({ asistente, className }: AsistenteCardProps) {
  const sala = getSalaById(asistente.salaId);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-foreground/25",
        className,
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-surface-secondary">
        <Image
          fill
          alt={asistente.avatarAlt}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
          src={asistente.avatar}
        />
        <span className="absolute left-4 top-4">
          <Chip color={tonos[asistente.tono]} size="sm" variant="soft">
            {asistente.tema}
          </Chip>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          {asistente.nombre}
        </h2>
        <p className="mt-1 text-sm font-medium italic text-muted">
          «{asistente.lema}»
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {asistente.biografia}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {asistente.personalidad.map((rasgo) => (
            <li
              key={rasgo}
              className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] font-medium text-muted"
            >
              {rasgo}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2 border-t border-separator pt-4 sm:flex-row">
          <Link
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            href={`/chat/${asistente.salaId}`}
          >
            <MessageCircleQuestion aria-hidden="true" className="size-4" />
            Conversar
          </Link>
          {sala ? (
            <Link
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              href={`/salas/${sala.id}`}
            >
              Ver sala
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
