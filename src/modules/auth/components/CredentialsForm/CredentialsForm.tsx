import { useState } from 'react';
import type * as React from 'react';
import { useContext } from 'react';
import { greenApiBaseUrl } from '@/config/env';
import { GreenContext } from '@/app/context/GreenContext';
import { getStateInstance } from '@/services/greenApi/greenApi';
import type { GreenApiConfig } from '@/services/greenApi/types';
import styles from './CredentialsForm.module.scss';

function CredentialsForm() {
  const context = useContext(GreenContext);

  if (!context) {
    throw new Error('CredentialsForm must be rendered within GreenProvider');
  }

  const { setCredentials } = context;
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    const credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    if (!credentials.idInstance || !credentials.apiTokenInstance) {
      setError('Введите ID и токен подключения GREEN-API.');
      return;
    }

    setError(null);
    setIsLoading(true);

    const config: GreenApiConfig = { baseUrl: greenApiBaseUrl, ...credentials };

    try {
      const response = await getStateInstance(config);

      if (response.stateInstance !== 'authorized') {
        setError(
          'Подключение GREEN-API не авторизовано. Проверьте состояние подключения и попробуйте снова.',
        );
        return;
      }
      setCredentials(credentials);
    } catch {
      setError('Не удалось подключиться. Проверьте данные и повторите попытку.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>ID подключения</span>
        <input
          autoComplete="off"
          className={styles.input}
          inputMode="numeric"
          name="idInstance"
          onChange={(event) =>
            setIdInstance(event.target.value.replace(/\D/g, ''))
          }
          placeholder="Введите ID подключения"
          required
          value={idInstance}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Токен подключения</span>
        <input
          autoComplete="off"
          className={styles.input}
          name="apiTokenInstance"
          onChange={(event) => setApiTokenInstance(event.target.value)}
          placeholder="Введите токен"
          required
          type="password"
          value={apiTokenInstance}
        />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button className={styles.submit} disabled={isLoading} type="submit">
        {isLoading ? 'Подключаем…' : 'Подключиться'}
      </button>
    </form>
  );
}

export default CredentialsForm;
