import { memo, useCallback, useState } from 'react';
import type { KeyboardEventHandler } from 'react';
import { BaseButton, IconSend } from '@/shared/ui';
import styles from './MessageComposer.module.scss';

type Props = {
  onSend: (text: string) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
};

function MessageComposer({
  onSend,
  disabled = false,
  placeholder = 'Введите сообщение...',
}: Props) {
  const [text, setText] = useState('');

  const handleSend = useCallback(async () => {
    if (!text.trim()) return;
    try {
      await onSend(text);
      setText('');
    } catch {
      // Родительский процесс отображает ошибку отправки и сохраняет сообщение для повторной попытки
    }
  }, [text, onSend]);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className={styles.composer}>
      <textarea
        className={styles.input}
        disabled={disabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Текст сообщения"
      />
      <BaseButton
        className={styles.sendButton}
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        aria-label="Отправить сообщение"
        title="Отправить сообщение"
        type="button"
      >
        <IconSend />
      </BaseButton>
    </div>
  );
}

export default memo(MessageComposer);
