import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "@/core/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ClientProvidersWrapper } from "@/core/providers/ClientProvidersWrapper";
import { ReactNode } from "react";
import { getUserLanguage } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Altas Planner",
    template: `%s - Altas Planner`,
  },
  // metadataBase: new URL("https://github.com/"),
  description:
    "A modern boilerplate for building scalable web applications with **Next.js 15**, **TypeScript**, and integrated **i18n** (internationalization). Perfect for developers looking for authentication (Next-Auth), schema validation (Zod), and responsive designs (Tailwind CSS).\n",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Next-Auth",
    "Internationalization",
  ],
  authors: [
    {
      name: "ZISAN",
      url: "Z",
    },
  ],
  creator: "ZISAN",
  openGraph: {
    type: "website",
    locale: "en_US",
    // url: "https://next-i18n-auth-mu.vercel.app",
    title: "Altas Planner",
    description: "Altas Planner Boilerplate",
    siteName: "Altas Planner",
    images: [
      {
        url: "https://next-i18n-auth-mu.vercel.app/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Altas Planner",
      },
    ],
  },
  generator: "Next js",
  icons: {
    icon: "/assets/android-chrome-192x192.png",
    shortcut: "/assets/android-chrome-512x512.png",
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "https://next-i18n-auth-mu.vercel.app/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const lang = await getUserLanguage();

  return (
    <html lang={lang}>
      <head>
        <title>Altas Planner</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <ClientProvidersWrapper>
          {children}
          <ToastContainer
            limit={3}
            toastClassName={
              "font-bold bg-accent text-accent-foreground flex items-center p-4 z-1002"
            }
          />
        </ClientProvidersWrapper>
      </body>
    </html>
  );
}
