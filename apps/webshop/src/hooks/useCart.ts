import { useEffect, useState } from 'react';
import { CartItem } from '../types';

const stored: CartItem[] =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [];

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(stored);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });

  const addToCart = (item: { productId: string }) => {
    console.log('adding product to cart:', item.productId);

    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: item.productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return { cart, addToCart, removeFromCart, clearCart, totalItems };
}
