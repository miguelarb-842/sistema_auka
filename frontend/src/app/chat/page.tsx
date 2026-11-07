import type { Metadata } from "next";

import { ChatSelectorPage } from "@/modules/chat-xila/pages/ChatSelectorPage";

export const metadata: Metadata = {
  title: "Conversaciones",
  description:
    "Elegí la guía general, un Agente Xila de sala o una conversación con personajes y agrupación invitada. Simulación educativa con contenido por verificar.",
};

export default function Page() {
  return <ChatSelectorPage />;
}
