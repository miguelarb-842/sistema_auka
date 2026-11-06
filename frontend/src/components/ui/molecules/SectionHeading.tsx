import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" &&
          "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="auka-eyebrow mb-3">{eyebrow}</p> : null}
        <Heading
          className={cn(
            "text-balance font-semibold tracking-[-0.03em]",
            as === "h1"
              ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
              : "text-3xl leading-tight sm:text-4xl",
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
