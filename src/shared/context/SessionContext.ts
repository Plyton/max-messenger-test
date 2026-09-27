import { createContext } from 'react';

export type SessionContextValue = {
  onLogout: () => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);
