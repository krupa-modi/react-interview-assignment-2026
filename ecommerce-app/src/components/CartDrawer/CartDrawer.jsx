import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import CartItem from '../CartItem/CartItem';
import EmptyState from '../EmptyState/EmptyState';
import styles from './CartDrawer.module.scss';

export default function CartDrawer() {
  const { items, subtotal, total, isDrawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isDrawerOpen ? styles.visible : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>
            Your Cart
            {items.length > 0 && (
              <span className={styles.count}>({items.length})</span>
            )}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeDrawer}
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        <div className={styles.body}>
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Browse our products and add items to get started."
              action={
                <Link to="/" className={styles.shopLink} onClick={closeDrawer}>
                  Continue Shopping
                </Link>
              }
            />
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
