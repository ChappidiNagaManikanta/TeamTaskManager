import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthPageLayout from '../components/AuthPageLayout';

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch {
      setError('Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPageLayout mode="login">
      <div className="auth-form-heading">
        <span className="auth-form-eyebrow">WELCOME BACK</span>
        <h2>Log in</h2>
        <p>Pick up where you and your team left off.</p>
      </div>
      {location.state?.accountCreated && (
        <div className="auth-success" role="status">
          Account created successfully. Log in with your new account.
        </div>
      )}
      {error && <div className="auth-error" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <div className="auth-input-wrap">
            <Mail size={17} aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              className="form-control"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="auth-field">
          <div className="auth-label-row">
            <label htmlFor="login-password">Password</label>
          </div>
          <div className="auth-input-wrap">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="auth-switch">
        Don’t have an account? <Link to="/register">Register now</Link>
      </p>
      <p className="auth-security-note"><LockKeyhole size={13} /> Your account is protected with secure sign-in.</p>
    </AuthPageLayout>
  );
};

export default Login;
