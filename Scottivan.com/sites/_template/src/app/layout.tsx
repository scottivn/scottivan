import type { Metadata } from "next";
import "./globals.css";
import { BrandHeader, BrandFooter, ModelBanner } from "@scottivan/shared";

const MODEL_NAME = "Template Model";

export const metadata: Metadata = {
  title: `${MODEL_NAME} | scottivan.com`,
  description: "A customizable website model by Scott Ivan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ModelBanner modelName={MODEL_NAME} />
        <BrandHeader />
        <main>{children}</main>
        <BrandFooter />
      </body>
    </html>
  );
}
