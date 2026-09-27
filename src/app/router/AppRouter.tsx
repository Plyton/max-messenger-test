import { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { GreenContext, GreenProvider, SessionProvider } from '@/shared/context';
import { AuthPage, ChatPage } from '@/pages';

function AppRouter() {
  return (
    <GreenProvider>
      <RouterContent />
    </GreenProvider>
  );
}

function RouterContent() {
  const context = useContext(GreenContext);

  if (!context) {
    throw new Error('useGreenContext must be used within GreenProvider');
  }

  const { credentials, clearCredentials } = context;
  const navigate = useNavigate();

  function handleLogout() {
    clearCredentials();
    navigate('/auth');
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          credentials ? (
            <SessionProvider onLogout={handleLogout}>
              <ChatPage />
            </SessionProvider>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
