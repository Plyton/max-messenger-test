import { useState } from 'react';
import { BaseButton, IconClose, IconMaxLogo } from '@/shared/ui';
import ConversationList from '../ConversationList/ConversationList';
import NewChatForm from '../NewChatForm/NewChatForm';
import { useMessengerContext } from '../../context/useMessengerContext';
import styles from './ChatSidebar.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ChatSidebar({ isOpen, onClose }: Props) {
  const { accountError, currentChat, isCheckingAccount, openChat } = useMessengerContext();
  const [phoneNumber, setPhoneNumber] = useState('');

  async function handleCreateChat() {
    const succeeded = await openChat(phoneNumber);

    if (succeeded) {
      onClose();
    }

    return succeeded;
  }

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`}
      id="chat-sidebar"
    >
      <div className={styles.sidebarHeading}>
        <div className={styles.brandGroup}>
          <span className={styles.brandIcon} aria-hidden="true">
            <IconMaxLogo />
          </span>
          <h1 className={styles.brand}>MAX</h1>
          <span className={styles.onlineDot} aria-label="Подключено" title="Подключено" />
        </div>
        <BaseButton
          aria-label="Закрыть список чатов"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <IconClose />
        </BaseButton>
      </div>
      <NewChatForm
        error={accountError}
        isCheckingAccount={isCheckingAccount}
        onPhoneNumberChange={setPhoneNumber}
        onSubmit={handleCreateChat}
        phoneNumber={phoneNumber}
      />
      <p className={styles.sectionLabel}>ЧАТЫ</p>
      <ConversationList onSelect={onClose} phoneNumber={currentChat?.phoneNumber ?? null} />
    </aside>
  );
}

export default ChatSidebar;
