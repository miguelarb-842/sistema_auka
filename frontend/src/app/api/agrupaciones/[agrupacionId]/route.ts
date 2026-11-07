import { personajesController } from "@/modules/personajes/api/personajes.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ agrupacionId: string }>;
}

export async function GET(
  _request: Request,
  { params }: Props,
): Promise<Response> {
  const { agrupacionId } = await params;

  return personajesController.obtenerAgrupacionPorId(agrupacionId);
}
