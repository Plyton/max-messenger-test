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
  const { onLogout } = useChatSessionContext();
  const { currentChat, isSending, messages, sendMessage } = useMessengerContext();

  return (
    <div className={styles.app}>
      <ChatSidebar />

      <main className={styles.chatArea}>
        <ChatHeader onLogout={onLogout} title={currentChat?.phoneNumber ?? 'MAX'} />
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
