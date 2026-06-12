import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { getProductVariants, getVariantStock } from '../../utils/variants';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }) {
  const { addItem, openDrawer } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { sizes, colors } = getProductVariants(product.id);
    const size = sizes[0];
    const color = colors[0].name;
    const maxStock = getVariantStock(product.id, size, color);

    if (maxStock === 0) return;

    addItem(product, { size, color, quantity: 1, maxStock });
    openDrawer();
  };

  const { sizes, colors } = getProductVariants(product.id);
  const defaultStock = getVariantStock(product.id, sizes[0], colors[0].name);
  const isOutOfStock = defaultStock === 0;

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
      </Link>
      <button
        type="button"
        className={styles.addBtn}
        onClick={handleQuickAdd}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </article>
  );
}
