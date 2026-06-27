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

// ----------------------------------------------------
// Reusable Pricing Summary Component
// ----------------------------------------------------
interface PriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  totalLabel?: string;
  totalClassName?: string;
}

function PriceSummary({
  subtotal,
  shipping,
  tax,
  grandTotal,
  totalLabel = 'Total',
  totalClassName = styles.total,
}: PriceSummaryProps) {
  return (
    <>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>€{subtotal.toFixed(2)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>VAT (21% included)</span>
        <span>€{tax.toFixed(2)}</span>
      </div>
      <div className={totalClassName}>
        <span>{totalLabel}</span>
        <strong>€{grandTotal.toFixed(2)}</strong>
      </div>
    </>
  );
}

// ----------------------------------------------------
// Order Confirmation Sub-components & Main Component
// ----------------------------------------------------
interface ConfirmedItemProps {
  item: any;
}

function ConfirmedItem({ item }: ConfirmedItemProps) {
  return (
    <div className={styles.confirmedItem}>
      <span className={styles.itemName}>{item.name}</span>
      <span className={styles.itemQty}>×{item.quantity}</span>
      <span className={styles.itemPrice}>€{item.total.toFixed(2)}</span>
    </div>
  );
}

interface OrderConfirmationProps {
  placedOrder: any;
}

function OrderConfirmation({ placedOrder }: OrderConfirmationProps) {
  return (
    <div className={styles.confirmation}>
      <div className={styles.checkmarkIcon}>✓</div>
      <h1>Order Placed Successfully!</h1>
      <p className={styles.orderNumber}>
        Order Number: <code>{placedOrder.id}</code>
      </p>
      <div className={styles.orderSummaryCard}>
        <h3>Order Details Summary</h3>
        <div className={styles.confirmedItems}>
          {(placedOrder.items || []).map((item: any) => (
            <ConfirmedItem key={item.productId} item={item} />
          ))}
        </div>
        <PriceSummary
          subtotal={placedOrder.subtotal}
          shipping={placedOrder.shipping}
          tax={placedOrder.tax}
          grandTotal={placedOrder.grandTotal}
          totalLabel="Grand Total"
          totalClassName={styles.totalRow}
        />
      </div>
      <p className={styles.thankYouNote}>
        Thank you for your order. A confirmation email and invoice details will be sent shortly.
      </p>
      <Link href="/" className={styles.continueShoppingBtn}>
        Continue shopping
      </Link>
    </div>
  );
}

// ----------------------------------------------------
// Cart List & Item Sub-components
// ----------------------------------------------------
interface CartItemProps {
  item: CartItemDetail;
  onRemove: (productId: string) => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.itemMainInfo}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemQty}>×{item.quantity}</span>
      </div>
      <div className={styles.itemActions}>
        <span className={styles.itemPrice}>€{item.total.toFixed(2)}</span>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(item.productId)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

interface CartItemListProps {
  items: CartItemDetail[];
  onRemove: (productId: string) => void;
}

function CartItemList({ items, onRemove }: CartItemListProps) {
  return (
    <div className={styles.items}>
      {items.map((item: CartItemDetail) => (
        <CartItem key={item.productId} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

function CartSummary({ subtotal, shipping, tax, grandTotal }: CartSummaryProps) {
  return (
    <div className={styles.summary}>
      <PriceSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        grandTotal={grandTotal}
      />
    </div>
  );
}

// ----------------------------------------------------
// Empty & Loading States Components
// ----------------------------------------------------
function EmptyCart() {
  return (
    <div className={styles.empty}>
      <p>Your cart is empty.</p>
      <Link href="/" className={styles.continueLink}>Continue shopping</Link>
    </div>
  );
}

function LoadingCart() {
  return (
    <div className={styles.empty}>
      <p>Loading cart details...</p>
    </div>
  );
}

// ----------------------------------------------------
// Place Order Actions Component
// ----------------------------------------------------
interface PlaceOrderActionProps {
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

function PlaceOrderAction({ onPlaceOrder, isPlacingOrder }: PlaceOrderActionProps) {
  return (
    <div className={styles.actions}>
      <button
        className={styles.placeOrderButton}
        onClick={onPlaceOrder}
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
  );
}

// ----------------------------------------------------
// Main Checkout Page Component
// ----------------------------------------------------
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
