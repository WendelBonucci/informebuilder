import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://informBuilder.com.br"), // Troque pelo domínio oficial

  title: {
    default: "Inform Builder | Sistema Financeiro e Gestão Empresarial",
    template: "%s | Inform Builder",
  },

  description:
    "Inform Builder é um sistema de gestão empresarial completo para pequenas e médias empresas. Controle financeiro, contas a pagar e receber, fluxo de caixa, relatórios inteligentes, dashboards, cadastro de Registros, cadastro de clientes, produtos e estoque em um só lugar.",

  keywords: [
    "Sistema Financeiro",
    "Sistema Empresarial",
    "ERP",
    "Gestão Empresarial",
    "Gestão Financeira",
    "Fluxo de Caixa",
    "Contas a Pagar",
    "Contas a Receber",
    "Controle Financeiro",
    "Dashboard Financeiro",
    "Relatórios Financeiros",
    "Controle de Estoque",
    "Cadastro de Registros",
    "Cadastro de Clientes",
    "Cadastro de Produtos",
    "Controle de Vendas",
    "Sistema para Empresas",
    "Software de Gestão",
    "ERP Online",
    "Sistema de Gestão Online",
    "Korivo"
  ],

  authors: [
    {
      name: "InformBuilder",
      url: "https://informeBuilder.com.br",
    },
  ],

  creator: "InformBuilder",

  publisher: "InformBuilder",

  applicationName: "InformBuilder",

  category: "Business",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "InformBuilder | Sistema Financeiro e Gestão Empresarial",

    description:
      "Organize sua empresa com o InformBuilder. Controle contas a pagar e receber, fluxo de caixa, estoque, cadastro de registros, clientes e acompanhe dashboards e relatórios em tempo real.",

    url: "https://informBuilder.com.br",

    siteName: "Korivo",

    locale: "pt_BR",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InformBuilder| Financeiro e Gestão Empresarial",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "InformBuilder | Sistema Financeiro e Gestão Empresarial",
    description:
      "Sistema completo para controle financeiro, fluxo de caixa, clientes, estoque e relatórios empresariais.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
