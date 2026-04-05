import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Scott Ivan | Platform Engineer",
  description:
    "Platform & DevSecOps engineer specializing in Kubernetes, EKS, and cloud-native architecture. CKA certified.",
  openGraph: {
    title: "Scott Ivan | Platform Engineer",
    description: "Platform & DevSecOps engineer specializing in Kubernetes, EKS, and cloud-native architecture.",
    url: "https://me.scottivan.com",
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
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
