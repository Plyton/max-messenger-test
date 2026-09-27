import { createContext } from 'react';
import { useMessenger } from '@/modules/chat/hooks/useMessenger';

type MessengerContextValue = ReturnType<typeof useMessenger>;

export const MessengerContext = createContext<MessengerContextValue | null>(null);
