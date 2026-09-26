import { useMessengerContext } from '@/modules/chat/context/useMessengerContext';
import styles from './ChatErrors.module.scss';

function ChatErrors() {
  const { receiveError, sendError } = useMessengerContext();

  return (
    <>
      {receiveError && (
        <p className={styles.statusError} role="status">
          {receiveError}
        </p>
      )}
      {sendError && (
        <p className={styles.statusError} role="alert">
          {sendError}
        </p>
      )}
    </>
  );
}

export default ChatErrors;
