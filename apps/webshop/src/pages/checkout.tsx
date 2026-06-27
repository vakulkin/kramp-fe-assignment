import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from './_app';
import styles from './checkout.module.css';

interface CartItemDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl?: string;
}

interface CartDetails {
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

export default function CheckoutPage() {
  const { cart } = useContext(CartContext) as any;
  const [confirmed, setConfirmed] = useState(false);
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
          cart.clearCart();
          setConfirmed(true);
        }
        setIsPlacingOrder(false);
      })
      .catch(err => {
        console.error('Error placing order:', err);
        setIsPlacingOrder(false);
      });
  };

  if (confirmed) {
    return (
      <div className={styles.confirmation}>
        <h1>Order placed!</h1>
        <p>Thank you for your order. You will receive a confirmation email shortly.</p>
        <Link href="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Checkout</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link href="/" className={styles.continueLink}>Continue shopping</Link>
          </div>
        ) : isLoading || !cartDetails ? (
          <div className={styles.empty}>
            <p>Loading cart details...</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cartDetails.items.map((item: CartItemDetail) => (
                <div key={item.productId} className={styles.item}>
                  <div className={styles.itemMainInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>×{item.quantity}</span>
                  </div>
                  <div className={styles.itemActions}>
                    <span className={styles.itemPrice}>
                      €{item.total.toFixed(2)}
                    </span>
                    <button
                      className={styles.removeButton}
                      onClick={() => cart.removeFromCart(item.productId)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>€{cartDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{cartDetails.shipping === 0 ? 'Free' : `€${cartDetails.shipping.toFixed(2)}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>VAT (21% included)</span>
                <span>€{cartDetails.tax.toFixed(2)}</span>
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <strong>€{cartDetails.grandTotal.toFixed(2)}</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.placeOrderButton}
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  cursor: isPlacingOrder ? 'not-allowed' : 'pointer',
                  opacity: isPlacingOrder ? 0.7 : 1,
                }}
              >
                {isPlacingOrder ? 'Placing order...' : 'Place order'}
              </button>
              <Link href="/" className={styles.continueLink}>Continue shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
