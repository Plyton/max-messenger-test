import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import styles from './BaseModal.module.scss';

export type BaseModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  children: ReactNode;
  'aria-labelledby'?: string;
};

const BaseModal = forwardRef<BaseModalRef, Props>(function BaseModal(
  { children, 'aria-labelledby': ariaLabelledBy },
  forwardedRef,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open() {
        const dialog = dialogRef.current;

        if (dialog && !dialog.open) {
          dialog.showModal();
        }
      },
      close() {
        const dialog = dialogRef.current;

        if (dialog?.open) {
          dialog.close();
        }
      },
    }),
    [],
  );

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  }

  return (
    <dialog
      aria-labelledby={ariaLabelledBy}
      className={`overflow-auto pa-12 ${styles.modal}`}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
});

export default BaseModal;
