import { useContext } from 'react';
import { MessengerContext } from './MessengerContext';

export function useMessengerContext() {
  const context = useContext(MessengerContext);

  if (!context) {
    throw new Error('useMessengerContext must be used within MessengerProvider');
  }

  return context;
}
