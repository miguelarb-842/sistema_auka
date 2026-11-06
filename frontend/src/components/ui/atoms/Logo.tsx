import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Sistema Auka, volver al inicio"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg text-foreground",
        className,
      )}
      href="/"
    >
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-foreground text-background shadow-sm transition-transform duration-300 group-hover:-rotate-3">
        <svg
          aria-hidden="true"
          className="size-6"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path
            d="M5 24 16 5l11 19H5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
          <circle cx="16" cy="19" fill="var(--warning)" r="3.2" />
          <path
            d="M10 27h12"
            stroke="var(--accent)"
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-tight">
          Sistema Auka
        </span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted">
          Robot Xila
        </span>
      </span>
    </Link>
  );
}
