import { useEffect, useState, useRef, FormEvent } from 'react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = ['What is his tech stack?', 'Tell me about his AI projects', 'Is he available to hire?'];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi there! I am Vishal's AI companion. Ask me anything about his full-stack skills, Node.js, React experience, or availability.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    const userMsg = textToSend.trim();
    if (!userMsg || isSending) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsSending(true);

    try {
      const chatHistory = [...messages, { role: 'user', content: userMsg }].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server returned non-JSON: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      console.error('Chatbot Frontend Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err.message || 'Oops! I encountered an API ripple. Please try again in a bit.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendChat = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" style={{ perspective: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.92, rotateX: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-3xl surface-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div className="text-left">
                  <h3 className="text-xs font-bold font-mono tracking-wider text-[var(--text-primary)] uppercase flex items-center gap-1.5">
                    <span>VISHAL&apos;S AI COPILOT</span>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </h3>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase font-mono">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close chatbot window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="p-4 h-72 overflow-y-auto space-y-3 scrollbar-none text-xs leading-relaxed">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-2xl border flex flex-col space-y-1 max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] border-[var(--accent-border)] self-end ml-auto'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] self-start mr-auto'
                  }`}
                >
                  <div
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                      m.role === 'user' ? 'text-[var(--accent-text)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {m.role === 'user' ? 'You' : 'Copilot'}
                  </div>
                  <div className="break-words">{m.content}</div>
                </motion.div>
              ))}

              {messages.length === 1 && !isSending && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="text-[11px] font-mono px-2.5 py-1.5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent-text)] hover:opacity-90 transition-opacity cursor-pointer text-left"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              )}

              {isSending && (
                <div className="text-[var(--text-muted)] animate-pulse text-[11px] font-mono flex items-center gap-1.5 px-1 pb-1">
                  <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce delay-200" />
                  <span>Copilot is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendChat}
              className="p-3 bg-[var(--bg-subtle)] border-t border-[var(--border-subtle)] flex gap-2"
            >
              <input
                type="text"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me: Is he available to hire?"
                disabled={isSending}
                className="input-surface flex-1 text-xs rounded-xl px-3 py-2"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                type="submit"
                disabled={isSending}
                className="accent-gradient-bg hover:opacity-95 disabled:opacity-50 p-2.5 rounded-xl text-white flex items-center justify-center transition-opacity cursor-pointer shadow-sm"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08, rotateY: 12 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border shadow-2xl transition-colors duration-300 cursor-pointer group ${
          isOpen ? 'surface-elevated text-[var(--accent-text)]' : 'accent-gradient-bg border-white/20 text-white'
        }`}
        title="Chat with Vishal's AI Copilot"
        aria-label="Toggle chat assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-6 transition-transform" />
        )}

        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-page)] flex items-center justify-center">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
