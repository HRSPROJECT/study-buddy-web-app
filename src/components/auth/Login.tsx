import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
  showNotification: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const Login: React.FC<LoginProps> = ({ showNotification }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { success, error } = await signInWithGoogle();
      
      if (!success && error) {
        setError(error);
        showNotification(error, 'error');
      } else if (success) {
        showNotification('Successfully logged in!', 'success');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during Google sign-in';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login to StudyBuddy</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="auth-info">
        <p>Sign in with your Google account to access StudyBuddy.</p>
      </div>

      <button 
        onClick={handleGoogleSignIn}
        className="google-signin-button"
        disabled={isLoading}
        type="button"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
          alt="Google logo" 
          className="google-icon" 
        />
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      <div className="auth-links">
        <p>
          By signing in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;