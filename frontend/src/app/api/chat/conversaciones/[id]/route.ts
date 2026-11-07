import { chatController } from "@/modules/chat-xila/api/chat.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: Props,
): Promise<Response> {
  const { id } = await params;

  return chatController.obtenerConversacion(id);
}
