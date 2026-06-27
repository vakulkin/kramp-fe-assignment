import { CartItemDetail } from '../cart-item/CartItem';
import OrderConfirmation from '../order-confirmation/OrderConfirmation';
import EmptyCart from '../empty-cart/EmptyCart';
import LoadingCart from '../loading-cart/LoadingCart';
import CartItemList from '../cart-list/CartItemList';
import CartSummary from '../cart-summary/CartSummary';
import PlaceOrderAction from '../place-order-action/PlaceOrderAction';
import styles from './CheckoutPage.module.css';

interface CheckoutPageProps {
  items: any[];
  placedOrder: any;
  cartDetails: {
    items: CartItemDetail[];
    subtotal: number;
    tax: number;
    shipping: number;
    grandTotal: number;
  } | null;
  isLoading: boolean;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
  onRemove: (productId: string) => void;
}

export default function CheckoutPage({
  items,
  placedOrder,
  cartDetails,
  isLoading,
  isPlacingOrder,
  onPlaceOrder,
  onRemove,
}: CheckoutPageProps) {
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
  );
}

