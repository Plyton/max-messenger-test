import { useRef } from 'react';
import BaseButton from '@/shared/ui/BaseButton/BaseButton';
import LogoutConfirm from '@/modules/chat/components/LogoutConfirm/LogoutConfirm';
import type { LogoutConfirmRef } from '@/modules/chat/components/LogoutConfirm/LogoutConfirm';
import styles from './ChatHeader.module.scss';

type Props = {
  title: string;
  onLogout: () => void;
  onOpenSidebar: () => void;
  sidebarIsOpen: boolean;
};

function ChatHeader({ title, onLogout, onOpenSidebar, sidebarIsOpen }: Props) {
  const logoutConfirmRef = useRef<LogoutConfirmRef>(null);

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
          {' '}
          <path d="M19 12H7M11 6l-6 6 6 6" />{' '}
        </svg>
      </BaseButton>
      <div className={styles.avatar}>M</div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>MAX</p>
      </div>
      <BaseButton
        className={styles.logout}
        onClick={() => logoutConfirmRef.current?.open()}
        type="button"
      >
        Выйти
      </BaseButton>
      <LogoutConfirm onConfirm={onLogout} ref={logoutConfirmRef} />
    </div>
  );
}

export default ChatHeader;
