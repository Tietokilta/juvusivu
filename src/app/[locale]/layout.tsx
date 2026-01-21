import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { routing } from "@i18n/routing";

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

const redactionFont = localFont({
  src: "../../../public/fonts/redaction/Redaction_35-Bold.woff2",
  variable: "--font-redaction",
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
    <html lang={validLocale} className="bg-accent-light">
      <body
        className={`${inter.className} ${inter.variable} ${robotoMono.variable} ${pixelFont.variable} ${redactionFont.variable} antialiased`}
      >
        <NextIntlClientProvider locale={validLocale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
