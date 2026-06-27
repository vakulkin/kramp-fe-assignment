import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../pages/_app';
import { CartItemDetail } from '../cart-item/CartItem';
import OrderConfirmation from '../order-confirmation/OrderConfirmation';
import EmptyCart from '../empty-cart/EmptyCart';
import LoadingCart from '../loading-cart/LoadingCart';
import CartItemList from '../cart-list/CartItemList';
import CartSummary from '../cart-summary/CartSummary';
import PlaceOrderAction from '../place-order-action/PlaceOrderAction';
import styles from './CheckoutPage.module.css';

interface CartDetails {
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

export default function CheckoutPage() {
  const { cart } = useContext(CartContext) as any;
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const items = cart.cart || [];

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

  if (placedOrder) {
    return <OrderConfirmation placedOrder={placedOrder} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Checkout</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : isLoading || !cartDetails ? (
          <LoadingCart />
        ) : (
          <>
            <CartItemList
              items={cartDetails.items}
              onRemove={cart.removeFromCart}
            />

            <CartSummary
              subtotal={cartDetails.subtotal}
              shipping={cartDetails.shipping}
              tax={cartDetails.tax}
              grandTotal={cartDetails.grandTotal}
            />

            <PlaceOrderAction
              onPlaceOrder={handlePlaceOrder}
              isPlacingOrder={isPlacingOrder}
            />
          </>
        )}
      </div>
    </div>
  );
}
