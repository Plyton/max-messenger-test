import { useEffect, useRef } from 'react'
import type { ChatMessage } from '@/types/message'
import MessageBubble from './MessageBubble'

type Props = {
  messages: ChatMessage[]
}

function MessageList({ messages }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="message-list" ref={ref}>
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}
    </div>
  )
}

export default MessageList
