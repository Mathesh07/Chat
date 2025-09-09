import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import SettingsPage from "./pages/profile/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import LoadingSpinner from "./components/ui/LoadingSpinner";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme, initTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <LoadingSpinner size="xl" text="Loading Chaty..." />
      </div>
    );
  }

  // Check if user is authenticated but not verified
  const isUnverifiedUser = authUser && !authUser.isVerified;

  return (
    <div data-theme={theme} className="min-h-screen">
      {authUser && authUser.isVerified && <Navbar />}
      
      <Routes>
        <Route 
          path="/" 
          element={
            authUser ? (
              authUser.isVerified ? <HomePage /> : <Navigate to="/verify-email" />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={<SignUpPage />}
        />
        <Route 
          path="/login" 
          element={!authUser ? <LoginPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/verify-email" 
          element={
            !authUser || !authUser.isVerified ? <EmailVerificationPage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/settings" 
          element={
            authUser && authUser.isVerified ? <SettingsPage /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            authUser && authUser.isVerified ? <ProfilePage /> : <Navigate to="/login" />
          } 
        />
        {/* Catch-all route for undefined paths */}
        <Route 
          path="*" 
          element={<Navigate to={authUser ? "/" : "/login"} />} 
        />
      </Routes>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
          style: {
            background: theme === 'dark' ? '#1f2937' : '#fff',
            color: theme === 'dark' ? '#f3f4f6' : '#374151',
            border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
};
export default App;