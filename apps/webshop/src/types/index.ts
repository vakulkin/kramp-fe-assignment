// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
  createdAt: string;
}

export interface SearchResult {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export type ProductCategory = 'Tools' | 'Fasteners' | 'Safety Equipment' | 'Power Tools';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartDetails {
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}
