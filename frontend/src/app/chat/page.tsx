import type { Metadata } from "next";

import { ChatSelectorPage } from "@/modules/chat-xila/pages/ChatSelectorPage";

export const metadata: Metadata = {
  title: "Chat Xila",
  description:
    "Elegí uno de los tres asistentes Xila para conversar sobre las salas del museo digital. Simulación local con respuestas preparadas.",
};

export default function Page() {
  return <ChatSelectorPage />;
}
