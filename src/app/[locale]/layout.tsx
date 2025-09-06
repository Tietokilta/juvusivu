import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import localFont from "next/font/local";
import { I18nProviderClient } from "@locales/client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: "400",
});

const pixelFont = localFont({
  src: "../../../public/fonts/w95fa/w95fa.woff2",
  variable: "--font-pixel",
});

const icons = {
  icon: [
    {
      rel: "icon",
      type: "image/png",
      media: "(prefers-color-scheme: light)",
      url: "/icon_dark.png",
    },
    {
      rel: "icon",
      type: "image/png",
      media: "(prefers-color-scheme: dark)",
      url: "/icon_light.png",
    },
  ],
};

export const metadata: Metadata = {
  title: "Tietokilta 40",
  description: "Tietokilta 40",
  icons,
};

const locales = ["en", "fi"] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} className="bg-accent-light">
      <body
        className={`${inter.variable} ${robotoMono.variable} ${pixelFont.variable} antialiased`}
      >
        <I18nProviderClient locale={locale}>
          <Navbar />
          {children}
          <Footer />
        </I18nProviderClient>
      </body>
    </html>
  );
}
