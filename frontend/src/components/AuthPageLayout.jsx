import { Link } from 'react-router-dom';
import { ArrowRight, CheckSquare, CircleCheck, Users, Layers3, CalendarCheck } from 'lucide-react';

const AuthPageLayout = ({ mode, children }) => {
  const isRegister = mode === 'register';

  return (
    <main className="auth-page">
      <div className="auth-page-kicker">
        <span>TEAM TASK MANAGER</span>
        <span>Workspace access</span>
      </div>
      <section className="auth-window">
        <header className="auth-window-header">
          <Link to="/" className="landing-brand" aria-label="TeamTask home">
            <span className="landing-brand-icon"><CheckSquare size={19} aria-hidden="true" /></span>
            <span>TeamTask</span>
          </Link>
          <nav className="auth-window-nav" aria-label="Account navigation">
            <Link to="/">Home</Link>
            <Link to="/login" className={!isRegister ? 'selected' : ''}>Log in</Link>
            <Link to="/register" className={isRegister ? 'selected' : ''}>Registration</Link>
          </nav>
        </header>

        <div className="auth-window-content">
          <aside className="auth-promo">
            <span className="auth-promo-label">TeamTask workspace</span>
            <h1>{isRegister ? 'Bring your team’s work together.' : 'Project management, made clear.'}</h1>
            <p>
              {isRegister
                ? 'Create your account and start organizing projects, tasks, and team priorities in one place.'
                : 'Everything your team needs to plan projects, manage tasks, and make steady progress.'}
            </p>
            <div className="auth-promo-board" aria-hidden="true">
              <div className="auth-promo-board-top">
                <span><Layers3 size={15} /> Product launch</span>
                <span className="auth-promo-board-members"><i>AM</i><i>JS</i><i>RK</i></span>
              </div>
              <div className="auth-promo-columns">
                <div className="auth-promo-column">
                  <b><i className="auth-dot purple" /> To do</b>
                  <span>Plan milestones</span>
                  <span>Prepare kickoff</span>
                </div>
                <div className="auth-promo-column">
                  <b><i className="auth-dot blue" /> In progress</b>
                  <span>Review designs</span>
                </div>
                <div className="auth-promo-column">
                  <b><i className="auth-dot green" /> Done</b>
                  <span>Team brief</span>
                </div>
              </div>
              <div className="auth-promo-foot">
                <CircleCheck size={16} />
                <span>One shared view. A team moving forward.</span>
              </div>
            </div>
            <div className="auth-promo-points">
              <span><Users size={15} /> Work together</span>
              <span><CalendarCheck size={15} /> Keep work on track</span>
              <span><CheckSquare size={15} /> Celebrate progress</span>
            </div>
          </aside>

          <section className="auth-form-panel">
            {children}
          </section>
        </div>

        <footer className="auth-window-footer">
          <Link to="/">TeamTask</Link>
          <span>Clear work. Better teamwork.</span>
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Already have an account?' : 'New to TeamTask?'}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </footer>
      </section>
      <div className="auth-page-bottom">
        <span>Organize your work, one task at a time.</span>
        <Link to="/">Back to home</Link>
      </div>
    </main>
  );
};

export default AuthPageLayout;
