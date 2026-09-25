type Props = {
  title: string
}

function ChatHeader({ title }: Props) {
  return (
    <div className="chat-header">
      <div className="avatar">M</div>
      <div>
        <h2 className="chat-title">{title}</h2>
      </div>
    </div>
  )
}

export default ChatHeader
