"use client";

import { useId } from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
  /** Id del elemento cuyos resultados actualiza la búsqueda. */
  controls?: string;
}

/**
 * Campo de búsqueda liviano.
 *
 * Sustituye el SearchField de HeroUI en los catálogos: mantiene etiqueta
 * accesible, botón para limpiar y el mismo aspecto visual, pero sin cargar el
 * componente completo en el bundle del cliente.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
  controls,
}: SearchInputProps) {
  const id = useId();
  const descripcionId = `${id}-descripcion`;

  return (
    <div className={cn("w-full", className)}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-field px-3 text-sm text-foreground shadow-sm transition-colors focus-within:border-foreground/35 focus-within:ring-2 focus-within:ring-focus/30">
        <Search aria-hidden="true" className="size-4 shrink-0 text-muted" />
        <input
          aria-controls={controls}
          aria-describedby={descripcionId}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted"
          id={id}
          placeholder={placeholder}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <button
            aria-label="Borrar búsqueda"
            className="grid size-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            type="button"
            onClick={() => onChange("")}
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        ) : null}
      </div>
      <span className="sr-only" id={descripcionId}>
        Escribí para filtrar los resultados. El listado se actualiza mientras
        escribís.
      </span>
    </div>
  );
}
