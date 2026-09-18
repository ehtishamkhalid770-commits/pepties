export type ProductCategory = "patisserie" | "skincare" | "pets";

export interface Product {
  id: string;
  name: string;
  urduName: string;
  category: ProductCategory;
  price: number; // in PKR (Rs.)
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string; // Dynamic path or placeholder SVG styled luxuriously
  colorAccent: string; // For golden or blue glowing frames
  specLabel: string; // e.g. "Weight: 180g", "Volume: 50ml", "Material: Silk"
  specValue: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
