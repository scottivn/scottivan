import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Specialty grocer in Hudson, NY. Produce, prepared foods, bread, dairy, pantry, coffee, and sweets — restocked weekly.",
};

export default function ShopPage() {
  return (
    <main className="flex-1">
      <ShopCatalog />
    </main>
  );
}
