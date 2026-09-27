import { forwardRef, useImperativeHandle, useRef } from 'react';
import { BaseButton, BaseModal } from '@/shared/ui';
import type { BaseModalRef } from '@/shared/ui';
import styles from './LogoutConfirm.module.scss';

export type LogoutConfirmRef = {
  open: () => void;
};

type Props = {
  onConfirm: () => void;
};

const LogoutConfirm = forwardRef<LogoutConfirmRef, Props>(function LogoutConfirm(
  { onConfirm },
  forwardedRef,
) {
  const modalRef = useRef<BaseModalRef>(null);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open() {
        modalRef.current?.open();
      },
    }),
    [],
  );

  function handleCancel() {
    modalRef.current?.close();
  }

  function handleConfirm() {
    modalRef.current?.close();
    onConfirm();
  }

  return (
    <BaseModal aria-labelledby="logout-confirm-title" ref={modalRef}>
      <div className={styles.content}>
        <h2 className={styles.title} id="logout-confirm-title">
          Выйти из аккаунта?
        </h2>
        <p className={styles.description}>После выхода потребуется повторно подключиться к MAX.</p>
        <div className={styles.actions}>
          <BaseButton className={styles.cancel} onClick={handleCancel} type="button">
            Отмена
          </BaseButton>
          <BaseButton className={styles.confirm} onClick={handleConfirm} type="button">
            Выйти
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
});

export default LogoutConfirm;
