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
  const isFormattedValue = value.startsWith('+7 (');
  let digits = isFormattedValue
    ? value.slice(4).replace(/\D/g, '')
    : value.replace(/\D/g, '');

  if (!isFormattedValue && digits.length > 10 && (digits.startsWith('7') || digits.startsWith('8'))) {
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

function getPhoneDigitsBeforeCursor(value: string, cursor: number): number {
  const isFormattedValue = value.startsWith('+7 (');
  let digitsBefore = (isFormattedValue ? value.slice(4, cursor) : value.slice(0, cursor)).replace(
    /\D/g,
    '',
  ).length;
  const digits = value.replace(/\D/g, '');

  if (!isFormattedValue && digits.length > 10 && (digits.startsWith('7') || digits.startsWith('8'))) {
    digitsBefore = Math.max(0, digitsBefore - 1);
  }

  return digitsBefore;
}

function getCursorAfterPhoneDigits(value: string, digitCount: number): number {
  if (!digitCount) {
    return value.startsWith('+7 (') ? 4 : 0;
  }

  const prefixLength = value.startsWith('+7 (') ? 4 : 0;
  let digitsSeen = 0;

  for (let index = prefixLength; index < value.length; index += 1) {
    if (/\d/.test(value[index])) {
      digitsSeen += 1;

      if (digitsSeen === digitCount) {
        return index + 1;
      }
    }
  }

  return value.length;
}

function NewChatForm({
  phoneNumber,
  isCheckingAccount,
  error,
  onPhoneNumberChange,
  onSubmit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function restoreCaret(value: string, digitCount: number) {
    const cursor = getCursorAfterPhoneDigits(value, digitCount);
    window.requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(cursor, cursor);
    });
  }

  function handlePhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const cursor = input.selectionStart ?? input.value.length;
    const formattedValue = formatPhoneNumber(input.value);
    const digitsBeforeCursor = getPhoneDigitsBeforeCursor(input.value, cursor);

    onPhoneNumberChange(formattedValue);
    restoreCaret(formattedValue, digitsBeforeCursor);
  }

  function handlePhoneNumberKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      (event.key !== 'Backspace' && event.key !== 'Delete') ||
      event.currentTarget.selectionStart !== event.currentTarget.selectionEnd
    ) {
      return;
    }

    const input = event.currentTarget;
    const cursor = input.selectionStart ?? 0;
    const value = input.value;
    const prefixLength = value.startsWith('+7 (') ? 4 : 0;
    const searchStart = event.key === 'Backspace' ? cursor - 1 : cursor;
    const searchStep = event.key === 'Backspace' ? -1 : 1;
    let digitIndex = searchStart;

    while (
      digitIndex >= prefixLength &&
      digitIndex < value.length &&
      !/\d/.test(value[digitIndex])
    ) {
      digitIndex += searchStep;
    }

    event.preventDefault();

    if (digitIndex < prefixLength || digitIndex >= value.length) {
      return;
    }

    const digitsBeforeCursor = getPhoneDigitsBeforeCursor(value, digitIndex);
    const updatedValue = `${value.slice(0, digitIndex)}${value.slice(digitIndex + 1)}`;
    const formattedValue = formatPhoneNumber(updatedValue);

    onPhoneNumberChange(formattedValue);
    restoreCaret(formattedValue, digitsBeforeCursor);
  }

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
        <input
          autoComplete="tel"
          className={styles.input}
          id="phone-number"
          onChange={handlePhoneNumberChange}
          onKeyDown={handlePhoneNumberKeyDown}
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
