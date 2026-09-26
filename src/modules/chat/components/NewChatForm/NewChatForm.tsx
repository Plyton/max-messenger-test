import { useRef } from 'react';
import type * as React from 'react';
import styles from './NewChatForm.module.scss';

type Props = {
  phoneNumber: string;
  isCheckingAccount: boolean;
  error: string | null;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: () => Promise<boolean>;
};

function formatPhoneNumber(value: string): string {
  let digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) {
    return '';
  }

  const areaCode = digits.slice(0, 3);
  const firstPart = digits.slice(3, 6);
  const secondPart = digits.slice(6, 8);
  const thirdPart = digits.slice(8, 10);
  let formatted = `+7 (${areaCode}`;

  if (areaCode.length === 3) {
    formatted += ')';
  }
  if (firstPart) {
    formatted += ` ${firstPart}`;
  }
  if (secondPart) {
    formatted += `-${secondPart}`;
  }
  if (thirdPart) {
    formatted += `-${thirdPart}`;
  }

  return formatted;
}

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
      inputRef.current?.focus();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="phone-number">
        Новый чат
      </label>
      <div className={styles.phoneRow}>
        <input
          autoComplete="tel"
          className={styles.input}
          id="phone-number"
          onChange={(event) => onPhoneNumberChange(formatPhoneNumber(event.target.value))}
          placeholder="+7 (900) 000-00-00"
          ref={inputRef}
          type="tel"
          value={phoneNumber}
        />
        <button
          aria-label="Найти"
          className={styles.submit}
          disabled={isCheckingAccount || !phoneNumber.trim()}
          type="submit"
        >
          {isCheckingAccount ? '…' : 'Найти'}
        </button>
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
