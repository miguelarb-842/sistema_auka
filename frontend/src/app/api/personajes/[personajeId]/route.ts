import { personajesController } from "@/modules/personajes/api/personajes.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ personajeId: string }>;
}

export async function GET(
  _request: Request,
  { params }: Props,
): Promise<Response> {
  const { personajeId } = await params;

  return personajesController.obtenerPorId(personajeId);
}
