import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Shop<span className={styles.logoAccent}>Hub</span>
        </Link>

        <button
          type="button"
          className={styles.cartBtn}
          onClick={openDrawer}
          aria-label={`Open cart, ${itemCount} items`}
        >
          <svg
            className={styles.cartIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {itemCount > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
