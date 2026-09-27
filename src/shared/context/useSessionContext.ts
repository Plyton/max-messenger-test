import { useContext } from 'react';
import { SessionContext } from './SessionContext';

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider');
  }

  return context;
}
