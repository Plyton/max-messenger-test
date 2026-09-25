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
        placeholder="Введите сообщение и нажмите Enter..."
        aria-label="Message text"
      />
      <button className="send-btn" onClick={handleSend} disabled={!text.trim()}>
        Отправить
      </button>
    </div>
  )
}

export default MessageComposer
