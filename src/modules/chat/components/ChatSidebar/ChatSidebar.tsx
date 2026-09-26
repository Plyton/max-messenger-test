import { useState } from 'react';
import ConversationList from '@/modules/chat/components/ConversationList/ConversationList';
import NewChatForm from '@/modules/chat/components/NewChatForm/NewChatForm';
import { useMessengerContext } from '@/modules/chat/context/useMessengerContext';
import styles from './ChatSidebar.module.scss';

function ChatSidebar() {
  const { accountError, currentChat, isCheckingAccount, openChat } = useMessengerContext();
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleCreateChat() {
    return openChat(phoneNumber);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeading}>
        <h1 className={styles.brand}>MAX</h1>
        <span className={styles.onlineDot} aria-label="Подключено" />
      </div>
      <NewChatForm
        error={accountError}
        isCheckingAccount={isCheckingAccount}
        onPhoneNumberChange={setPhoneNumber}
        onSubmit={handleCreateChat}
        phoneNumber={phoneNumber}
      />
      <p className={styles.sectionLabel}>ЧАТЫ</p>
      <ConversationList phoneNumber={currentChat?.phoneNumber ?? null} />
    </aside>
  );
}

export default ChatSidebar;
