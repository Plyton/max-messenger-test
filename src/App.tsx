import './App.css'
import ConversationList from '@/components/ConversationList'
import ChatHeader from '@/components/ChatHeader'
import MessageList from '@/components/MessageList'
import MessageComposer from '@/components/MessageComposer'
import { useMessenger } from '@/hooks/useMessenger'

function App() {
    const { messages, error, sendMessage } = useMessenger()

    return (
        <div className="app-root">
            <aside className="sidebar">
                <h1 className="brand">MAX</h1>
                <ConversationList />
            </aside>

            <main className="chat-area">
                <ChatHeader title="MAX" />

                {error && <div role="alert">{error}</div>}

                <MessageList messages={messages} />

                <MessageComposer onSend={sendMessage} />
            </main>
        </div>
    )
}

export default App
