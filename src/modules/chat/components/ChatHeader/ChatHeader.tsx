import styles from './ChatHeader.module.scss';

type Props = {
  title: string;
  onLogout: () => void;
  onOpenSidebar: () => void;
  sidebarIsOpen: boolean;
};

function ChatHeader({ title, onLogout, onOpenSidebar, sidebarIsOpen }: Props) {
  return (
    <div className={styles.header}>
      <button
        aria-controls="chat-sidebar"
        aria-expanded={sidebarIsOpen}
        aria-label="Открыть список чатов"
        className={styles.menuButton}
        onClick={onOpenSidebar}
        type="button"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
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
