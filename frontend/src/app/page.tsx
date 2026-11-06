import type { Metadata } from "next";

import { HomePage } from "@/modules/home/pages/HomePage";

export const metadata: Metadata = {
  title: "Museo digital para pensar la historia",
  description:
    "Explorá tres salas demostrativas sobre Nicaragua, conocé personajes históricos y conversá con Xila, un robot educativo con respuestas locales.",
};

export default function Page() {
  return <HomePage />;
}
