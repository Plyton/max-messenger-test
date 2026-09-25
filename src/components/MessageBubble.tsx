import type { ChatMessage } from '@/types/message'

type Props = {
  msg: ChatMessage
}

function MessageBubble({ msg }: Props) {
  const time = new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className={`msg-row ${msg.direction}`}>
      <div className={`msg-bubble ${msg.direction}`}>
        <div>{msg.text}</div>
        <div className="msg-meta">{time}</div>
      </div>
    </div>
  )
}

export default MessageBubble
