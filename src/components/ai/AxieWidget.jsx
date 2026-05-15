import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { API_BASE } from '../../config/constants';
import axieMascot from '../../assets/axie-mascot.jpg';

const SESSION_KEY = 'axie-session-id';

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = 'axie-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const WELCOME_MSG = {
  role: 'assistant',
  content: "Hey there! I'm **Axie** 🤖 — your A5X Robotics assistant. I can help you find components, pick the right kit, or answer robotics questions. What are you building today?"
};

const QUICK_PROMPTS = [
  "What kits do you have?",
  "I need an Arduino board",
  "Best sensor for distance?",
  "Help me build a robot car"
];

export default function AxieWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId: getSessionId()
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🔧"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;
    sendMessage(text);
  };

  const handleQuickPrompt = (text) => {
    sendMessage(text);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasNewMsg(false);
  };

  // Format message content (basic markdown)
  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(124,58,237,0.2);padding:1px 4px;border-radius:3px;font-size:12px">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="axie-fab"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close Axie assistant' : 'Open Axie assistant'}
        title="Chat with Axie"
      >
        {isOpen ? (
          <X size={24} color="#fff" />
        ) : (
          <img src={axieMascot} alt="Axie" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
        )}
        {hasNewMsg && !isOpen && <span className="axie-fab-badge" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="axie-panel">
          {/* Header */}
          <div className="axie-header">
            <img src={axieMascot} alt="Axie" className="axie-header-avatar" />
            <div className="axie-header-info">
              <div className="axie-header-name">Axie</div>
              <div className="axie-header-status">Online · A5X Assistant</div>
            </div>
            <button className="axie-close-btn" onClick={toggleOpen} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="axie-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`axie-msg ${msg.role === 'user' ? 'axie-msg-user' : 'axie-msg-bot'}`}>
                <span dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                {/* Quick actions after welcome message */}
                {i === 0 && msg.role === 'assistant' && messages.length === 1 && (
                  <div className="axie-quick-actions">
                    {QUICK_PROMPTS.map((prompt, j) => (
                      <button key={j} className="axie-quick-btn" onClick={() => handleQuickPrompt(prompt)}>
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="axie-typing">
                <span className="axie-typing-dot" />
                <span className="axie-typing-dot" />
                <span className="axie-typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="axie-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="axie-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Axie anything..."
              disabled={isTyping}
              maxLength={500}
            />
            <button
              type="submit"
              className="axie-send-btn"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
