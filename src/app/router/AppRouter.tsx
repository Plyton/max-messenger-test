import { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { GreenContext, GreenProvider } from '../context/GreenContext';
import { ChatSessionProvider } from '../context/ChatSessionProvider';
import AuthPage from '@/pages/AuthPage/AuthPage';
import ChatPage from '@/pages/ChatPage/ChatPage';

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
            <ChatSessionProvider onLogout={handleLogout}>
              <ChatPage />
            </ChatSessionProvider>
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
