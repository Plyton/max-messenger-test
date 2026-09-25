function ConversationList() {
    return (
        <div className="conv-list">
            <div className="conv-item active">
                <div className="avatar">—</div>
                <div className="conv-meta">
                    <div className="conv-title">Текущий диалог</div>
                    <div className="conv-sub">MAX</div>
                </div>
            </div>
        </div>
    )
}

export default ConversationList
