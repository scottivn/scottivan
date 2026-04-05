import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scott Ivan — Engineer, Builder, Creator",
  description:
    "Platform engineer and web developer. Explore my work, browse live website demos, or get a custom site built for your business.",
  openGraph: {
    title: "Scott Ivan — Engineer, Builder, Creator",
    description:
      "Platform engineer and web developer. Explore my work or get a custom site built for your business.",
    url: "https://scottivan.com",
    siteName: "scottivan.com",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
