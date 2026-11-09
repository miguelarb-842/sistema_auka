"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@heroui/react";

import { cn } from "@/lib/utils";

const LIMITE = 600;
const PREFIJO_BORRADOR = "auka:chat:borrador:";

function claveBorrador(idConversacion: string): string {
  return `${PREFIJO_BORRADOR}${idConversacion}`;
}

function leerBorrador(idConversacion: string): string {
  try {
    return window.sessionStorage.getItem(claveBorrador(idConversacion)) ?? "";
  } catch {
    return "";
  }
}

function guardarBorrador(idConversacion: string, texto: string): void {
  try {
    if (texto) {
      window.sessionStorage.setItem(claveBorrador(idConversacion), texto);
    } else {
      window.sessionStorage.removeItem(claveBorrador(idConversacion));
    }
  } catch {
    // sessionStorage puede no estar disponible en modo privado.
  }
}

interface ChatComposerProps {
  nombreAsistente: string;
  idConversacion?: string;
  /** Devuelve `true` si el mensaje fue aceptado y el borrador puede limpiarse. */
  onEnviar: (texto: string) => Promise<boolean> | boolean;
  onDetener?: () => void;
  generando?: boolean;
  deshabilitado?: boolean;
}

export function ChatComposer({
  nombreAsistente,
  idConversacion,
  onEnviar,
  onDetener,
  generando = false,
  deshabilitado = false,
}: ChatComposerProps) {
  const [texto, setTexto] = useState("");
  const [hidratado, setHidratado] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!idConversacion) {
      setHidratado(true);

      return;
    }

    setTexto(leerBorrador(idConversacion));
    setHidratado(true);
  }, [idConversacion]);

  useEffect(() => {
    if (!hidratado || !idConversacion) {
      return;
    }

    guardarBorrador(idConversacion, texto);
  }, [hidratado, idConversacion, texto]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 132)}px`;
  }, [texto]);

  async function enviar() {
    const limpio = texto.trim();

    if (!limpio || generando || deshabilitado) {
      return;
    }

    try {
      const aceptado = await onEnviar(limpio);

      if (aceptado) {
        setTexto("");

        if (idConversacion) {
          guardarBorrador(idConversacion, "");
        }
      }
    } catch {
      // Si el envío falla, el borrador se conserva para reintentar.
    }
  }

  return (
    <form
      aria-busy={generando}
      className="chat-composer"
      onSubmit={(event) => {
        event.preventDefault();
        void enviar();
      }}
    >
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-focus/30">
        <label className="sr-only" htmlFor="mensaje-chat">
          Escribí tu mensaje para {nombreAsistente}
        </label>
        <textarea
          ref={textareaRef}
          aria-describedby="chat-aviso"
          autoComplete="off"
          className="max-h-[132px] min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted"
          id="mensaje-chat"
          maxLength={LIMITE}
          placeholder={
            generando
              ? "Podés escribir mientras esperás…"
              : "Escribí una pregunta…"
          }
          rows={1}
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void enviar();
            }
          }}
        />
        {generando ? (
          <Button
            isIconOnly
            aria-label="Detener respuesta"
            className="shrink-0 rounded-xl bg-danger text-danger-foreground"
            size="md"
            type="button"
            onPress={onDetener}
          >
            <Square aria-hidden="true" className="size-3.5 fill-current" />
          </Button>
        ) : (
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
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-3 px-1">
        <p
          className="text-[0.65rem] leading-relaxed text-muted"
          id="chat-aviso"
        >
          {generando
            ? "Generando respuesta… podés escribir mientras esperás."
            : "Enter para enviar · Shift + Enter para una línea nueva"}
        </p>
        <p className="shrink-0 font-mono text-[0.65rem] text-muted">
          {texto.length}/{LIMITE}
        </p>
      </div>
    </form>
  );
}
