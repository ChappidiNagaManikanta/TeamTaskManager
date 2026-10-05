import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  CheckSquare,
  Clock3,
  FolderKanban,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { benefits, features, steps } from '../data/landingContent';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-announcement">
        <span>Teamwork starts with a clear plan.</span>
        <a href="#features">Explore TaskFlow <ArrowRight size={14} aria-hidden="true" /></a>
      </div>

      <PublicNavbar />

      <main>
        <section className="landing-hero" id="home">
          <div className="landing-hero-copy">
            <div className="landing-eyebrow"><Check size={15} aria-hidden="true" /> A simpler way to work together</div>
            <h1>Manage Your Team. Complete Tasks. Achieve More.</h1>
            <p>
              A simple team task management platform to create tasks, assign work,
              track progress, and collaborate with your team efficiently.
            </p>
            <div className="landing-hero-actions">
              <Link to="/register" className="landing-primary-cta">
                Get Started <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/login" className="landing-hero-login-btn">Login</Link>
            </div>
            <div className="landing-proof">
              <span className="landing-proof-icon"><Check size={14} aria-hidden="true" /></span>
              <span>Projects, tasks, and team progress in one workspace</span>
            </div>
          </div>

          <div className="landing-preview-wrap" aria-label="Illustration of a project task board">
            <div className="landing-preview-glow" />
            <div className="landing-preview">
              <div className="preview-browser-bar">
                <div className="preview-window-dots"><i /><i /><i /></div>
                <div className="preview-address">taskflow.app / projects / launch</div>
                <div className="preview-window-menu">•••</div>
              </div>
              <div className="preview-app">
                <aside className="preview-sidebar">
                  <div className="preview-mini-brand"><CheckSquare size={16} /><b>TaskFlow</b></div>
                  <span className="preview-side-label">WORKSPACE</span>
                  <div className="preview-side-item selected"><FolderKanban size={14} /> Projects</div>
                  <div className="preview-side-item"><CheckSquare size={14} /> My tasks</div>
                  <div className="preview-side-item"><Bell size={14} /> Notifications</div>
                  <span className="preview-side-label preview-side-label-spaced">YOUR PROJECTS</span>
                  <div className="preview-project"><i className="dot dot-purple" /> Product launch</div>
                  <div className="preview-project"><i className="dot dot-blue" /> Website refresh</div>
                  <div className="preview-team">
                    <i className="preview-avatar avatar-purple">AM</i>
                    <div><b>Your team</b><span>Working together</span></div>
                  </div>
                </aside>
                <div className="preview-board-area">
                  <div className="preview-crumb">Projects <span>/</span> Product launch</div>
                  <div className="preview-board-heading">
                    <div><h2>Product launch</h2><p>Tasks and progress at a glance.</p></div>
                    <div className="preview-avatars">
                      <i className="preview-avatar avatar-purple">AM</i>
                      <i className="preview-avatar avatar-blue">JS</i>
                      <i className="preview-avatar avatar-green">RK</i>
                    </div>
                  </div>
                  <div className="preview-board-toolbar">
                    <span className="preview-tab active">Board</span>
                    <span className="preview-tab">List</span>
                    <span className="preview-filter"><span>Filter</span><span>Sort</span></span>
                  </div>
                  <div className="preview-columns">
                    <div className="preview-column">
                      <div className="preview-column-title"><i className="dot dot-purple" /> To do <span>2</span></div>
                      <PreviewTask title="Plan project milestones" tag="Planning" color="purple" initials="AM" />
                      <div className="preview-add">＋ Add a task</div>
                    </div>
                    <div className="preview-column">
                      <div className="preview-column-title"><i className="dot dot-blue" /> In progress <span>1</span></div>
                      <PreviewTask title="Review the latest designs" tag="Design" color="blue" initials="JS" />
                      <div className="preview-add">＋ Add a task</div>
                    </div>
                    <div className="preview-column preview-column-last">
                      <div className="preview-column-title"><i className="dot dot-green" /> Done <span>1</span></div>
                      <PreviewTask title="Share team brief" tag="Teamwork" color="green" initials="RK" />
                      <div className="preview-add">＋ Add a task</div>
                    </div>
                  </div>
                  <div className="preview-progress">
                    <div className="preview-progress-icon"><CheckSquare size={15} /></div>
                    <div className="preview-progress-copy"><b>Project progress</b><span>Tasks are moving forward.</span></div>
                    <div className="preview-progress-bar"><i style={{ width: '62%' }} /></div>
                    <b className="preview-progress-percent">62%</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview-floating-note"><Clock3 size={16} /> Keep every deadline in view</div>
          </div>
        </section>

        <section className="landing-features" id="features">
          <div className="landing-section-heading">
            <span className="landing-section-label">Everything in one place</span>
            <h2>Tools to keep your team<br />moving forward.</h2>
            <p>Plan the work, share responsibility, and see progress clearly at every step.</p>
          </div>
          <div className="landing-features-grid">
            {features.map(({ icon: Icon, title, description, tone }) => (
              <article className="landing-feature-card" key={title}>
                <span className={`landing-feat-icon-wrap ${tone}`}><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="landing-feat-footer"><i className="landing-feat-bullet" /> Built for everyday teamwork</div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-how-it-works" id="how-it-works">
          <div className="landing-section-heading">
            <span className="landing-section-label">How It Works</span>
            <h2>Get from project idea<br />to progress in five steps.</h2>
            <p>A simple flow helps everyone understand what to do and what comes next.</p>
          </div>
          <div className="landing-steps-container">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <article className="landing-step-card" key={title}>
                <div className="landing-step-top">
                  <span className="landing-step-badge">{String(index + 1).padStart(2, '0')}</span>
                  <span className="landing-step-icon"><Icon size={18} aria-hidden="true" /></span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-why-choose" id="about">
          <div className="landing-section-heading">
            <span className="landing-section-label">Why Choose Us</span>
            <h2>Less chasing updates.<br />More meaningful progress.</h2>
            <p>TaskFlow gives your team a shared place to organize work and move ahead with confidence.</p>
          </div>
          <div className="landing-why-grid">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article className="landing-why-card" key={title}>
                <span className="landing-why-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul className="landing-why-bullets">
                  <li><Check size={15} aria-hidden="true" /> Clear work for the whole team</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-contact" id="contact">
          <div className="landing-contact-container">
            <div className="landing-contact-info">
              <span className="landing-section-label">Contact</span>
              <h3>We’d love to hear from you.</h3>
              <p>
                Have a question, feedback, or need help getting started? Send the TaskFlow
                team a message through our contact page.
              </p>
              <div className="landing-contact-meta">
                <div className="landing-contact-meta-item">
                  <span className="landing-meta-icon"><UsersRound size={19} /></span>
                  <div><strong>Bring your team together</strong><span>Give everyone a clear view of the work.</span></div>
                </div>
                <div className="landing-contact-meta-item">
                  <span className="landing-meta-icon"><Clock3 size={19} /></span>
                  <div><strong>Start when you’re ready</strong><span>Sign up or log in to open your workspace.</span></div>
                </div>
              </div>
            </div>
            <div className="landing-contact-form-wrap landing-contact-actions">
              <span className="landing-section-label">Contact our team</span>
              <h3>How can we help?</h3>
              <p>Send us a question, feedback, or a note about how we can make TaskFlow better.</p>
              <div className="landing-contact-action-links">
                <Link to="/contact" className="landing-primary-cta">Contact us <ArrowRight size={17} /></Link>
              </div>
              <span className="landing-contact-hint"><ShieldCheck size={15} /> Messages are securely available to TaskFlow administrators.</span>
            </div>
          </div>
        </section>

        <section className="landing-bottom-cta">
          <div>
            <span className="landing-section-label">Make the next step together</span>
            <h2>Manage your team. Achieve more.</h2>
            <p>Bring your projects and tasks into one clear workspace.</p>
          </div>
          <div className="landing-bottom-cta-actions">
            <Link to="/register" className="landing-primary-cta">Get Started <ArrowRight size={17} /></Link>
            <Link to="/login" className="landing-secondary-cta-btn">Login</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-main">
          <div className="landing-footer-brand-col">
            <a href="#home" className="landing-brand">
              <span className="landing-brand-icon"><CheckSquare size={19} aria-hidden="true" /></span>
              <span className="landing-brand-text">TaskFlow</span>
            </a>
            <span className="landing-footer-tagline">Team task management made simple.</span>
          </div>
          <div className="landing-footer-links-col">
            <span className="landing-footer-heading">Quick Links</span>
            <nav className="landing-footer-quick-links" aria-label="Footer navigation">
              <a href="#home">Home</a><span className="landing-footer-sep">|</span>
              <a href="#features">Features</a><span className="landing-footer-sep">|</span>
              <a href="#how-it-works">How It Works</a><span className="landing-footer-sep">|</span>
              <a href="#about">About</a><span className="landing-footer-sep">|</span>
              <Link to="/contact">Contact</Link><span className="landing-footer-sep">|</span>
              <Link to="/login">Login</Link>
            </nav>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>© 2026 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const PreviewTask = ({ title, tag, color, initials }) => (
  <div className="preview-task-card">
    <div className={`preview-task-tag ${color}`}>{tag}</div>
    <b>{title}</b>
    <div className="preview-task-meta">
      <span>In this week</span>
      <i className={`preview-avatar avatar-${color}`}>{initials}</i>
    </div>
  </div>
);

export default LandingPage;
