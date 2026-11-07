import { chatController } from "@/modules/chat-xila/api/chat.controller";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(): Response {
  return chatController.listarConversaciones();
}
