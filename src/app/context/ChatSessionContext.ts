import { createContext } from 'react';

export type ChatSessionContextValue = {
  onLogout: () => void;
};

export const ChatSessionContext = createContext<ChatSessionContextValue | null>(null);
