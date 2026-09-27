import type { ReactNode } from 'react';
import type { GreenApiCredentials } from '@/shared/api';
import { useMessenger } from '../hooks/useMessenger';
import { MessengerContext } from './MessengerContext';

type Props = {
  credentials: GreenApiCredentials;
  children: ReactNode;
};

export function MessengerProvider({ credentials, children }: Props) {
  const messenger = useMessenger({ credentials });

  return <MessengerContext.Provider value={messenger}>{children}</MessengerContext.Provider>;
}
