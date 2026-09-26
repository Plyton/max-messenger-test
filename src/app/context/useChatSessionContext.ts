import { useContext } from 'react';
import { ChatSessionContext } from './ChatSessionContext';

export function useChatSessionContext() {
  const context = useContext(ChatSessionContext);

  if (!context) {
    throw new Error('useChatSessionContext must be used within ChatSessionProvider');
  }

  return context;
}
