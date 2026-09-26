import styles from './ConversationList.module.scss'

function ConversationList() {
    return (
        <div className={styles.list}>
            <div className={`${styles.item} ${styles['item--active']}`}>
                <div className={styles.avatar}>M</div>
                <div className={styles.meta}>
                    <div className={styles.title}>MAX</div>
                </div>
            </div>
        </div>
    )
}

export default ConversationList
