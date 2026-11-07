import { personajesController } from "@/modules/personajes/api/personajes.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  return personajesController.listarAgrupaciones(request);
}
