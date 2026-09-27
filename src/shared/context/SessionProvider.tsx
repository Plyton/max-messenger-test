import type { ReactNode } from 'react';
import { SessionContext } from './SessionContext';

type Props = {
  onLogout: () => void;
  children: ReactNode;
};

export function SessionProvider({ onLogout, children }: Props) {
  return <SessionContext.Provider value={{ onLogout }}>{children}</SessionContext.Provider>;
}
