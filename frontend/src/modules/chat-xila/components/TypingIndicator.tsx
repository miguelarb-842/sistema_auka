export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3" role="status">
      <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl border border-border bg-surface">
        <span aria-hidden="true" className="flex items-end gap-0.5">
          <span className="animate-auka-typing size-1 rounded-full bg-muted" />
          <span className="animate-auka-typing size-1 rounded-full bg-muted [animation-delay:150ms]" />
          <span className="animate-auka-typing size-1 rounded-full bg-muted [animation-delay:300ms]" />
        </span>
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3.5">
        <span className="sr-only">Xila está escribiendo</span>
        <span className="text-xs font-medium text-muted">
          Xila está pensando…
        </span>
      </div>
    </div>
  );
}
