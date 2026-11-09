import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { PublicLayout } from "@/components/ui/templates/PublicLayout";
import { getMuseo } from "@/modules/museo/services/museo.service";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const museo = getMuseo();
const tituloSitio = `${siteConfig.name} · ${museo.nombre}`;
const descripcionSitio = `Simulación de la instalación de ${siteConfig.name} en el ${museo.nombre}. ${siteConfig.description}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: tituloSitio,
    template: `%s · ${siteConfig.name}`,
  },
  description: descripcionSitio,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [
    "museo",
    "Sistema Auka",
    museo.nombre,
    "Nicaragua",
    "educación",
    "patrimonio",
    "Agente Xila",
  ],
  openGraph: {
    type: "website",
    locale: "es_NI",
    title: tituloSitio,
    description: descripcionSitio,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: tituloSitio,
    description: descripcionSitio,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#101114" },
  ],
};

const scriptPreferencias = `(function(){try{var d=document.documentElement;d.dataset.js='true';var t=localStorage.getItem('auka:tipografia');if(t==='sm'||t==='md'||t==='lg'){d.dataset.fontSize=t;}var p=localStorage.getItem('auka:perfil');if(p==='nino'||p==='adolescente'||p==='adulto'){d.dataset.perfil=p;}var m=localStorage.getItem('auka:movimiento');var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.motion=(m==='reducido'||(m!=='completo'&&reduce))?'reduced':'full';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={fontSans.variable} lang="es-NI">
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptPreferencias }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Providers>
          <PublicLayout etiquetaInstalacion={museo.etiquetaInstalacion}>
            {children}
          </PublicLayout>
        </Providers>
      </body>
    </html>
  );
}
