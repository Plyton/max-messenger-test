import { createContext } from 'react';
import type { ReactNode } from 'react';
import { useMessenger } from '@/modules/chat/hooks/useMessenger';
import type { GreenApiCredentials } from '@/services/greenApi/types';

type MessengerContextValue = ReturnType<typeof useMessenger>;

// The context and provider intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export const MessengerContext = createContext<MessengerContextValue | null>(null);

type Props = {
  credentials: GreenApiCredentials;
  children: ReactNode;
};

export function MessengerProvider({ credentials, children }: Props) {
  const messenger = useMessenger({ credentials });

  return <MessengerContext.Provider value={messenger}>{children}</MessengerContext.Provider>;
}
