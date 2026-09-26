import type { ReactNode } from 'react';
import { ChatSessionContext } from './ChatSessionContext';

type Props = {
  onLogout: () => void;
  children: ReactNode;
};

export function ChatSessionProvider({ onLogout, children }: Props) {
  return <ChatSessionContext.Provider value={{ onLogout }}>{children}</ChatSessionContext.Provider>;
}
