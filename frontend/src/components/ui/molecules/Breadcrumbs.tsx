import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Migas de pan" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        <li>
          <Link
            aria-label="Inicio"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md py-1 transition-colors hover:text-foreground"
            href="/"
          >
            <Home aria-hidden="true" className="size-3.5" />
            <span className="sr-only sm:not-sr-only">Inicio</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const esUltimo = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              <ChevronRight
                aria-hidden="true"
                className="size-3.5 opacity-50"
              />
              {item.href && !esUltimo ? (
                <Link
                  className="inline-flex min-h-11 items-center rounded-md py-1 transition-colors hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={esUltimo ? "page" : undefined}
                  className={cn(
                    "py-1",
                    esUltimo && "font-medium text-foreground",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
