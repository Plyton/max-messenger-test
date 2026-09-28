import { useRef } from 'react';
import { BaseButton, IconArrowLeft } from '@/shared/ui';
import LogoutConfirm from '../LogoutConfirm/LogoutConfirm';
import type { LogoutConfirmRef } from '../LogoutConfirm/LogoutConfirm';
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
    <div className={`d-flex items-center gap-6 ${styles.header}`}>
      <BaseButton
        aria-controls="chat-sidebar"
        aria-expanded={sidebarIsOpen}
        aria-label="Открыть список чатов"
        className={styles.menuButton}
        onClick={onOpenSidebar}
        type="button"
      >
        <IconArrowLeft />
      </BaseButton>
      <div className={`d-inline items-center justify-center ${styles.avatar}`}>M</div>
      <div>
        <h2 className={`text-ellipsis ${styles.title}`}>{title}</h2>
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
