import { useRef } from 'react';
import type * as React from 'react';
import { IMaskInput } from 'react-imask';
import BaseButton from '@/shared/ui/BaseButton/BaseButton';
import styles from './NewChatForm.module.scss';

type Props = {
  phoneNumber: string;
  isCheckingAccount: boolean;
  error: string | null;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: () => Promise<boolean>;
};

function NewChatForm({
  phoneNumber,
  isCheckingAccount,
  error,
  onPhoneNumberChange,
  onSubmit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const succeeded = await onSubmit();

    if (succeeded) {
      onPhoneNumberChange('');

      if (!matchMedia('(max-width: 767px)').matches) {
        inputRef.current?.focus();
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="phone-number">
        Новый чат
      </label>
      <div className={styles.phoneRow}>
        <IMaskInput
          autoComplete="tel"
          className={styles.input}
          id="phone-number"
          inputRef={inputRef}
          mask="+7 (000) 000-00-00"
          onAccept={(value) => onPhoneNumberChange(value)}
          placeholder="+7 (900) 000-00-00"
          type="tel"
          value={phoneNumber}
        />
        <BaseButton
          aria-label="Найти"
          className={styles.submit}
          disabled={isCheckingAccount || !phoneNumber.trim()}
          type="submit"
        >
          {isCheckingAccount ? '…' : 'Найти'}
        </BaseButton>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default NewChatForm;
