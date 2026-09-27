import { createContext } from 'react';
import { useMessenger } from '../hooks/useMessenger';

type MessengerContextValue = ReturnType<typeof useMessenger>;

export const MessengerContext = createContext<MessengerContextValue | null>(null);
