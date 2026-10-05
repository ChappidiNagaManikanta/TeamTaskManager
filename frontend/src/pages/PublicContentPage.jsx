import { Link } from 'react-router-dom';
import { ArrowRight, Check, CheckSquare } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import { benefits, features, steps } from '../data/landingContent';

const pageContent = {
  features: {
    label: 'TaskFlow Features',
    title: 'Everything your team needs to move work forward.',
    description: 'Plan projects, assign tasks, and make progress visible in one shared workspace.',
  },
  'how-it-works': {
    label: 'How It Works',
    title: 'A clear path from project idea to done.',
    description: 'TaskFlow keeps the steps simple so your team can focus on the work.',
  },
  about: {
    label: 'Why Choose TaskFlow',
    title: 'Less chasing updates. More meaningful progress.',
    description: 'TaskFlow helps teams stay organized with clear ownership and a shared view of project progress.',
  },
};

const PublicContentPage = ({ page }) => {
  const content = pageContent[page];
  if (!content) return null;

  return (
    <div className="landing-page public-content-page">
      <PublicNavbar />
      <main>
        <header className="public-content-intro">
          <span className="landing-section-label">{content.label}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </header>

        {page === 'features' && (
          <section className="public-content-section landing-features" aria-label="TaskFlow features">
            <div className="landing-features-grid">
              {features.map(({ icon: Icon, title, description, tone }) => (
                <article className="landing-feature-card" key={title}>
                  <span className={`landing-feat-icon-wrap ${tone}`}><Icon size={22} aria-hidden="true" /></span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <div className="landing-feat-footer"><i className="landing-feat-bullet" /> Built for everyday teamwork</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === 'how-it-works' && (
          <section className="public-content-section landing-how-it-works" aria-label="How TaskFlow works">
            <div className="landing-steps-container">
              {steps.map(({ icon: Icon, title, description }, index) => (
                <article className="landing-step-card" key={title}>
                  <div className="landing-step-top">
                    <span className="landing-step-badge">{String(index + 1).padStart(2, '0')}</span>
                    <span className="landing-step-icon"><Icon size={18} aria-hidden="true" /></span>
                  </div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === 'about' && (
          <section className="public-content-section landing-why-choose" aria-label="Why choose TaskFlow">
            <div className="landing-why-grid">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article className="landing-why-card" key={title}>
                  <span className="landing-why-icon"><Icon size={22} aria-hidden="true" /></span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <ul className="landing-why-bullets">
                    <li><Check size={15} aria-hidden="true" /> Clear work for the whole team</li>
                  </ul>
                </article>
              ))}
            </div>
            <div className="public-about-summary">
              <span className="landing-brand-icon-lg"><CheckSquare size={30} aria-hidden="true" /></span>
              <div>
                <h2>Meet TaskFlow</h2>
                <p>
                  A team task management platform for bringing projects, people, and progress
                  together in one organized workspace.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="public-content-cta">
          <div>
            <span className="landing-section-label">Ready to get started?</span>
            <h2>Bring your team’s work together.</h2>
            <p>Create a workspace and start organizing your next project.</p>
          </div>
          <div className="landing-bottom-cta-actions">
            <Link to="/register" className="landing-primary-cta">Get Started <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link to="/contact" className="landing-secondary-cta-btn">Contact us</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer public-content-footer">
        <a href="/" className="landing-brand" aria-label="TaskFlow home">
          <span className="landing-brand-icon"><CheckSquare size={19} aria-hidden="true" /></span>
          <span className="landing-brand-text">TaskFlow</span>
        </a>
        <p>© 2026 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicContentPage;
