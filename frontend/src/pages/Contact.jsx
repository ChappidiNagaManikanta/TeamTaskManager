import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, UsersRound } from 'lucide-react';
import api from '../api/axios';
import PublicNavbar from '../components/PublicNavbar';

const emptyForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.post('/contact', {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setForm(emptyForm);
      setSubmitted(true);
    } catch (requestError) {
      console.error('Failed to submit contact message', requestError);
      setError(requestError.response?.data?.detail || 'Your message could not be sent. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <PublicNavbar />
      <main className="contact-page-content">
        <div className="contact-page-intro">
          <span className="landing-section-label">Contact TaskFlow</span>
          <h1>We’d love to hear from you.</h1>
          <p>
            Have a question, feedback, or need help getting started? Send our team a message
            and we’ll keep your request for review.
          </p>
          <div className="contact-page-points">
            <div><span><MessageSquareText size={19} /></span><p><strong>Tell us what’s on your mind</strong><small>Share a question, idea, or issue.</small></p></div>
            <div><span><UsersRound size={19} /></span><p><strong>Reach the TaskFlow team</strong><small>Your message is saved for the team to review.</small></p></div>
            <div><span><Mail size={19} /></span><p><strong>Use your preferred email</strong><small>Include an address where we can reach you.</small></p></div>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-submit-success" role="status">
              <CheckCircle2 size={48} aria-hidden="true" />
              <h2>Message received</h2>
              <p>Your message has been saved. The TaskFlow team can now review your request.</p>
              <button type="button" className="landing-primary-cta" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="contact-form-heading">
                <h2>Send us a message</h2>
                <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
              </div>
              <form className="contact-message-form" onSubmit={handleSubmit}>
                <div className="contact-fields-row">
                  <label className="landing-input-group">
                    <span>Name <b aria-hidden="true">*</b></span>
                    <input name="name" value={form.name} onChange={handleChange} required maxLength={100} autoComplete="name" />
                  </label>
                  <label className="landing-input-group">
                    <span>Email <b aria-hidden="true">*</b></span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required maxLength={254} autoComplete="email" />
                  </label>
                </div>
                <label className="landing-input-group">
                  <span>Subject <b aria-hidden="true">*</b></span>
                  <input name="subject" value={form.subject} onChange={handleChange} required maxLength={150} />
                </label>
                <label className="landing-input-group">
                  <span>Message <b aria-hidden="true">*</b></span>
                  <textarea name="message" value={form.message} onChange={handleChange} required maxLength={5000} rows={6} />
                  <small className="contact-character-count">{form.message.length}/5000</small>
                </label>
                {error && <p className="error-message" role="alert">{error}</p>}
                <button type="submit" className="landing-primary-cta contact-submit-button" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send message'}
                  {!submitting && <ArrowRight size={17} aria-hidden="true" />}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="contact-page-footer">© 2026 TaskFlow. All rights reserved.</footer>
    </div>
  );
};

export default Contact;
