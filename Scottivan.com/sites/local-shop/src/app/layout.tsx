import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeBoot } from "@/components/ThemeBoot";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://local-shop.scottivan.com"),
  title: {
    default: "Field & Larder — A neighborhood pantry",
    template: "%s · Field & Larder",
  },
  description:
    "Field-fresh and shelf-considered. A demo specialty grocer storefront by Scott Ivan.",
  openGraph: {
    title: "Field & Larder",
    description: "Field-fresh and shelf-considered.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeBoot />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
