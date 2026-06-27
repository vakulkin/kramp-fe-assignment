import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import CheckoutPage from '../components/checkout/checkout-page/CheckoutPage';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import { formatPrice } from '../utils/formatPrice';
export default function CheckoutRoute() {
  const items = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [cartDetails, setCartDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (items.length === 0) {
      setCartDetails(null);
      return;
    }

    const fetchCartDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchGraphQL<{ cartDetails: any }>(`
          query GetCartDetails($items: [CartItemInput!]!) {
            cartDetails(items: $items) {
              items {
                productId
                name
                price
                quantity
                total
              }
              subtotal
              tax
              shipping
              grandTotal
            }
          }
        `, {
          items: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        });

        if (data?.cartDetails) {
          const fetchedItems = data.cartDetails.items;
          const validProductIds = new Set(fetchedItems.map((i: any) => i.productId));

          let removedCount = 0;
          items.forEach((localItem: any) => {
            if (!validProductIds.has(localItem.productId)) {
              removeFromCart(localItem.productId);
              removedCount++;
            }
          });

          if (removedCount > 0) {
            window.alert(`${removedCount} item(s) were removed from your cart because they are out of stock.`);
          }

          setCartDetails(data.cartDetails);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching cart details:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartDetails();
  }, [items, mounted]);

  const handlePlaceOrder = async () => {
    if (items.length === 0 || isPlacingOrder) return;

    setIsPlacingOrder(true);
    setError(null);

    try {
      const data = await fetchGraphQL<{ createOrder: any }>(`
        mutation PlaceOrder($items: [CartItemInput!]!) {
          createOrder(items: $items) {
            id
            items {
              productId
              name
              price
              quantity
              total
            }
            subtotal
            tax
            shipping
            grandTotal
          }
        }
      `, {
        items: items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      const order = data?.createOrder;
      if (order) {
        console.log(
          'order subtotal:',
          formatPrice(order.subtotal),
          '| VAT (21%):',
          formatPrice(order.tax),
          '| shipping:',
          formatPrice(order.shipping),
          '| grand total:',
          formatPrice(order.grandTotal),
          '| order id (uuidv7):',
          order.id
        );
        setPlacedOrder(order);
        clearCart();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error placing order:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!mounted) return null;

  return (
    <CheckoutPage
      items={items}
      placedOrder={placedOrder}
      cartDetails={cartDetails}
      isLoading={isLoading}
      isPlacingOrder={isPlacingOrder}
      onPlaceOrder={handlePlaceOrder}
      onRemove={removeFromCart}
      error={error}
    />
  );
}
