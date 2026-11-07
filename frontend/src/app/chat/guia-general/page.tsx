import type { Metadata } from "next";

import { ChatConversacion } from "@/modules/chat-xila/components/ChatConversacion";
import { getGuiaGeneral } from "@/modules/museo/services/museo.service";

export const metadata: Metadata = {
  title: "Guía general",
  description:
    "Conversá con la guía general sobre las salas, el Agente Xila y las voces disponibles en la instalación simulada.",
};

export default function Page() {
  return (
    <ChatConversacion
      config={getGuiaGeneral()}
      enlaceVolver={{ href: "/salas", label: "Ver las salas" }}
    />
  );
}
