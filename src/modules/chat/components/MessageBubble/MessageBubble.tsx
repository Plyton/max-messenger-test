import type { ChatMessage } from '@/modules/chat/types';
import styles from './MessageBubble.module.scss';

type Props = {
  msg: ChatMessage;
};

function MessageBubble({ msg }: Props) {
  const time = new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rowModifier =
    msg.direction === 'incoming' ? styles['row--incoming'] : styles['row--outgoing'];
  const bubbleModifier =
    msg.direction === 'incoming' ? styles['bubble--incoming'] : styles['bubble--outgoing'];

  return (
    <div className={`${styles.row} ${rowModifier}`}>
      <div className={`${styles.bubble} ${bubbleModifier}`}>
        <div>{msg.text}</div>
        <div className={styles.meta}>{time}</div>
      </div>
    </div>
  );
}

export default MessageBubble;
