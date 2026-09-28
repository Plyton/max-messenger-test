import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { GreenContext } from '@/shared/context';
import { IconMaxLogo } from '@/shared/ui';
import CredentialsForm from './components/CredentialsForm/CredentialsForm';
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
    <main className={`position-relative overflow-hidden ${styles.page}`}>
      <section className={styles.card}>
        <div
          className={`d-flex items-center justify-center ${styles.brand}`}
          role="img"
          aria-label="MAX"
        >
          <span className={styles.logo} aria-hidden="true">
            <IconMaxLogo />
          </span>
          <span className={styles.wordmark}>MAX</span>
        </div>
        <p className={`text-center ${styles.description}`}>
          Введите данные подключения GREEN-API, чтобы продолжить общение в MAX.
        </p>
        <CredentialsForm />
      </section>
    </main>
  );
}

export default Auth;
