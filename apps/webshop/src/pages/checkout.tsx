import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from './_app';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { cart } = useContext(CartContext) as any;
  const [confirmed, setConfirmed] = useState(false);

  const items = cart.cart || [];
  const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.21;
  const shipping = items.reduce(
    (acc: number, item: any) => acc + (item.quantity > 5 ? 0 : 4.95),
    0
  );
  const grandTotal = subtotal + shipping;

  const handlePlaceOrder = () => {
    console.log(
      'order subtotal:',
      subtotal.toFixed(2),
      '| VAT (21%):',
      tax.toFixed(2),
      '| shipping:',
      shipping.toFixed(2),
      '| grand total:',
      grandTotal.toFixed(2)
    );

    cart.clearCart();
    setConfirmed(true);
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
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item: any, index: number) => (
                <div key={index} className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQty}>×{item.quantity}</span>
                  <span className={styles.itemPrice}>
                    €{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
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
              <div className={styles.total}>
                <span>Total</span>
                <strong>€{grandTotal.toFixed(2)}</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <div
                className={styles.placeOrderButton}
                onClick={handlePlaceOrder}
              >
                Place order
              </div>
              <Link href="/" className={styles.continueLink}>Continue shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
