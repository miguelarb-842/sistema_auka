"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@heroui/react";

import { cn } from "@/lib/utils";

const LIMITE = 600;

interface ChatComposerProps {
  onEnviar: (texto: string) => void;
  deshabilitado?: boolean;
}

export function ChatComposer({
  onEnviar,
  deshabilitado = false,
}: ChatComposerProps) {
  const [texto, setTexto] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 132)}px`;
  }, [texto]);

  function enviar() {
    const limpio = texto.trim();

    if (!limpio || deshabilitado) {
      return;
    }

    onEnviar(limpio);
    setTexto("");
  }

  return (
    <form
      className="chat-composer"
      onSubmit={(event) => {
        event.preventDefault();
        enviar();
      }}
    >
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-focus/30">
        <label className="sr-only" htmlFor="mensaje-xila">
          Escribí tu mensaje para Xila
        </label>
        <textarea
          ref={textareaRef}
          aria-describedby="chat-aviso"
          autoComplete="off"
          className="max-h-[132px] min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted"
          id="mensaje-xila"
          maxLength={LIMITE}
          placeholder="Escribí una pregunta…"
          rows={1}
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              enviar();
            }
          }}
        />
        <Button
          isIconOnly
          aria-label="Enviar mensaje"
          className={cn(
            "shrink-0 rounded-xl transition-opacity",
            !texto.trim() && "opacity-40",
          )}
          isDisabled={!texto.trim() || deshabilitado}
          size="md"
          type="submit"
        >
          <Send aria-hidden="true" className="size-4" />
        </Button>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-3 px-1">
        <p
          className="text-[0.65rem] leading-relaxed text-muted"
          id="chat-aviso"
        >
          Enter para enviar · Shift + Enter para una línea nueva
        </p>
        <p className="shrink-0 font-mono text-[0.65rem] text-muted">
          {texto.length}/{LIMITE}
        </p>
      </div>
    </form>
  );
}
