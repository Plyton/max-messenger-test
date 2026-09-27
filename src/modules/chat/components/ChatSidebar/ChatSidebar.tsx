import { useState } from 'react';
import ConversationList from '@/modules/chat/components/ConversationList/ConversationList';
import NewChatForm from '@/modules/chat/components/NewChatForm/NewChatForm';
import { useMessengerContext } from '@/modules/chat/context/useMessengerContext';
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
          <h1 className={styles.brand}>MAX</h1>
          <span className={styles.onlineDot} aria-label="Подключено" title="Подключено" />
        </div>
        <button
          aria-label="Закрыть список чатов"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <NewChatForm
        error={accountError}
        isCheckingAccount={isCheckingAccount}
        onPhoneNumberChange={setPhoneNumber}
        onSubmit={handleCreateChat}
        phoneNumber={phoneNumber}
      />
      <p className={styles.sectionLabel}>ЧАТЫ</p>
      <ConversationList
        onSelect={onClose}
        phoneNumber={currentChat?.phoneNumber ?? null}
      />
    </aside>
  );
}

export default ChatSidebar;
