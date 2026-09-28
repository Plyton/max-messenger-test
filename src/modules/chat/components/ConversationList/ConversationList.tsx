import { BaseButton } from '@/shared/ui';
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
    <div className="d-flex flex-column gap-4 overflow-auto">
      <BaseButton
        className={`d-flex items-center gap-6 w-full ${styles.item} ${styles['item--active']}`}
        onClick={onSelect}
        type="button"
      >
        <div className={`d-inline items-center justify-center ${styles.avatar}`}>M</div>
        <div className={`d-flex flex-column items-start ${styles.meta}`}>
          <div className={`text-ellipsis ${styles.title}`}>{phoneNumber}</div>
        </div>
      </BaseButton>
    </div>
  );
}

export default ConversationList;
