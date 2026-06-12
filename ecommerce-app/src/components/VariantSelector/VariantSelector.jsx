import styles from './VariantSelector.module.scss';

export default function VariantSelector({
  label,
  options,
  value,
  onChange,
  type = 'button',
  getStockStatus,
}) {
  return (
    <div className={styles.group}>
      <p className={styles.label}>
        {label}: <span>{value}</span>
      </p>
      <div className={styles.options}>
        {options.map((option) => {
          if (type === 'color') {
            const status = getStockStatus?.(option) ?? 'available';
            const isSoldOut = status === 'sold-out';

            return (
              <button
                key={option.name}
                type="button"
                title={option.name}
                disabled={isSoldOut}
                className={`${styles.colorSwatch} ${value === option.name ? styles.selected : ''} ${isSoldOut ? styles.soldOut : ''}`}
                style={{ backgroundColor: option.hex }}
                onClick={() => onChange(option.name)}
              />
            );
          }

          const status = getStockStatus?.(option) ?? 'available';
          const isSoldOut = status === 'sold-out';
          const isLow = status === 'low';

          return (
            <button
              key={option}
              type="button"
              disabled={isSoldOut}
              className={`${styles.option} ${value === option ? styles.selected : ''} ${isSoldOut ? styles.soldOut : ''} ${isLow ? styles.lowStock : ''}`}
              onClick={() => onChange(option)}
            >
              {option}
              {isLow && <span className={styles.lowTag}>Low</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
