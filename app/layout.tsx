import type { Metadata } from "next";
import { Zain, Gabarito, Parkinsans } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { use } from "react";
import Navbar from "@/components/server/Navbar";
import { NextIntlClientProvider } from "next-intl";

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  variable: "--font-Zain",
  subsets: ["latin"],
  display: "swap",
});
const gabarito = Gabarito({
  weight: ["400", "700", "800", "900"],
  variable: "--font-Gabarito",
  subsets: ["latin"],
  display: "swap",
});

const parkinsans = Parkinsans({
  weight: ["300", "400", "700", "800"],
  variable: "--font-parkinsans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expirymate",
  description: "Your AI-powered app to track everything that expires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = use(getLocale());

  return (
    <html lang={locale}>
      <body
        className={`${zain.variable} ${gabarito.variable} ${parkinsans.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
