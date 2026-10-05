import { useCallback, useEffect, useState } from 'react';
import { Check, Mail, MessageSquareText } from 'lucide-react';
import api from '../api/axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/contact/messages');
      setMessages(response.data);
    } catch (requestError) {
      console.error('Failed to load contact messages', requestError);
      setError('Unable to load contact messages. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const markReviewed = async (id) => {
    setUpdatingId(id);
    setError('');
    try {
      const response = await api.patch(`/contact/messages/${id}/reviewed`);
      setMessages((current) => current.map((message) => message.id === id ? response.data : message));
    } catch (requestError) {
      console.error('Failed to update contact message', requestError);
      setError('Unable to mark this message as reviewed. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const unreadCount = messages.filter((message) => !message.reviewed).length;

  return (
    <section className="contact-inbox-page">
      <div className="page-header">
        <div>
          <h1>Contact messages</h1>
          <p className="page-description">Review messages submitted through the public contact form.</p>
        </div>
        <div className="user-count">
          <MessageSquareText size={18} aria-hidden="true" />
          {unreadCount} unread
        </div>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}
      {loading ? (
        <p role="status">Loading contact messages...</p>
      ) : messages.length ? (
        <div className="contact-inbox-list">
          {messages.map((message) => (
            <article className={`contact-inbox-card${message.reviewed ? ' reviewed' : ''}`} key={message.id}>
              <div className="contact-inbox-card-header">
                <div>
                  <span className={`contact-message-status${message.reviewed ? ' reviewed' : ''}`}>
                    {message.reviewed ? 'Reviewed' : 'Needs review'}
                  </span>
                  <h2>{message.subject}</h2>
                </div>
                <time dateTime={message.submittedAt}>
                  {new Date(message.submittedAt).toLocaleString()}
                </time>
              </div>
              <p className="contact-inbox-message">{message.message}</p>
              <div className="contact-inbox-card-footer">
                <div className="contact-inbox-sender">
                  <strong>{message.name}</strong>
                  <a href={`mailto:${message.email}`}><Mail size={15} aria-hidden="true" />{message.email}</a>
                </div>
                {!message.reviewed && (
                  <button
                    type="button"
                    className="btn btn-primary contact-reviewed-button"
                    onClick={() => markReviewed(message.id)}
                    disabled={updatingId === message.id}
                  >
                    <Check size={16} aria-hidden="true" />
                    {updatingId === message.id ? 'Saving…' : 'Mark reviewed'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="contact-inbox-empty">
          <MessageSquareText size={32} aria-hidden="true" />
          <h2>No messages yet</h2>
          <p>Messages submitted through the Contact page will appear here.</p>
        </div>
      )}
    </section>
  );
};

export default ContactMessages;
