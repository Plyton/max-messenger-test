import type { ReactNode } from 'react';
import { useMessenger } from '@/modules/chat/hooks/useMessenger';
import type { GreenApiCredentials } from '@/shared/api/greenApi/types';
import { MessengerContext } from './MessengerContext';

type Props = {
  credentials: GreenApiCredentials;
  children: ReactNode;
};

export function MessengerProvider({ credentials, children }: Props) {
  const messenger = useMessenger({ credentials });

  return <MessengerContext.Provider value={messenger}>{children}</MessengerContext.Provider>;
}
