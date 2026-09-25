import { useCallback, useState } from 'react'
import type { KeyboardEventHandler } from 'react'

type Props = {
  onSend: (text: string) => void | Promise<void>
}

function MessageComposer({ onSend }: Props) {
  const [text, setText] = useState('')

  const handleSend = useCallback(async () => {
    if (!text.trim()) return
    try {
      await onSend(text)
      setText('')
    } catch {
      // Родительский процесс отображает ошибку отправки и сохраняет сообщение для повторной попытки
    }
  }, [text, onSend])

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="composer">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Введите сообщение..."
        aria-label="Текст сообщения"
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={!text.trim()}
        aria-label="Отправить сообщение"
        title="Отправить сообщение"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 11.2 20.3 3.7c.7-.3 1.4.4 1.1 1.1l-7.5 16.8c-.3.7-1.3.6-1.4-.2l-1.1-6.4-6.4-1.1c-.8-.1-.9-1.1-.2-1.4Zm8.9 2.9 1 5.4 5.2-11.6-11.6 5.2 5.4 1Z" />
        </svg>
      </button>
    </div>
  )
}

export default MessageComposer
