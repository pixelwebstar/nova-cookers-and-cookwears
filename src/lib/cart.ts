"use client";

import { Product } from "./db";

export interface CartItem {
  product: Product;
  quantity: number;
  includeInstallation: boolean;
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("nova_cart");
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(product: Product, includeInstallation: boolean = false): void {
  if (typeof window === "undefined") return;
  const items = getCartItems();
  const existing = items.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
    existing.includeInstallation = existing.includeInstallation || includeInstallation;
  } else {
    items.push({ product, quantity: 1, includeInstallation });
  }
  localStorage.setItem("nova_cart", JSON.stringify(items));
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event("cart_updated"));
}

export function updateCartQuantity(productId: string, quantity: number): void {
  if (typeof window === "undefined") return;
  let items = getCartItems();
  if (quantity <= 0) {
    items = items.filter((item) => item.product.id !== productId);
  } else {
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  localStorage.setItem("nova_cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cart_updated"));
}

export function toggleCartInstallation(productId: string): void {
  if (typeof window === "undefined") return;
  const items = getCartItems();
  const item = items.find((item) => item.product.id === productId);
  if (item) {
    item.includeInstallation = !item.includeInstallation;
  }
  localStorage.setItem("nova_cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cart_updated"));
}

export function removeFromCart(productId: string): void {
  if (typeof window === "undefined") return;
  const items = getCartItems();
  const filtered = items.filter((item) => item.product.id !== productId);
  localStorage.setItem("nova_cart", JSON.stringify(filtered));
  window.dispatchEvent(new Event("cart_updated"));
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("nova_cart");
  window.dispatchEvent(new Event("cart_updated"));
}
