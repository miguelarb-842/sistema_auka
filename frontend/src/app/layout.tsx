import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { PublicLayout } from "@/components/ui/templates/PublicLayout";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} · Robot Xila`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [
    "Nicaragua",
    "museo digital",
    "educación",
    "historia",
    "patrimonio",
    "Xila",
    "Sistema Auka",
  ],
  openGraph: {
    type: "website",
    locale: "es_NI",
    title: `${siteConfig.name} · Robot Xila`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Robot Xila`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#101114" },
  ],
};

const scriptPreferencias = `(function(){try{var t=localStorage.getItem('auka:tipografia');if(t==='sm'||t==='md'||t==='lg'){document.documentElement.dataset.fontSize=t;}var p=localStorage.getItem('auka:perfil');if(p==='nino'||p==='adolescente'||p==='adulto'){document.documentElement.dataset.perfil=p;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={fontSans.variable} lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptPreferencias }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Providers>
          <PublicLayout>{children}</PublicLayout>
        </Providers>
      </body>
    </html>
  );
}
