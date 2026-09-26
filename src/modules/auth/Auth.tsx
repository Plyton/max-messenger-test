import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { GreenContext } from '@/app/context/GreenContext';
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
        <div className={styles.logo} aria-hidden="true">
          M
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
