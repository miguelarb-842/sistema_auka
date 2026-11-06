import type { Metadata } from "next";

import { SalasPage } from "@/modules/salas/pages/SalasPage";

export const metadata: Metadata = {
  title: "Salas del museo",
  description:
    "Explorá las tres salas demostrativas del Sistema Auka: Fiestas Patronales de Managua, los caciques de Nicaragua y Diriangén y la resistencia indígena.",
};

export default function Page() {
  return <SalasPage />;
}
