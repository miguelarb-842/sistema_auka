import { chatController } from "@/modules/chat-xila/api/chat.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return chatController.obtenerInfo();
}

export async function POST(request: Request): Promise<Response> {
  return chatController.enviarMensaje(request);
}
