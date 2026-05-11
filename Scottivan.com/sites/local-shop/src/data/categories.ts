import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    slug: "produce",
    side: "field",
    name: "Produce",
    blurb: "Greenmarket fruit & vegetables, picked this week.",
    hue: [80, 130],
  },
  {
    slug: "prepared",
    side: "field",
    name: "Prepared",
    blurb: "House-made spreads, salads, soups, and ferments.",
    hue: [20, 50],
  },
  {
    slug: "bread",
    side: "field",
    name: "Bread",
    blurb: "Loaves and pastry, baked at dawn every morning.",
    hue: [25, 45],
  },
  {
    slug: "dairy-eggs",
    side: "field",
    name: "Dairy & Eggs",
    blurb: "From a handful of small farms within fifty miles.",
    hue: [45, 70],
  },
  {
    slug: "pantry",
    side: "larder",
    name: "Pantry",
    blurb: "Oils, vinegars, pasta, grains, salts, and spices.",
    hue: [15, 35],
  },
  {
    slug: "coffee-tea",
    side: "larder",
    name: "Coffee & Tea",
    blurb: "Single-origin coffee and small-batch tea.",
    hue: [10, 30],
  },
  {
    slug: "sweets",
    side: "larder",
    name: "Sweets",
    blurb: "Chocolate, caramels, granola, honey, and syrup.",
    hue: [30, 55],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const FIELD_CATEGORIES = CATEGORIES.filter((c) => c.side === "field");
export const LARDER_CATEGORIES = CATEGORIES.filter((c) => c.side === "larder");
