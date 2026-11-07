/**
 * Error de dominio de la API de conversaciones.
 *
 * `estado` se traduce directamente a HTTP en el presenter; así el controller
 * no necesita conocer los códigos de estado de cada caso.
 */
export class ChatApiError extends Error {
  constructor(
    readonly codigo: string,
    mensaje: string,
    readonly estado: number,
    readonly detalles?: unknown,
  ) {
    super(mensaje);
    this.name = "ChatApiError";
  }
}
