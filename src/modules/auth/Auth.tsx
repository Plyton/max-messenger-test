import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { GreenContext } from '@/shared/context/GreenContext';
import CredentialsForm from '@/modules/auth/components/CredentialsForm/CredentialsForm';
import styles from './Auth.module.scss';

function Auth() {
  const context = useContext(GreenContext);

  if (!context) {
    throw new Error('Auth must be rendered within GreenProvider');
  }

  const { credentials } = context;

  if (credentials) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.brand} role="img" aria-label="MAX">
          <span className={styles.logo} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4.5c-6.35 0-11.5 4.54-11.5 10.14 0 2.75 1.26 5.24 3.3 7.06l-.77 5.8 6.02-3.05c.94.22 1.93.33 2.95.33 6.35 0 11.5-4.54 11.5-10.14S22.35 4.5 16 4.5Z"
                fill="#fff"
              />
              <circle cx="11" cy="14.5" r="1.45" fill="#65B7ED" />
              <circle cx="16" cy="14.5" r="1.45" fill="#65B7ED" />
              <circle cx="21" cy="14.5" r="1.45" fill="#65B7ED" />
            </svg>
          </span>
          <span className={styles.wordmark}>MAX</span>
        </div>
        <p className={styles.eyebrow}>MAX МЕССЕНДЖЕР</p>
        <h1 className={styles.title}>Подключите аккаунт</h1>
        <p className={styles.description}>
          Введите данные подключения GREEN-API, чтобы продолжить общение в MAX.
        </p>
        <CredentialsForm />
      </section>
    </main>
  );
}

export default Auth;
