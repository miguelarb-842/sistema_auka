import type { ReactNode } from "react";

import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

type TonoAviso = "info" | "accent" | "warning" | "success" | "danger";

const tonos: Record<TonoAviso, string> = {
  info: "border-border bg-surface/70 text-foreground",
  accent: "border-accent/25 bg-accent-soft/60 text-foreground",
  warning: "border-warning/30 bg-warning-soft/60 text-foreground",
  success: "border-success/30 bg-success-soft/60 text-foreground",
  danger: "border-danger/30 bg-danger-soft/60 text-foreground",
};

interface InfoCalloutProps {
  title?: string;
  children: ReactNode;
  tono?: TonoAviso;
  icon?: ReactNode;
  className?: string;
}

export function InfoCallout({
  title,
  children,
  tono = "info",
  icon,
  className,
}: InfoCalloutProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
        tonos[tono],
        className,
      )}
    >
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-background/60 text-muted">
        {icon ?? <Info aria-hidden="true" className="size-4" />}
      </span>
      <div className="min-w-0">
        {title ? (
          <p className="mb-1 font-semibold text-foreground">{title}</p>
        ) : null}
        <div className="text-pretty text-muted">{children}</div>
      </div>
    </div>
  );
}
