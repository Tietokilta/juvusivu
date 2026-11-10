import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import { routing } from "@i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  title: "Muistinnollaus 101001",
  description: "Tietokillan 41. vuosijuhla",
  icons,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  return (
    <html lang={validLocale} className="bg-background">
      <body
        className={`${inter.className} ${inter.variable} ${spaceMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={validLocale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
