import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
