type Props = {
  title: string
  subtitle?: string
}

function ChatHeader({ title, subtitle }: Props) {
  return (
    <div className="chat-header">
      <div className="avatar">—</div>
      <div>
        <h2 className="chat-title">{title}</h2>
        <div className="chat-status">{subtitle}</div>
      </div>
    </div>
  )
}

export default ChatHeader
