import styles from './ChatHeader.module.scss'

type Props = {
  title: string
}

function ChatHeader({ title }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.avatar}>M</div>
      <div>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  )
}

export default ChatHeader
