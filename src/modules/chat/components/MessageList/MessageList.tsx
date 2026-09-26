import { memo } from 'react';
import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/modules/chat/types';
import MessageBubble from '@/modules/chat/components/MessageBubble/MessageBubble';
import styles from './MessageList.module.scss';

type Props = {
  messages: ChatMessage[];
};

function MessageList({ messages }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.messageList} ref={ref}>
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}
    </div>
  );
}

export default memo(MessageList);
