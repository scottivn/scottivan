import type { Metadata } from "next";
import "./globals.css";
import { BrandHeader, BrandFooter, ModelBanner } from "@scottivan/shared";

const MODEL_NAME = "Modern Brochure";

export const metadata: Metadata = {
  title: `${MODEL_NAME} | scottivan.com`,
  description: "A clean, fast single-page brochure site for service businesses. Customizable starter model by Scott Ivan.",
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
