import BaseButton from '@/shared/ui/BaseButton/BaseButton';
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
      <BaseButton
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
      </BaseButton>
      <div className={styles.avatar}>M</div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>MAX</p>
      </div>
      <BaseButton className={styles.logout} onClick={onLogout} type="button">
        Выйти
      </BaseButton>
    </div>
  );
}

export default ChatHeader;
