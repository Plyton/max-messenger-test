import styles from './ConversationList.module.scss';

type Props = {
  phoneNumber: string | null;
  onSelect: () => void;
};

function ConversationList({ phoneNumber, onSelect }: Props) {
  if (!phoneNumber) {
    return <p className={styles.empty}>Здесь появятся ваши чаты</p>;
  }

  return (
    <div className={styles.list}>
      <button
        className={`${styles.item} ${styles['item--active']}`}
        onClick={onSelect}
        type="button"
      >
        <div className={styles.avatar}>M</div>
        <div className={styles.meta}>
          <div className={styles.title}>{phoneNumber}</div>
        </div>
      </button>
    </div>
  );
}

export default ConversationList;
