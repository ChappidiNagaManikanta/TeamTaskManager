import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageSquareText, Send } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const loadMessages = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const response = await api.get('/chat/messages');
      setMessages(response.data);
      setError('');
    } catch (requestError) {
      console.error('Failed to load chat messages', requestError);
      setError('Unable to load team chat. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages(true);
    const intervalId = window.setInterval(() => loadMessages(), 5000);
    return () => window.clearInterval(intervalId);
  }, [loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || sending) return;

    setSending(true);
    setError('');
    try {
      const response = await api.post('/chat/messages', { message: trimmedMessage });
      setMessages((current) => current.some((item) => item.id === response.data.id)
        ? current
        : [...current, response.data]);
      setMessage('');
    } catch (requestError) {
      console.error('Failed to send chat message', requestError);
      setError('Unable to send your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="team-chat-page">
      <div className="page-header">
        <div>
          <h1>Team chat</h1>
          <p className="page-description">Ask questions and keep your whole team in the loop.</p>
        </div>
        <span className="team-chat-presence"><span aria-hidden="true" /> Team room</span>
      </div>

      <div className="team-chat-card">
        <div className="team-chat-heading">
          <span className="team-chat-heading-icon"><MessageSquareText size={20} aria-hidden="true" /></span>
          <div>
            <h2>Team conversation</h2>
            <p>Messages are visible to all team members and administrators.</p>
          </div>
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        <div className="team-chat-messages" aria-label="Team chat messages" aria-live="polite">
          {loading ? (
            <p className="team-chat-empty" role="status">Loading conversation...</p>
          ) : messages.length ? (
            messages.map((item) => {
              const ownMessage = item.senderId === user?.id;
              return (
                <article className={`team-chat-message${ownMessage ? ' own' : ''}`} key={item.id}>
                  <div className="team-chat-message-meta">
                    <strong>{ownMessage ? 'You' : item.senderName}</strong>
                    <span className={`team-chat-role${item.senderRole === 'ROLE_ADMIN' ? ' admin' : ''}`}>
                      {item.senderRole === 'ROLE_ADMIN' ? 'Admin' : 'Team member'}
                    </span>
                    <time dateTime={item.sentAt}>
                      {new Date(item.sentAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </time>
                  </div>
                  <p>{item.message}</p>
                </article>
              );
            })
          ) : (
            <div className="team-chat-empty">
              <MessageSquareText size={28} aria-hidden="true" />
              <strong>Start the conversation</strong>
              <span>Send a message to your team or ask the administrator a question.</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form className="team-chat-compose" onSubmit={sendMessage}>
          <label className="visually-hidden" htmlFor="team-chat-message">Your message</label>
          <textarea
            id="team-chat-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write a message to your team..."
            maxLength={2000}
            rows={2}
            required
          />
          <div className="team-chat-compose-footer">
            <span>{message.length}/2000</span>
            <button className="btn btn-primary" type="submit" disabled={!message.trim() || sending}>
              <Send size={16} aria-hidden="true" />
              {sending ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Chat;
