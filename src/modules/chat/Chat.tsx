import { useState } from 'react';
import ChatHeader from '@/modules/chat/components/ChatHeader/ChatHeader';
import ChatErrors from '@/modules/chat/components/ChatErrors/ChatErrors';
import ChatSidebar from '@/modules/chat/components/ChatSidebar/ChatSidebar';
import EmptyChat from '@/modules/chat/components/EmptyChat/EmptyChat';
import MessageComposer from '@/modules/chat/components/MessageComposer/MessageComposer';
import MessageList from '@/modules/chat/components/MessageList/MessageList';
import { useChatSessionContext } from '@/app/context/useChatSessionContext';
import { useMessengerContext } from '@/modules/chat/context/useMessengerContext';
import styles from './Chat.module.scss';

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { onLogout } = useChatSessionContext();
  const { currentChat, isSending, messages, sendMessage } = useMessengerContext();

  return (
    <div className={styles.app}>
      <button
        aria-hidden={!isSidebarOpen}
        aria-label="Закрыть список чатов"
        className={`${styles.overlay} ${isSidebarOpen ? styles['overlay--visible'] : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        tabIndex={isSidebarOpen ? 0 : -1}
        type="button"
      />
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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
