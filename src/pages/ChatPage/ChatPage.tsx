import { useContext } from 'react';
import { GreenContext } from '@/shared/context';
import { Chat, MessengerProvider } from '@/modules';

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
