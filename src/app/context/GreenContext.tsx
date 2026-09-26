import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { GreenApiCredentials } from '@/services/greenApi/types';

export type GreenContextValue = {
  credentials: GreenApiCredentials | null;
  setCredentials: (credentials: GreenApiCredentials) => void;
  clearCredentials: () => void;
};

const GreenContext = createContext<GreenContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export function GreenProvider({ children }: Props) {
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(null);

  return (
    <GreenContext.Provider
      value={{
        credentials,
        setCredentials,
        clearCredentials: () => setCredentials(null),
      }}
    >
      {children}
    </GreenContext.Provider>
  );
}

export { GreenContext };
