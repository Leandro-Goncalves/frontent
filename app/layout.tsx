import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "./components/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./(routes)/(home)/components/Header";
import { Suspense } from "react";
import { HeaderFallback } from "./(routes)/(home)/components/Header/HeaderFallback";
import { OnBeforeUnload } from "./components/OnBeforeUnload";
import { useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { ComingSoon } from "./components/ComingSoon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Cacau Store",
    default: "Cacau Store",
  },
  description: "✨Estilo é conforto e conforto também é estilo!",
  openGraph: {
    type: "website",
    url: "https://www.caacaustore.com/",
    title: "Cacau Store",
    description: "✨Estilo é conforto e conforto também é estilo!",
    emails: ["sac@caacaustore.com"],
    phoneNumbers: ["+5519991824852"],
    siteName: "Cacau Store",
    images: [
      {
        url: "https://www.caacaustore.com/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Cacau Store logo",
        type: "image/png",
      },
    ],
  },
};

export const revalidate = 1;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={inter.className}>
        <ComingSoon />
        <div id="content">
          <QueryProvider>
            <Suspense fallback={<HeaderFallback />}>
              <Header />
            </Suspense>
            {children}
            <ToastContainer />
            <OnBeforeUnload />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
