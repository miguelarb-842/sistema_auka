import type { Metadata } from "next";

import { ConfiguracionPage } from "@/modules/configuracion/pages/ConfiguracionPage";

export const metadata: Metadata = {
  title: "Configuración",
  description:
    "Elegí tema claro u oscuro, tamaño de texto y perfil de visitante. Las preferencias se guardan solo en tu navegador.",
};

export default function Page() {
  return <ConfiguracionPage />;
}
