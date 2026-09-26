import styles from './ConversationList.module.scss';

type Props = {
  phoneNumber: string | null;
};

function ConversationList({ phoneNumber }: Props) {
  if (!phoneNumber) {
    return <p className={styles.empty}>Здесь появятся ваши чаты</p>;
  }

  return (
    <div className={styles.list}>
      <div className={`${styles.item} ${styles['item--active']}`}>
        <div className={styles.avatar}>M</div>
        <div className={styles.meta}>
          <div className={styles.title}>{phoneNumber}</div>
        </div>
      </div>
    </div>
  );
}

export default ConversationList;
