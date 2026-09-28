import type { ChatMessage } from '../../types';
import styles from './MessageBubble.module.scss';

type Props = {
  msg: ChatMessage;
};

function MessageBubble({ msg }: Props) {
  const time = new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rowModifier = msg.direction === 'incoming' ? styles['row--incoming'] : 'justify-end';
  const bubbleModifier =
    msg.direction === 'incoming' ? styles['bubble--incoming'] : styles['bubble--outgoing'];

  return (
    <div className={`d-flex ${styles.row} ${rowModifier}`}>
      <div className={`${styles.bubble} ${bubbleModifier}`}>
        <div>{msg.text}</div>
        <div className={`mt-2 text-right ${styles.meta}`}>{time}</div>
      </div>
    </div>
  );
}

export default MessageBubble;
