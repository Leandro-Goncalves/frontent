import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "./components/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./(routes)/(home)/components/Header";
import { Suspense, cache } from "react";
import { HeaderFallback } from "./(routes)/(home)/components/Header/HeaderFallback";
import { OnBeforeUnload } from "./components/OnBeforeUnload";
import Head from "next/head";
// import { GoogleAnalytics } from "@next/third-parties/google";
import GoogleAnalytics from "@utils/GAEvents/GoogleAnalytics";
import { ComingSoon } from "./components/ComingSoon";
import { Footer } from "./components/Footer";
import { establishmentService } from "./services/establishment";
import env from "./env";
import { ThemeProvider } from "@/components/theme-provider";
import { AlertDialogProvider } from "@/components/AlertDialogProvider";
import { Gui } from "./components/Gui";
import { HideOnProduction } from "./utils/misc/HideOnProduction";
import { getItem } from "./utils/misc/isSsr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Cacau Store",
    default: "Cacau Store",
  },
  description: "✨Estilo é conforto e conforto também é estilo!",
  metadataBase: new URL("https://www.caacaustore.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.caacaustore.com/",
    title: "Cacau Store",
    description: "✨Estilo é conforto e conforto também é estilo!",
    emails: ["sac@caacaustore.com"],
    phoneNumbers: ["+5519991824852"],
    siteName: "Cacau Store",
    locale: "pt_BR",
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

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: establishment } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );

  const data = await getItem("asd");
  console.log(env.API_URL, data);

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
        <GoogleAnalytics />
        <ThemeProvider themeGuid={establishment.themeGuid}>
          <ComingSoon />
          <div id="content">
            <QueryProvider>
              <Suspense fallback={<HeaderFallback />}>
                <Header />
              </Suspense>
              <AlertDialogProvider>{children}</AlertDialogProvider>
              <ToastContainer />
              <OnBeforeUnload />
            </QueryProvider>
            <Footer phone={establishment.phone} />
          </div>

          {/* <GoogleAnalytics gaId="G-K9Q7T63R83" /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
