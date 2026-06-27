import { useContext, useState, useEffect } from 'react';
import { CartContext } from './_app';
import CheckoutPage from '../components/checkout/checkout-page/CheckoutPage';

export default function CheckoutRoute() {
  const { cart } = useContext(CartContext) as any;
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [cartDetails, setCartDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const items = cart?.cart || [];

  useEffect(() => {
    if (items.length === 0) {
      setCartDetails(null);
      return;
    }

    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: {
          items: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.data?.cartDetails) {
          setCartDetails(data.data.cartDetails);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cart details:', err);
        setIsLoading(false);
      });
  }, [items]);

  const handlePlaceOrder = () => {
    if (items.length === 0 || isPlacingOrder) return;

    setIsPlacingOrder(true);
    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: {
          items: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      }),
    })
      .then(res => res.json())
      .then(data => {
        const order = data.data?.createOrder;
        if (order) {
          console.log(
            'order subtotal:',
            order.subtotal.toFixed(2),
            '| VAT (21%):',
            order.tax.toFixed(2),
            '| shipping:',
            order.shipping.toFixed(2),
            '| grand total:',
            order.grandTotal.toFixed(2),
            '| order id (uuidv7):',
            order.id
          );
          setPlacedOrder(order);
          cart.clearCart();
        }
        setIsPlacingOrder(false);
      })
      .catch(err => {
        console.error('Error placing order:', err);
        setIsPlacingOrder(false);
      });
  };

  return (
    <CheckoutPage
      items={items}
      placedOrder={placedOrder}
      cartDetails={cartDetails}
      isLoading={isLoading}
      isPlacingOrder={isPlacingOrder}
      onPlaceOrder={handlePlaceOrder}
      onRemove={cart?.removeFromCart}
    />
  );
}
