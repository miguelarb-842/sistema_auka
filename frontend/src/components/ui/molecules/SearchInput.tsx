"use client";

import { useEffect, useId, useRef } from "react";
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
  /** Habilita la tecla `/` para enfocar la búsqueda en escritorio. */
  atajo?: boolean;
}

/**
 * Campo de búsqueda liviano.
 *
 * Sustituye el SearchField de HeroUI en los catálogos: mantiene etiqueta
 * accesible, botón para limpiar y el mismo aspecto visual, pero sin cargar el
 * componente completo en el bundle del cliente. La tecla `/` enfoca el campo y
 * Escape limpia o cierra la búsqueda.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
  controls,
  atajo = false,
}: SearchInputProps) {
  const id = useId();
  const descripcionId = `${id}-descripcion`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!atajo) {
      return;
    }

    const enfocarConBarra = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const objetivo = event.target;
      const escribiendo =
        objetivo instanceof HTMLElement &&
        (objetivo.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(objetivo.tagName));

      if (escribiendo) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", enfocarConBarra);

    return () => window.removeEventListener("keydown", enfocarConBarra);
  }, [atajo]);

  return (
    <div className={cn("w-full", className)}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-field px-3 text-sm text-foreground shadow-sm transition-colors focus-within:border-foreground/35 focus-within:ring-2 focus-within:ring-focus/30">
        <Search aria-hidden="true" className="size-4 shrink-0 text-muted" />
        <input
          ref={inputRef}
          aria-controls={controls}
          aria-describedby={descripcionId}
          autoComplete="off"
          className="h-11 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted sm:text-sm"
          id={id}
          placeholder={placeholder}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Escape") {
              return;
            }

            event.preventDefault();

            if (value) {
              onChange("");
            } else {
              event.currentTarget.blur();
            }
          }}
        />
        {value ? (
          <button
            aria-label="Borrar búsqueda"
            className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            type="button"
            onClick={() => onChange("")}
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        ) : atajo ? (
          <kbd
            aria-hidden="true"
            className="hidden size-6 shrink-0 place-items-center rounded-md border border-border bg-surface-secondary font-mono text-[0.65rem] text-muted sm:grid"
          >
            /
          </kbd>
        ) : null}
      </div>
      <span className="sr-only" id={descripcionId}>
        Escribí para filtrar los resultados. El listado se actualiza mientras
        escribís.{" "}
        {atajo ? "En escritorio, la tecla barra enfoca este campo." : ""}
      </span>
    </div>
  );
}
