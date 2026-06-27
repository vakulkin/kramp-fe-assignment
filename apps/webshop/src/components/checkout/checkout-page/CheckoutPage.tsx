import { memo } from 'react';
import { SEO } from '../../widgets/seo/SEO';
import { CartItem, CartDetails, Order } from '../../../types';
import OrderConfirmation from '../order-confirmation/OrderConfirmation';
import EmptyCart from '../empty-cart/EmptyCart';
import LoadingCart from '../loading-cart/LoadingCart';
import CartItemList from '../cart-list/CartItemList';
import CartSummary from '../cart-summary/CartSummary';
import PlaceOrderAction from '../place-order-action/PlaceOrderAction';
import styles from './CheckoutPage.module.css';

console.log('[CheckoutPage] module loaded');

interface CheckoutPageProps {
  items: CartItem[];
  placedOrder: Order | null;
  cartDetails: CartDetails | null;
  isLoading: boolean;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
  onRemove: (productId: string) => void;
  error?: string | null;
}


const CheckoutPage = memo(function CheckoutPage({
  items,
  placedOrder,
  cartDetails,
  isLoading,
  isPlacingOrder,
  onPlaceOrder,
  onRemove,
  error,
}: CheckoutPageProps) {
  console.log('[CheckoutPage] render');

  if (placedOrder) {
    return (
      <>
        <SEO title="Order Confirmed | Kramp Webshop" description="Your order has been successfully placed." />
        <OrderConfirmation placedOrder={placedOrder} />
      </>
    );
  }

  return (
    <>
      <SEO title="Checkout | Kramp Webshop" description="Review your items and place your order." />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Checkout</h1>

          {items.length === 0 ? (
            <EmptyCart />
          ) : error ? (
            <div style={{ color: 'red', marginTop: '20px', padding: '20px', border: '1px solid red', borderRadius: '8px' }}>
              <h2>Failed to load cart details</h2>
              <p>{error}</p>
            </div>
          ) : isLoading || !cartDetails ? (
            <LoadingCart />
          ) : (
            <>
              <CartItemList
                items={cartDetails.items}
                onRemove={onRemove}
              />

              <CartSummary
                subtotal={cartDetails.subtotal}
                shipping={cartDetails.shipping}
                tax={cartDetails.tax}
                grandTotal={cartDetails.grandTotal}
              />

              <PlaceOrderAction
                onPlaceOrder={onPlaceOrder}
                isPlacingOrder={isPlacingOrder}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
});

export default CheckoutPage;
