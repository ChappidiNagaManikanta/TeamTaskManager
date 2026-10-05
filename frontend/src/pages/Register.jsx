import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthPageLayout from '../components/AuthPageLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/login', {
        replace: true,
        state: { accountCreated: true, email },
      });
    } catch (registrationError) {
      setError(registrationError.message || 'Registration failed. Email might exist.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPageLayout mode="register">
      <div className="auth-form-heading">
        <span className="auth-form-eyebrow">GET STARTED</span>
        <h2>Create account</h2>
        <p>Set up your account and start making progress.</p>
      </div>
      {error && <div className="auth-error" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="register-name">Full name</label>
          <div className="auth-input-wrap">
            <UserRound size={17} aria-hidden="true" />
            <input
              id="register-name"
              type="text"
              className="form-control"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="auth-field">
          <label htmlFor="register-email">Email</label>
          <div className="auth-input-wrap">
            <Mail size={17} aria-hidden="true" />
            <input
              id="register-email"
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
          <label htmlFor="register-password">Password</label>
          <div className="auth-input-wrap">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
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
        <div className="auth-field">
          <label htmlFor="register-role">Account role</label>
          <select
            id="register-role"
            className="form-control auth-role-select"
            value="ROLE_MEMBER"
            disabled
          >
            <option value="ROLE_MEMBER">Team Member</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      <p className="auth-security-note"><LockKeyhole size={13} /> Your details are used to create your workspace account.</p>
    </AuthPageLayout>
  );
};

export default Register;
