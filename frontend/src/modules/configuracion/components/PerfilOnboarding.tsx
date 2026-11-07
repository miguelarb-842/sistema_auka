"use client";

import { Sparkles } from "lucide-react";
import { Modal } from "@heroui/react";

import { usePreferencias } from "../context/PreferenciasProvider";
import { perfiles } from "../data/perfiles.data";

export function PerfilOnboarding() {
  const { hidratado, tienePerfil, setPerfil } = usePreferencias();
  const abierto = hidratado && !tienePerfil;

  return (
    <Modal isOpen={abierto} onOpenChange={() => undefined}>
      <Modal.Backdrop isDismissable={false}>
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog
            aria-label="Elegí tu perfil de visitante"
            className="max-h-[90dvh] overflow-y-auto"
          >
            <Modal.Header className="space-y-2 text-center sm:text-left">
              <div className="mx-auto mb-1 grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground sm:mx-0">
                <Sparkles aria-hidden="true" className="size-6" />
              </div>
              <Modal.Heading className="text-balance text-2xl font-semibold tracking-tight">
                ¿Cómo querés vivir la experiencia?
              </Modal.Heading>
              <p className="text-pretty text-sm leading-relaxed text-muted">
                Elegí un perfil para adaptar el tono de Xila, la profundidad de
                los contenidos y los retos. Podés cambiarlo cuando quieras.
              </p>
            </Modal.Header>
            <Modal.Body className="mt-2 grid gap-3">
              {perfiles.map((perfil) => {
                const Icono = perfil.icono;

                return (
                  <button
                    key={perfil.id}
                    className="group flex w-full items-start gap-4 rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-foreground/30 hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    type="button"
                    onClick={() => setPerfil(perfil.id)}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-secondary text-foreground transition-colors group-hover:bg-surface">
                      <Icono aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">
                          {perfil.nombre}
                        </span>
                        <span className="rounded-full bg-default-soft px-2 py-0.5 text-[0.68rem] font-medium text-muted">
                          {perfil.edadSugerida}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {perfil.descripcion}
                      </span>
                    </span>
                  </button>
                );
              })}
            </Modal.Body>
            <Modal.Footer className="mt-2 border-t border-separator pt-4">
              <p className="text-xs leading-relaxed text-muted">
                Esta selección se guarda solo en tu navegador. No se crea una
                cuenta. El perfil activo se envía con cada mensaje de chat para
                adaptar la respuesta.
              </p>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
