import { useContext } from 'react';
import { GreenContext } from '@/app/context/GreenContext';
import { MessengerProvider } from '@/modules/chat/context/MessengerContext';
import Chat from '@/modules/chat/Chat';

function ChatPage() {
  const context = useContext(GreenContext);

  if (!context) {
    throw new Error('useGreenContext must be used within GreenProvider');
  }

  const { credentials } = context;

  if (!credentials) {
    return null;
  }

  return (
    <MessengerProvider credentials={credentials}>
      <Chat />
    </MessengerProvider>
  );
}

export default ChatPage;
