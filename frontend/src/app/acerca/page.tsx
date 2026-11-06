import type { Metadata } from "next";

import { AcercaPage } from "@/modules/acerca/pages/AcercaPage";

export const metadata: Metadata = {
  title: "Acerca de la App",
  description:
    "Misión, criterios de contenido, arquitectura y alcance del prototipo Sistema Auka – Robot Xila.",
};

export default function Page() {
  return <AcercaPage />;
}
