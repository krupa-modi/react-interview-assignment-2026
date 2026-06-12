import styles from './EmptyState.module.scss';

export default function EmptyState({ title, description, action }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
