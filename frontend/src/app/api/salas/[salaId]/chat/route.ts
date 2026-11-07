import { salasController } from "@/modules/salas/api/salas.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ salaId: string }>;
}

export async function GET(
  _request: Request,
  { params }: Props,
): Promise<Response> {
  const { salaId } = await params;

  return salasController.obtenerChat(salaId);
}

export async function POST(
  request: Request,
  { params }: Props,
): Promise<Response> {
  const { salaId } = await params;

  return salasController.enviarMensajeChat(salaId, request);
}
