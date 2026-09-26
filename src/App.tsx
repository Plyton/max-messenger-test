import styles from './App.module.scss'
import ConversationList from '@/components/ConversationList/ConversationList'
import ChatHeader from '@/components/ChatHeader/ChatHeader'
import MessageList from '@/components/MessageList/MessageList'
import MessageComposer from '@/components/MessageComposer/MessageComposer'
import { useMessenger } from '@/hooks/useMessenger'

function App() {
    const { messages, error, sendMessage } = useMessenger()

    return (
        <div className={styles.app}>
            <aside className={styles.sidebar}>
                <h1 className={styles.brand}>MAX</h1>
                <ConversationList />
            </aside>

            <main className={styles.chatArea}>
                <ChatHeader title="MAX" />

                {error && <div className={styles.error} role="alert">
                    {error}
                </div>}

                <MessageList messages={messages} />

                <MessageComposer onSend={sendMessage} />
            </main>
        </div>
    )
}

export default App
