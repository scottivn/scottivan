/**
 * Domain types for Field & Larder.
 *
 * These mirror the eventual DynamoDB schema (Phase 6) so the migration from
 * static catalog → live admin-managed catalog is mechanical.
 */

export type CategorySlug =
  | "produce"
  | "prepared"
  | "bread"
  | "dairy-eggs"
  | "pantry"
  | "sweets"
  | "coffee-tea";

export type CategorySide = "field" | "larder";

export type DietaryTag =
  | "gluten-free"
  | "vegan"
  | "vegetarian"
  | "dairy-free"
  | "nut-free"
  | "organic";

export type Allergen =
  | "gluten"
  | "dairy"
  | "eggs"
  | "tree-nuts"
  | "peanuts"
  | "soy"
  | "sesame";

export type Fulfillment = "pickup-only" | "ship-only" | "both";

export interface Category {
  slug: CategorySlug;
  side: CategorySide;
  name: string;
  /** Used on the home categories grid + page subtitles */
  blurb: string;
  /** Two-hue gradient (degrees on the color wheel, 0-360) used for placeholder imagery */
  hue: [number, number];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number; // cents
  unit: string; // "12oz", "loaf", "bunch"
  description: string;
  sourcingNotes?: string;
  allergens: Allergen[];
  dietaryTags: DietaryTag[];
  stock: number;
  lowStockThreshold: number;
  fulfillment: Fulfillment;
  featured?: boolean;
  newThisWeek?: boolean;
  todayOnly?: boolean;
  /** Range of hue degrees for the gradient-placeholder card */
  hue: [number, number];
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
  fulfillment: "pickup" | "ship";
}
