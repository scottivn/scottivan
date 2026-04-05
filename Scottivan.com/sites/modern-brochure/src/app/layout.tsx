import type { Metadata } from "next";
import "./globals.css";
import { ModelBanner } from "@scottivan/shared";

const MODEL_NAME = "Local Business Studio";

export const metadata: Metadata = {
  title: "Ivan Digital — Websites That Get You More Customers",
  description:
    "Conversion-focused websites for local businesses. More calls, more leads, more bookings. Built by Scott Ivan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModelBanner modelName={MODEL_NAME} />
        <main>{children}</main>
      </body>
    </html>
  );
}
