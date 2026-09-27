import { useState } from 'react';
import { useSessionContext } from '@/shared/context';
import { BaseButton } from '@/shared/ui';
import ChatErrors from './components/ChatErrors/ChatErrors';
import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatSidebar from './components/ChatSidebar/ChatSidebar';
import EmptyChat from './components/EmptyChat/EmptyChat';
import MessageComposer from './components/MessageComposer/MessageComposer';
import MessageList from './components/MessageList/MessageList';
import { useMessengerContext } from './context/useMessengerContext';
import styles from './Chat.module.scss';

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { onLogout } = useSessionContext();
  const { currentChat, isSending, messages, sendMessage } = useMessengerContext();

  return (
    <div className={styles.app}>
      <BaseButton
        aria-hidden={!isSidebarOpen}
        aria-label="Закрыть список чатов"
        className={`${styles.overlay} ${isSidebarOpen ? styles['overlay--visible'] : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        tabIndex={isSidebarOpen ? 0 : -1}
        type="button"
      />
      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className={styles.chatArea}>
        <ChatHeader
          onLogout={onLogout}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          sidebarIsOpen={isSidebarOpen}
          title={currentChat?.phoneNumber ?? 'MAX'}
        />
        <ChatErrors />
        {currentChat ? (
          <>
            <MessageList messages={messages} />
            <MessageComposer
              disabled={isSending}
              onSend={sendMessage}
              placeholder={isSending ? 'Отправляем сообщение…' : 'Сообщение'}
            />
          </>
        ) : (
          <EmptyChat />
        )}
      </main>
    </div>
  );
}

export default Chat;
