import { useEffect, useState, useRef, FormEvent } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I am Vishal's AI companion. Ask me anything about his full-stack skills, Node.js, React experience, or availability." }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // const handleSendChat = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim() || isSending) return;

  //   const userMsg = input.trim();
  //   setInput('');
  //   setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
  //   setIsSending(true);

  //   try {
  //     const chatHistory = [...messages, { role: 'user', content: userMsg }].map(m => ({
  //       role: m.role,
  //       content: m.content
  //     }));

  //     const res = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ messages: chatHistory })
  //     });

  //     if (!res.ok) throw new Error('API communication error');
  //     const data = await res.json();
      
  //     setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  //   } catch (err) {
  //     console.error(err);
  //     setMessages(prev => [...prev, { role: 'assistant', content: "Oops! I encountered an API ripple. Please try again in a bit." }]);
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  const handleSendChat = async (e: FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isSending) return;

  const userMsg = input.trim();
  setInput('');
  setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
  setIsSending(true);

  try {
    const chatHistory = [...messages, { role: 'user', content: userMsg }].map(m => ({
      role: m.role,
      content: m.content
    }));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });

    // 1. Parse the JSON response first, regardless of response status
    const data = await res.json();

    // 2. If the server returned a bad status code, throw the *actual* error message sent by the backend
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    
    // 3. Success state
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  } catch (err: any) {
    console.error("Chatbot Frontend Error:", err);
    
    // 4. Present the real backend error in the chat interface so you can debug instantly
    setMessages(prev => [
      ...prev, 
      { 
        role: 'assistant', 
        content: `⚠️ ${err.message || "Oops! I encountered an API ripple. Please try again in a bit."}` 
      }
    ]);
  } finally {
    setIsSending(false);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Panel Drop */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_20px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden animate-fadeIn">
          {/* Panel Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-zinc-950/60 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="text-left">
                <h3 className="text-xs font-bold font-mono tracking-wider text-white uppercase flex items-center gap-1">
                  <span>VISHAL'S AI COPILOT</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                </h3>
                <p className="text-[9px] text-zinc-500 uppercase font-mono">Live client agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-800 transition-all cursor-pointer"
              aria-label="Close chatbot window"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages List Screen */}
          <div
            ref={scrollRef}
            className="p-4 h-64 overflow-y-auto space-y-3 bg-zinc-950Scroll subtle-scrollbar scrollbar-none text-[11px] font-mono leading-relaxed"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col space-y-1 max-w-[85%] ${
                  m.role === 'user'
                    ? 'bg-indigo-950/20 text-indigo-300 border-indigo-500/15 self-end ml-auto'
                    : 'bg-zinc-900/30 text-zinc-400 border-zinc-900 self-start mr-auto'
                }`}
              >
                <div className={`text-[8px] font-bold uppercase tracking-wider ${m.role === 'user' ? 'text-indigo-400' : 'text-zinc-500'}`}>
                  {m.role === 'user' ? 'You' : 'Copilot Client'}
                </div>
                <div className="text-zinc-350 break-words">{m.content}</div>
              </div>
            ))}
            
            {isSending && (
              <div className="text-zinc-500 animate-pulse text-[9px] font-mono flex items-center gap-1.5 px-1 pb-1">
                <span className="h-1.5 w-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                <span className="h-1.5 w-1.5 bg-zinc-600 rounded-full animate-bounce delay-100"></span>
                <span className="h-1.5 w-1.5 bg-zinc-600 rounded-full animate-bounce delay-200"></span>
                <span>Copilot is formulating advice...</span>
              </div>
            )}
          </div>

          {/* Panel Messaging Form */}
          <form onSubmit={handleSendChat} className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2">
            <input
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me: Is he available to hire?"
              disabled={isSending}
              className="flex-1 bg-zinc-900/50 border border-zinc-850 text-xs font-mono rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500/60 placeholder-zinc-600"
            />
            <button
              type="submit"
              disabled={isSending}
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:bg-zinc-900/40 p-2 rounded-lg text-white flex items-center justify-center transition-all cursor-pointer"
              title="Send reply"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border shadow-2xl transition-all duration-300 active:scale-90 cursor-pointer group ${
          isOpen
            ? 'bg-zinc-950 border-zinc-800 text-indigo-400 hover:border-zinc-700'
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 border-indigo-500/30 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-105'
        }`}
        title="Chat with Vishal's AI Copilot"
        aria-label="Toggle chat assistant"
      >
        <div className="absolute inset-x-0 bottom-0 top-0 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 pointer-events-none" />
        
        {isOpen ? (
          <X className="w-6 h-6 relative z-10 animate-spin-once" />
        ) : (
          <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-6 transition-transform" />
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-zinc-950 flex items-center justify-center text-[8px] font-sans font-black text-white animate-bounce">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300"></span>
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
