import styles from './ChatHeader.module.scss';

type Props = {
  title: string;
  onLogout: () => void;
};

function ChatHeader({ title, onLogout }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.avatar}>M</div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>MAX</p>
      </div>
      <button className={styles.logout} onClick={onLogout} type="button">
        Выйти
      </button>
    </div>
  );
}

export default ChatHeader;
