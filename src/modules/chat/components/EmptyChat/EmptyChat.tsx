import styles from './EmptyChat.module.scss';

function EmptyChat() {
  return (
    <section
      className={`d-flex flex-column items-center justify-center flex-1 text-center pa-12 ${styles.emptyState}`}
    >
      <div className={styles.icon} aria-hidden="true">
        M
      </div>
      <h2>Начните общение</h2>
      <p>Введите номер телефона, чтобы найти контакт и начать общение.</p>
    </section>
  );
}

export default EmptyChat;
