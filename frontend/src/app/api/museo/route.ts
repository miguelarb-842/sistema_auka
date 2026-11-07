import { museoController } from "@/modules/museo/api/museo.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(): Response {
  return museoController.obtenerMuseo();
}
