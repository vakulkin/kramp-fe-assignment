import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
    (set) => ({
      cart: [],
      totalItems: 0,
      addToCart: (item) => set((state) => {
        const existingIndex = state.cart.findIndex((i) => i.productId === item.productId);

        if (existingIndex !== -1) {
          const newCart = [...state.cart];
          newCart[existingIndex] = {
            ...newCart[existingIndex],
            quantity: newCart[existingIndex].quantity + 1,
          };
          return { cart: newCart, totalItems: state.totalItems + 1 };
        }

        return {
          cart: [...state.cart, { productId: item.productId, quantity: 1 }],
          totalItems: state.totalItems + 1,
        };
      }),
      removeFromCart: (productId) => set((state) => {
        const itemToRemove = state.cart.find((i) => i.productId === productId);
        if (!itemToRemove) return state;

        return {
          cart: state.cart.filter((i) => i.productId !== productId),
          totalItems: state.totalItems - itemToRemove.quantity,
        };
      }),
      clearCart: () => set({ cart: [], totalItems: 0 }),
    }),
    {
      name: 'cart',
    }
  )
);
