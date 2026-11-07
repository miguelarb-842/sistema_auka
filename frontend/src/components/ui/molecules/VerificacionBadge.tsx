import { CircleHelp } from "lucide-react";
import { Chip } from "@heroui/react";

/**
 * Marca visual para contenido provisional.
 * No describe datos del museo: solo comunica el estado de verificación.
 */
export function VerificacionBadge() {
  return (
    <Chip color="warning" size="sm" variant="soft">
      <CircleHelp aria-hidden="true" className="size-3.5" />
      Por verificar
    </Chip>
  );
}
