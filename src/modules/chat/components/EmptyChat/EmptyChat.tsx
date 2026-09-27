import styles from './EmptyChat.module.scss';

function EmptyChat() {
  return (
    <section className={styles.emptyState}>
      <div className={styles.icon} aria-hidden="true">
        M
      </div>
      <h2>Начните общение</h2>
      <p>Введите номер телефона, чтобы найти контакт и начать общение.</p>
    </section>
  );
}

export default EmptyChat;
