import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './CartItem.module.scss';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className={styles.item}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.variant}>
          {item.size} / {item.color}
        </p>
        <p className={styles.price}>{formatPrice(item.price)}</p>
        <div className={styles.actions}>
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.cartItemId, qty)}
            min={1}
            max={item.maxStock}
            size="sm"
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeItem(item.cartItemId)}
            aria-label={`Remove ${item.title} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
      <p className={styles.lineTotal}>
        {formatPrice(item.price * item.quantity)}
      </p>
    </li>
  );
}
