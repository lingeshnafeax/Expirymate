import type { Metadata } from "next";
import { Zain, Gabarito, Outfit } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { use } from "react";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/lib/react-query";

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

const outfit = Outfit({
  weight: ["300", "400", "700", "800"],
  variable: "--font-Outfit",
  subsets: ["latin-ext"],
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
        className={`${zain.variable} ${gabarito.variable} ${outfit.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <div className="px-5 xl:px-72">
              <Toaster richColors />
              <Navbar />
              {children}
            </div>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
