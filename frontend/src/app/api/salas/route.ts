import { salasController } from "@/modules/salas/api/salas.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  return salasController.listar(request);
}
