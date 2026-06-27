import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CartStore {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: { productId: string }) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.productId === item.productId);
        let newCart;
        if (existing) {
          newCart = state.cart.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newCart = [...state.cart, { productId: item.productId, quantity: 1 }];
        }
        return {
          cart: newCart,
          totalItems: newCart.reduce((sum, i) => sum + i.quantity, 0)
        };
      }),
      removeFromCart: (productId) => set((state) => {
        const newCart = state.cart.filter((i) => i.productId !== productId);
        return {
          cart: newCart,
          totalItems: newCart.reduce((sum, i) => sum + i.quantity, 0)
        };
      }),
      clearCart: () => set({ cart: [], totalItems: 0 }),
    }),
    {
      name: 'cart', // same name as previous localStorage key
    }
  )
);


